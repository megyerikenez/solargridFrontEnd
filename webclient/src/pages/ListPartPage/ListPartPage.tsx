import { Box, Button, TextField, Typography } from '@mui/material'
import { ChangeEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import { partInterface, updatePart } from '../../reducers/partReducer'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { Link } from 'react-router-dom'

export function ListPart() {
    const parts = useSelector((state: RootState) => state.partReducer.shelf)
    const [editedParts, setEditedParts] = useState<Record<string, number>>({})
    const dispatch = useDispatch()
    const handleEditPrice = (
        name: string,
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setEditedParts((prevEditedParts) => ({
            ...prevEditedParts,
            [name]: parseFloat(event.target.value),
        }))
    }

    const handleSave = () => {
        const newParts = parts.map((part) => ({
            ...part,
            price:
                editedParts[part.name] !== undefined
                    ? editedParts[part.name]
                    : part.price,
        }))

        newParts.forEach((part) => {
            dispatch(updatePart(part))
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
                List of parts
            </Typography>

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Part Name</TableCell>
                        <TableCell>Part Price</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {parts.map((part: partInterface) => (
                        <TableRow key={part.name}>
                            <TableCell>{part.name}</TableCell>
                            <TableCell>
                                <TextField
                                    type='number'
                                    InputProps={{ inputProps: { min: 0 } }}
                                    value={
                                        editedParts[part.name] !== undefined
                                            ? editedParts[part.name]
                                            : part.price
                                    }
                                    onChange={(event) =>
                                        handleEditPrice(part.name, event)
                                    }
                                />
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
