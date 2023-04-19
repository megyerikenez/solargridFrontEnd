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
    DRAFT = 'Draft',
    WAIT = 'Wait',
    SCHEDULED = 'Scheduled',
    IN_PROGRESS = 'In progress',
    COMPLETED = 'Completed',
    FAILED = 'Failed',
}

export function ListProject() {
    const dispatch = useDispatch()
    const projects = useSelector(
        (state: RootState) => state.projectReducer.projects
    )

    const handleSelectChange = async (
        event: React.ChangeEvent<{ value: unknown }>,
        id: string
    ) => {
        const status = event.target.value as ProjectStatus

        try {
            const response = await fetch(
                `http://localhost:100/Project/${id}/phase/${status}`,
                {
                    method: 'PUT',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id, status }),
                }
            )

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            dispatch(updateProjectStatus({ id, status }))
        } catch (error) {
            console.error(error)
            // handle error
        }
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
                        <TableCell>Customer info</TableCell>
                        <TableCell>Hourly Price</TableCell>
                        <TableCell>Work Hours</TableCell>
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
                            <TableCell>{project.projectPhase.name}</TableCell>
                            <TableCell>
                                <FormControl fullWidth>
                                    <InputLabel>
                                        {project.projectPhase.name}
                                    </InputLabel>
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
                                        <MenuItem value={ProjectStatus.DRAFT}>
                                            {ProjectStatus.DRAFT}
                                        </MenuItem>
                                        <MenuItem value={ProjectStatus.WAIT}>
                                            {ProjectStatus.WAIT}
                                        </MenuItem>
                                        <MenuItem
                                            value={ProjectStatus.SCHEDULED}
                                        >
                                            {ProjectStatus.SCHEDULED}
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
                                        <MenuItem value={ProjectStatus.FAILED}>
                                            {ProjectStatus.FAILED}
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </TableCell>
                            <TableCell>
                                {project.customer.name}
                                <br />
                                {project.customer.phone}
                                <br />
                                {project.customer.email}
                            </TableCell>
                            <TableCell>{project.hourlyPrice}</TableCell>
                            <TableCell>{project.workHours}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    )
}
