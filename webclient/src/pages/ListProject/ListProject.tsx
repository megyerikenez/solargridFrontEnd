import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    Box,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { getProjects } from '../../selectors/projectSelector'
import { addComponentFromResponse } from '../../reducers/componentReducer'
import { useEffect } from 'react'
import { UnauthorizedAccess } from '../UnathorizedAccess/UnauthorizedAccess'
import { Row } from './DropDown'
import { selectUserType } from '../../selectors/userSelectors'

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const currentUserRole = useSelector(selectUserType)

    const projects = useSelector(getProjects)
    const dispatch = useDispatch()

    return currentUserRole === 'specialist' ||
        currentUserRole === 'warehouseworker' ? (
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
    ) : (
        <UnauthorizedAccess />
    )
}
