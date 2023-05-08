import {
    MenuItem,
    Select,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@mui/material'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'

export const Components = () => {
    const components = useSelector(
        (state: RootState) => state.componentReducer.components
    )
    const projects = useSelector(
        (state: RootState) => state.projectReducer.projects
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
                                <Select>
                                    {projects.map((project) => (
                                        <MenuItem
                                            id={project.id}
                                            value={project.name}
                                        >
                                            {project.description}
                                        </MenuItem>
                                    ))}
                                </Select>

                                <TableCell>{component.quantity}</TableCell>
                            </TableRow>
                        )
                )}
            </TableBody>
        </Table>
    )
}
