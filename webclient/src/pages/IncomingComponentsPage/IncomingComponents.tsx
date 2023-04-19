import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import { addNewComponent } from '../../reducers/componentReducer'
import { Box, Button, MenuItem, TextField } from '@mui/material'
import {
    selectComponentTypeOptions,
    selectComponentTypeState,
} from '../../selectors/componentTypeSelectors'

export const IncomingComponents = () => {
    const dispatch = useDispatch()
    const componentTypes = useSelector(selectComponentTypeState)
    const componentTypeIdsAndNames = useSelector(selectComponentTypeOptions)

    const [componentTypeId, setComponentTypeId] = useState('')
    const [storage, setStorage] = useState('')
    const [projectId, setProjectId] = useState('')
    const [quantity, setQuantity] = useState(0)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const selectedComponentType = componentTypeIdsAndNames.find(
            (c) => c.id === componentTypeId
        )
        if (!selectedComponentType) {
            console.error(`Component type "${componentTypeId}" not found`)
            return
        }

        const payload = {
            componentTypeID: selectedComponentType.id,
            quantity,
        }

        if (quantity <= 0) {
            try {
                const response = await fetch('http://localhost:100/Component', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                })
                if (!response.ok) {
                    console.error(
                        `Failed to add incoming component: ${response.status} ${response.statusText}`
                    )
                    return
                }
                setComponentTypeId('')
                setStorage('')
                setProjectId('')
                setQuantity(0)

                console.log('Incoming component added successfully')
            } catch (error) {
                console.error(`Failed to add incoming component: ${error}`)
            }
        }
    }

    return (
        <Box
            component='form'
            onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                '& > :not(style)': { m: 1, width: '25ch' },
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <TextField
                select
                label='Component Type'
                value={componentTypeId}
                onChange={(event) => setComponentTypeId(event.target.value)}
            >
                {componentTypes.map((componentType) => (
                    <MenuItem
                        key={componentType.id}
                        value={componentType.id}
                    >
                        {componentType.name}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                label='Quantity'
                type='number'
                value={quantity}
                onChange={(event) => setQuantity(Number(event.target.value))}
            />
            <Button
                variant='contained'
                color='primary'
                type='submit'
            >
                Add Incoming Component
            </Button>
        </Box>
    )
}
