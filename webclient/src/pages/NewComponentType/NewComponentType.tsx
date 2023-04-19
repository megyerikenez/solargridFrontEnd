import { Box, Button, TextField, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import { addcomponent } from '../../reducers/componentReducer'
import { Link } from 'react-router-dom'

export function NewComponentType() {
    const dispatch = useDispatch()
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const target = event.target as typeof event.target & {
            componentName: { value: string }
            componentPrice: { value: string }
            componentMaxQuantity: { value: string }
        }
        const name = target.componentName.value
        const price = parseInt(target.componentPrice.value)
        const maxQuantity = parseInt(target.componentMaxQuantity.value)
        dispatch(addcomponent({ name, price, maxQuantity }))
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
                Add a new component type
            </Typography>

            <Box
                component='form'
                onSubmit={handleSubmit}
            >
                <TextField
                    margin='normal'
                    required
                    fullWidth
                    id='componentName'
                    label='component Name'
                    name='componentName'
                    autoComplete='componentName'
                    autoFocus
                />
                <TextField
                    margin='normal'
                    required
                    fullWidth
                    id='componentPrice'
                    label='component Price'
                    name='componentPrice'
                    autoComplete='componentPrice'
                    autoFocus
                />
                <TextField
                    margin='normal'
                    required
                    fullWidth
                    id='componentMaxQuantity'
                    label='component Max Quantity'
                    name='componentMaxQuantity'
                    autoComplete='componentMaxQuantity'
                    autoFocus
                />
                <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    sx={{ mt: 3, mb: 2 }}
                >
                    Add new component
                </Button>
                <Link to='list'>list of components</Link>
            </Box>
        </Box>
    )
}
