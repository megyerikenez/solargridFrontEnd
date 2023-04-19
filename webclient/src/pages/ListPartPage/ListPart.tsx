import { Box, Button, TextField, Typography } from '@mui/material'
import { ChangeEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import {
    componentInterface,
    updatecomponent,
} from '../../reducers/componentReducer'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'

export function Listcomponent() {
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
        const newcomponents = components.map((component) => ({
            ...component,
            price:
                editedcomponents[component.name] !== undefined
                    ? editedcomponents[component.name]
                    : component.price,
        }))

        newcomponents.forEach((component) => {
            dispatch(updatecomponent(component))
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
