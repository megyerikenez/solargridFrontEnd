import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent,
} from '@mui/material'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { useDispatch } from 'react-redux'
import { updateProjectStatus } from '../../reducers/projectReducer'

export enum ProjectStatus {
    NEW = 'New',
    IN_PROGRESS = 'In progress',
    COMPLETED = 'Completed',
    CANCELLED = 'Cancelled',
}

export function ListProject() {
    const dispatch = useDispatch()
    const projects = useSelector(
        (state: RootState) => state.projectReducer.projects
    )

    const handleSelectChange = (
        event: React.ChangeEvent<{ value: unknown }>,
        id: number
    ) => {
        dispatch(
            updateProjectStatus({
                id,
                status: event.target.value as ProjectStatus,
            })
        )
    }

    return (
        <Box sx={{ m: 3 }}>
            <Typography
                variant='h4'
                align='center'
                sx={{ mb: 3 }}
            >
                List of Projects
            </Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {projects.map((project) => (
                        <TableRow key={project.place}>
                            <TableCell
                                component='th'
                                scope='row'
                            >
                                {project.place}
                            </TableCell>
                            <TableCell>{project.description}</TableCell>
                            <TableCell>
                                <FormControl fullWidth>
                                    <InputLabel>Status</InputLabel>
                                    <Select
                                        value={project.status}
                                        onChange={(
                                            event: SelectChangeEvent<string>
                                        ) =>
                                            handleSelectChange(
                                                event as React.ChangeEvent<{
                                                    value: unknown
                                                }>,
                                                project.id
                                            )
                                        }
                                    >
                                        <MenuItem value={ProjectStatus.NEW}>
                                            {ProjectStatus.NEW}
                                        </MenuItem>
                                        <MenuItem
                                            value={ProjectStatus.IN_PROGRESS}
                                        >
                                            {ProjectStatus.IN_PROGRESS}
                                        </MenuItem>
                                        <MenuItem
                                            value={ProjectStatus.COMPLETED}
                                        >
                                            {ProjectStatus.COMPLETED}
                                        </MenuItem>
                                        <MenuItem
                                            value={ProjectStatus.CANCELLED}
                                        >
                                            {ProjectStatus.CANCELLED}
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    )
}
