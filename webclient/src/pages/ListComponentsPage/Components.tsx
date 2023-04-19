import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { useEffect } from 'react'
import { addNewComponent } from '../../reducers/componentReducer'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'

import { componentInterface } from '../../reducers/componentReducer'
export const Components = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchComponents = async () => {
            async function getComponents() {
                const response = await fetch('http://localhost:100/Component')
                const data = await response.json()
                data.forEach((component: componentInterface) => {
                    dispatch(addNewComponent(component))
                })
            }
            await getComponents()
        }
        fetchComponents()
    }, [dispatch])
    const components = useSelector(
        (state: RootState) => state.componentReducer.components
    )
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Component Type</TableCell>
                    <TableCell>Storage</TableCell>
                    <TableCell>Occupied</TableCell>
                    <TableCell>Select Project</TableCell>
                    <TableCell>Quantity</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {components.map(
                    (component) =>
                        component.quantity > 0 && (
                            <TableRow key={component.id}>
                                <TableCell>{component.id}</TableCell>
                                <TableCell>
                                    {component.componentType.name}
                                </TableCell>
                                <TableCell>
                                    {component.storage
                                        ? `Row: ${component.storage.row}, Col: ${component.storage.col}, Level: ${component.storage.level}`
                                        : '-'}
                                </TableCell>
                                <TableCell>
                                    {component.occupied ? 'Yes' : 'No'}
                                </TableCell>
                                <TableCell>
                                    {component.projectId || '-'}
                                </TableCell>
                                <TableCell>{component.quantity}</TableCell>
                            </TableRow>
                        )
                )}
            </TableBody>
        </Table>
    )
}
