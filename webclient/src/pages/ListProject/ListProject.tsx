import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    TableContainer,
    Paper,
    Box,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { getProjects } from '../../selectors/projectSelector'
import { RootState } from '../../store'
import { addComponentFromResponse } from '../../reducers/componentReducer'
import { useEffect } from 'react'
import { UnauthorizedAccess } from '../UnathorizedAccess/UnauthorizedAccess'
import { Row } from './DropDown'
import { updateProjectPrice, updateProjectStatus, updateProjectWorkHours } from '../../reducers/projectReducer'

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
    async function getComponents() {
        try {
            const response = await fetch('http://localhost:100/Component')
            const data = await response.json()
            dispatch(addComponentFromResponse(data))
        } catch (error) {
            console.log('Error fetching components', error)
        }
    }

    useEffect(() => {
        getComponents()
    }, [])

    const components = useSelector(
        (state: RootState) => state.componentReducer.components
    )
    
    const currentUserRole = useSelector(
        (state: RootState) => state.userReducer.userType
    )

    const projects = useSelector(getProjects)
    const dispatch = useDispatch()

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
        let hours = 0
        const hourlyPrice = event.target.value
        for (let i = 0; i < projects.length; i++) {
            if (projects[i].id === id) {
                hours = projects[i].workHours
            }
        }

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
        let hourlyPrice = 0
        for (let i = 0; i < projects.length; i++) {
            if (projects[i].id === id) {
                hourlyPrice = projects[i].hourlyPrice
            }
        }
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

    return currentUserRole === 'specialist' ? (
        <Box sx={{ m: 3 }}>
            <Typography
                variant='h4'
                align='center'
                sx={{ mb: 3 }}
            >
                List of Projects
            </Typography>
            <Table
                sx={{ minWidth: 650 }}
                aria-label='simple table'
            >
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell align='right'>Name</TableCell>
                        <TableCell align='right'>Description</TableCell>
                        <TableCell align='right'>Status</TableCell>
                        <TableCell align='right'>Customer info</TableCell>
                        <TableCell align='right'>Hourly Price</TableCell>
                        <TableCell align='right'>Work Hours</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>{projects.map((project) => Row(project))}</TableBody>
            </Table>
        </Box>
    ): (
        <UnauthorizedAccess />
    )

}
