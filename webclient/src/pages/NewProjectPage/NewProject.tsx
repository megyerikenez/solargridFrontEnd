import { Box, Button, TextField, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { addProject } from '../../reducers/projectReducer'
import { v4 as uuidv4 } from 'uuid'
import {
    CustomerInterface,
    ProjectInterface,
} from '../../reducers/projectReducer'
import { RootState } from '../../store'
import { UnauthorizedAccess } from '../UnathorizedAccess/UnauthorizedAccess'

export function NewProject() {
    const dispatch = useDispatch()
    const currentUserRole = useSelector(
        (state: RootState) => state.userReducer.userType
    )
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const target = event.target as typeof event.target & {
            id: { value: string }
            name: { value: string }
            place: { value: string }
            description: { value: string }
            nameOfCustomer: { value: string }
            phone: { value: string }
            email: { value: string }
            hourlyPrice: { value: string }
            workHours: { value: string }
        }
        const name = target.name.value
        const place = target.place.value
        const description = target.description.value
        const customer: CustomerInterface = {
            name: target.nameOfCustomer.value,
            phone: target.phone.value,
            email: target.email.value,
        }
        const hourlyPrice = target.hourlyPrice.value
        const workHours = target.workHours.value
        try {
            const response = await fetch('http://localhost:100/Project', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: uuidv4(),
                    name: name,
                    location: place,
                    description: description,
                    customer: customer,
                    hourlyPrice: parseInt(hourlyPrice),
                    workHours: parseInt(workHours),
                }),
            })
            if (response.ok) {
                const createdProject: ProjectInterface = await response.json()
                dispatch(addProject(createdProject))
                console.log('Project added successfully')

                // Send another request with price and hours given
                const priceGiven = parseInt(hourlyPrice)
                const hoursGiven = parseInt(workHours)
                const priceHoursResponse = await fetch(
                    `http://localhost:100/Project/${createdProject.id}/price/${priceGiven}/hours/${hoursGiven}`,
                    {
                        method: 'GET',
                        headers: {
                            accept: 'text/plain',
                        },
                    }
                )
                if (priceHoursResponse.ok) {
                    console.log('Price and hours sent successfully')
                } else {
                    console.log('Error sending price and hours')
                }
            } else {
                console.log('Error adding project')
            }
        } catch (error) {
            console.log('Error adding project', error)
        }
    }

    return currentUserRole === 'specialist' ? (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Typography
                component='h1'
                variant='h5'
            >
                Add a new project
            </Typography>

            <Box
                component='form'
                onSubmit={handleSubmit}
            >
                <TextField
                    margin='normal'
                    required
                    fullWidth
                    id='name'
                    label='name'
                    name='Name'
                    autoComplete='name'
                    autoFocus
                />
                <TextField
                    margin='normal'
                    required
                    fullWidth
                    id='place'
                    label='Place'
                    name='place'
                    autoComplete='place'
                    autoFocus
                />
                <TextField
                    margin='normal'
                    required
                    fullWidth
                    id='description'
                    label='Description'
                    name='description'
                    autoComplete='description'
                    autoFocus
                />
                <TextField
                    margin='normal'
                    required
                    fullWidth
                    id='nameOfCustomer'
                    label='nameOfCustomer'
                    name='nameOfCustomer'
                    autoComplete='nameOfCustomer'
                    autoFocus
                />
                <TextField
                    margin='normal'
                    required
                    fullWidth
                    id='phone'
                    label='Phone'
                    name='phone'
                    autoComplete='phone'
                    autoFocus
                />
                <TextField
                    margin='normal'
                    required
                    fullWidth
                    id='email'
                    label='Email'
                    name='email'
                    autoComplete='email'
                    autoFocus
                />
                <TextField
                    margin='normal'
                    required
                    fullWidth
                    id='hourlyPrice'
                    label='Hourly price'
                    name='hourlyPrice'
                    autoComplete='hourlyPrice'
                    autoFocus
                >
                    <option value='0'>0</option>
                </TextField>
                <TextField
                    margin='normal'
                    required
                    fullWidth
                    id='workHours'
                    label='Work hours'
                    name='workHours'
                    autoComplete='workHours'
                    autoFocus
                >
                    <option value='0'>0</option>
                </TextField>
                <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    sx={{ mt: 3, mb: 2 }}
                >
                    Add new project
                </Button>
            </Box>
        </Box>
    ) : (
        <UnauthorizedAccess />
    )
}
