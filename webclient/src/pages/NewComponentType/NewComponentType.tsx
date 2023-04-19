import { Box, Button, TextField, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { addNewComponent } from '../../reducers/componentReducer'
import { Link } from 'react-router-dom'
import { selectUserType } from '../../selectors/userSelectors'
import { UnauthorizedAccess } from '../UnathorizedAccess/UnauthorizedAccess'

export function NewComponentType() {
    const dispatch = useDispatch()
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const target = event.target as typeof event.target & {
            componentName: { value: string }
            componentPrice: { value: string }
            componentmaxQuantityPerSlot: { value: string }
        }
        const name = target.componentName.value
        const price = parseInt(target.componentPrice.value)
        const maxQuantityPerSlot = parseInt(
            target.componentmaxQuantityPerSlot.value
        )
        const id = Math.random().toString(36).substr(2, 9)
        const data = { name, price, maxQuantityPerSlot, id }

        try {
            const response = await fetch('http://localhost:100/ComponentType', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            if (response.ok) {
                dispatch(
                    addNewComponent({
                        name,
                        price,
                        maxQuantityPerSlot,
                        id,
                    })
                )
                target.componentName.value = ''
                target.componentPrice.value = ''
                target.componentmaxQuantityPerSlot.value = ''
            } else {
                console.error('Error adding component type')
            }
        } catch (error) {
            console.error(error)
        }
    }
    const userType = useSelector(selectUserType)

    return userType === 'warehousemanager' ? (
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
                    id='componentmaxQuantityPerSlot'
                    label='component Max Quantity'
                    name='componentmaxQuantityPerSlot'
                    autoComplete='componentmaxQuantityPerSlot'
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
            </Box>
        </Box>
    ) : (
        <UnauthorizedAccess />
    )
}
