import { Box, Button, TextField, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { addProject } from '../../reducers/projectReducer'
import { v4 as uuidv4 } from 'uuid'

export function NewProject() {
    const dispatch = useDispatch()
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const target = event.target as typeof event.target & {
            place: { value: string }
            description: { value: string }
            buyer: { value: string }
        }
        const place = target.place.value
        const description = target.description.value
        const buyer = target.buyer.value
        const randomId = uuidv4()
        dispatch(
            addProject({
                id: parseInt(randomId),
                place,
                description,
                buyer,
                status: 'New',
            })
        )
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
                <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    sx={{ mt: 3, mb: 2 }}
                >
                    Add new project
                </Button>
                <Link to='list'>list of projects</Link>
            </Box>
        </Box>
    )
}
