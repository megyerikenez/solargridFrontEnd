import { Box, Button, TextField, Typography } from '@mui/material'
import { ChangeEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import {
    componentInterface,
    updatecomponent,
} from '../../reducers/componentReducer'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'

export function ListComponentType() {
    const components = useSelector(
        (state: RootState) => state.componentReducer.components
    )
    const [editedcomponents, setEditedcomponents] = useState<
        Record<string, number>
    >({})
    const dispatch = useDispatch()
    const handleEditPrice = (
        name: string,
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setEditedcomponents((prevEditedcomponents) => ({
            ...prevEditedcomponents,
            [name]: parseFloat(event.target.value),
        }))
    }

    const handleSave = () => {
        components.forEach((component) => {
            const updatedPrice =
                editedcomponents[component.name] !== undefined
                    ? editedcomponents[component.name]
                    : component.price

            const updatedComponent = {
                id: component.id,
                name: component.name,
                price: updatedPrice,
                maxQuantityPerSlot: component.maxQuantityPerSlot,
            }

            fetch(`http://localhost:100/ComponentType?id=${component.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedComponent),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(
                            `HTTP error! status: ${response.status}`
                        )
                    }
                    console.log(`Updated ${component.name} successfully!`)
                })
                .catch((error) => {
                    console.error(`Error updating ${component.name}:`, error)
                })
        })
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

            <Table
                sx={{
                    width: '100%',
                    mt: 3,
                }}
            >
                <TableHead>
                    <TableRow>
                        <TableCell>Component Name</TableCell>
                        <TableCell>Component Price</TableCell>
                        <TableCell>Component Max Quantity</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody
                    sx={{
                        '& .MuiTableCell-root': {
                            borderBottom: 'unset',
                        },
                    }}
                >
                    {components.map((component: componentInterface) => (
                        <TableRow key={component.name}>
                            <TableCell>{component.name}</TableCell>
                            <TableCell>
                                <TextField
                                    type='number'
                                    InputProps={{ inputProps: { min: 0 } }}
                                    value={
                                        editedcomponents[component.name] !==
                                        undefined
                                            ? editedcomponents[component.name]
                                            : component.price
                                    }
                                    onChange={(event) =>
                                        handleEditPrice(component.name, event)
                                    }
                                />
                            </TableCell>
                            <TableCell>
                                {component.maxQuantityPerSlot}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Button
                variant='contained'
                onClick={handleSave}
                sx={{ mt: 3 }}
            >
                Save
            </Button>
        </Box>
    )
}
