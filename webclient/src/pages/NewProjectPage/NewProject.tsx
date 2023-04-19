import { Box, Button, TextField, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { addProject } from '../../reducers/projectReducer'
import { v4 as uuidv4 } from 'uuid'
import {
    CustomerInterface,
    ProjectInterface,
} from '../../reducers/projectReducer'

export function NewProject() {
    const dispatch = useDispatch()
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const target = event.target as typeof event.target & {
            place: { value: string }
            description: { value: string }
            buyer: { value: string }
            name: { value: string }
            phone: { value: string }
            email: { value: string }
        }
        const place = target.place.value
        const description = target.description.value
        const buyer = target.buyer.value
        const customer: CustomerInterface = {
            name: target.name.value,
            phone: target.phone.value,
            email: target.email.value,
        }
        const randomId = uuidv4()
        const newProject: ProjectInterface = {
            id: randomId,
            place,
            description,
            buyer,
            status: 'New',
            customer,
            hourlyPrice: 0,
            workHours: 0,
        }
        try {
            const response = await fetch('http://localhost:100/Project', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: place,
                    location: place,
                    description: description,
                    customer: customer,
                }),
            })
            if (response.ok) {
                dispatch(addProject(newProject))
                console.log('Project added successfully')
            } else {
                console.log('Error adding project')
            }
        } catch (error) {
            console.log('Error adding project', error)
        }
    }

    return (
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
                    id='buyer'
                    label='Buyer'
                    name='buyer'
                    autoComplete='buyer'
                    autoFocus
                />
                <TextField
                    margin='normal'
                    required
                    fullWidth
                    id='name'
                    label='Name'
                    name='name'
                    autoComplete='name'
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
    )
}
