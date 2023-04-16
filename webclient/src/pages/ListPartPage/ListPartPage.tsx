import { ChangeEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import { partInterface, updatePart } from '../../reducers/partReducer'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Button,
} from '@mui/material'

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
        <>
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
            >
                Save
            </Button>
        </>
    )
}
