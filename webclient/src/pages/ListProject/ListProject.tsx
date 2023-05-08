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
    Input,
} from '@mui/material'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { useDispatch } from 'react-redux'
import {
    updateProjectPrice,
    updateProjectStatus,
    updateProjectWorkHours,
} from '../../reducers/projectReducer'

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

    const handleStatusChange = async (
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

    const handlePriceChange = async (
        event: React.ChangeEvent<HTMLInputElement>,
        id: string
    ) => {
        const hourlyPrice = event.target.value
        const hours = event.target.value

        try {
            const response = await fetch(
                `http://localhost:100/Project/${id}/price/${hourlyPrice}/hours/${hours}`,
                {
                    method: 'GET',
                }
            )

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            // update local state
            const updatedProject = {
                ...projects.find((p) => p.id === id),
                id: id || '',
                hourlyPrice,
            }
            dispatch(updateProjectPrice(updatedProject))
        } catch (error) {
            console.error(error)
            // handle error
        }
    }

    const handleHoursChange = async (
        event: React.ChangeEvent<HTMLInputElement>,
        id: string
    ) => {
        const hourlyPrice = event.target.value
        const hours = event.target.value

        try {
            const response = await fetch(
                `http://localhost:100/Project/${id}/price/${hourlyPrice}/hours/${hours}`,
                {
                    method: 'GET',
                }
            )

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            // update local state
            const updatedProject = {
                ...projects.find((p) => p.id === id),
                id: id || '',
                workHours: hours,
            }
            dispatch(updateProjectWorkHours(updatedProject))
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
                        <TableCell>Components</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {projects.map((project) => (
                        <TableRow key={project.id}>
                            <TableCell
                                component='th'
                                scope='row'
                            >
                                {project.name}
                            </TableCell>
                            <TableCell>{project.description}</TableCell>
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
                                            handleStatusChange(
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
                            <TableCell>
                                <InputLabel>Hourly Price</InputLabel>
                                <Input
                                    value={project.hourlyPrice}
                                    onChange={(
                                        event: React.ChangeEvent<HTMLInputElement>
                                    ) => handlePriceChange(event, project.id)}
                                ></Input>
                            </TableCell>
                            <TableCell>
                                <InputLabel>Work Hours</InputLabel>
                                <Input
                                    value={project.workHours}
                                    onChange={(
                                        event: React.ChangeEvent<HTMLInputElement>
                                    ) => handleHoursChange(event, project.id)}
                                ></Input>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    )
}
