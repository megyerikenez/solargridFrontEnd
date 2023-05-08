import { Box, Button, TextField, Typography } from '@mui/material'
import { ChangeEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import {
    componentTypeInterface,
    updatecomponentType,
} from '../../reducers/componentTypeReducer'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'

export function ListComponentType() {
    const components = useSelector(
        (state: RootState) => state.componentReducerType.components
    )
    const [editedComponents, setEditedComponents] = useState<
        Record<string, { price: number; maxQuantityPerSlot: number }>
    >({})
    const dispatch = useDispatch()

    const handleEditPrice = (
        name: string,
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setEditedComponents((prevEditedComponents) => ({
            ...prevEditedComponents,
            [name]: {
                ...prevEditedComponents[name],
                price: parseInt(event.target.value),
            },
        }))
    }

    const handleEditMaxQuantityPerSlot = (
        name: string,
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setEditedComponents((prevEditedComponents) => ({
            ...prevEditedComponents,
            [name]: {
                ...prevEditedComponents[name],
                maxQuantityPerSlot: parseInt(event.target.value),
            },
        }))
    }

    const handleSave = async () => {
        for (const component of components) {
            const editedComponent = editedComponents[component.name]
            const updatedComponent = {
                id: component.id,
                name: component.name,
                price: editedComponent?.price ?? component.price,
                maxQuantityPerSlot:
                    editedComponent?.maxQuantityPerSlot ??
                    component.maxQuantityPerSlot,
            }

            try {
                const response = await fetch(
                    `http://localhost:100/ComponentType?id=${component.id}`,
                    {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(updatedComponent),
                    }
                )

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }
                dispatch(updatecomponentType(updatedComponent))
                console.log(`Updated ${component.name}`)
            } catch (error) {
                console.error(`Error updating ${component.name}:`, error)
            }
        }
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '60%',
                margin: 'auto',
            }}
        >
            <Typography
                component='h1'
                variant='h5'
            >
                List of Component
            </Typography>

            <Table sx={{ width: '100%', mt: 3 }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Component Name</TableCell>
                        <TableCell>Component Price</TableCell>
                        <TableCell>Max Quantity Per Slot</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody
                    sx={{
                        '& .MuiTableCell-root': {
                            borderBottom: 'unset',
                        },
                    }}
                >
                    {components.map((component: componentTypeInterface) => (
                        <TableRow key={component.name}>
                            <TableCell>{component.name}</TableCell>
                            <TableCell>
                                <TextField
                                    type='number'
                                    value={
                                        editedComponents[component.name]
                                            ?.price ?? component.price
                                    }
                                    onChange={(event) =>
                                        handleEditPrice(component.name, event)
                                    }
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    type='number'
                                    value={
                                        editedComponents[component.name]
                                            ?.maxQuantityPerSlot ??
                                        component.maxQuantityPerSlot
                                    }
                                    onChange={(event) =>
                                        handleEditMaxQuantityPerSlot(
                                            component.name,
                                            event
                                        )
                                    }
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Button
                type='submit'
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSave}
            >
                Save
            </Button>
        </Box>
    )
}
