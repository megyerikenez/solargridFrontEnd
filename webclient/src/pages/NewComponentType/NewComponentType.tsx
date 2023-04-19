import { Box, Button, TextField, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import { addPart } from '../../reducers/partReducer'
import { Link } from 'react-router-dom'

export function NewComponentType() {
    const dispatch = useDispatch()
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const target = event.target as typeof event.target & {
            partName: { value: string }
            partPrice: { value: string }
            partMaxQuantity: { value: string }
        }
        const name = target.partName.value
        const price = parseInt(target.partPrice.value)
        const maxQuantity = parseInt(target.partMaxQuantity.value)
        dispatch(addPart({ name, price, maxQuantity }))
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
                Add a new part
            </Typography>

            <Box
                component='form'
                onSubmit={handleSubmit}
            >
                <TextField
                    margin='normal'
                    required
                    fullWidth
                    id='partName'
                    label='Part Name'
                    name='partName'
                    autoComplete='partName'
                    autoFocus
                />
                <TextField
                    margin='normal'
                    required
                    fullWidth
                    id='partPrice'
                    label='Part Price'
                    name='partPrice'
                    autoComplete='partPrice'
                    autoFocus
                />
                <TextField
                    margin='normal'
                    required
                    fullWidth
                    id='partMaxQuantity'
                    label='Part Max Quantity'
                    name='partMaxQuantity'
                    autoComplete='partMaxQuantity'
                    autoFocus
                />
                <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    sx={{ mt: 3, mb: 2 }}
                >
                    Add new part
                </Button>
                <Link to='list'>list of parts</Link>
            </Box>
        </Box>
    )
}
