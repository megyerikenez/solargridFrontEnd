import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    TableContainer,
    Paper,
} from '@mui/material'
import { useSelector } from 'react-redux'
import { getProjects } from '../../selectors/projectSelector'
import { Row } from './DropDown'

export function ListProject() {
    const projects = useSelector(getProjects)
    return (
        <TableContainer
            sx={{
                width: '70%',
                maxWidth: '100%',
                maxHeight: '100%',
                height: '100%',
                margin: 'auto',
                mt: 5,
            }}
            component={Paper}
        >
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
        </TableContainer>
    )
}
