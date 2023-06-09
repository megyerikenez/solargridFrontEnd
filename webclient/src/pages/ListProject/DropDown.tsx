import { useDispatch, useSelector } from 'react-redux'
import { addComponentFromResponse } from '../../reducers/componentReducer'
import {
    ProjectInterface,
    addOptimalPath,
    updateProjectPrice,
    updateProjectStatus,
    updateProjectWorkHours,
} from '../../reducers/projectReducer'
import { useEffect, useState } from 'react'
import { RootState } from '../../store'
import {
    TableRow,
    TableCell,
    IconButton,
    Collapse,
    Box,
    Typography,
    Table,
    FormControl,
    InputLabel,
    Select,
    SelectChangeEvent,
    MenuItem,
    Input,
    TableHead,
    TableBody,
    TextField,
    Button,
} from '@mui/material'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { getProjects } from '../../selectors/projectSelector'
import {
    selectComponentTypeOptions,
    selectComponentTypeState,
} from '../../selectors/componentTypeSelectors'
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

export function Row(project: ProjectInterface) {
    const projects = useSelector(getProjects)
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const currentUserRole = useSelector(selectUserType)
    const componentTypes = useSelector(selectComponentTypeState)
    const [componentTypeId, setComponentTypeId] = useState('')
    const [quantity, setQuantity] = useState(0)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [storage, setStorage] = useState('')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [projectId, setProjectId] = useState('')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const componentTypeIdsAndNames = useSelector(selectComponentTypeOptions)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (quantity >= 0) {
            try {
                const response = await fetch(
                    `http://localhost:100/Project/${project.id}/claims`,
                    {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            componentTypeId: componentTypeId,
                            quantity: quantity,
                            projectId: project.id,
                        }),
                    }
                )
                if (!response.ok) {
                    console.error(
                        `Failed to add claim to project: ${response.status} ${response.statusText}`
                    )
                    return
                }
                setComponentTypeId('')
                setStorage('')
                setProjectId('')
                setQuantity(0)
                // dispatch an action to add the claim to the project in the store
            } catch (error) {
                console.error(`Failed to add claim to project: ${error}`)
            }
        }
    }

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

            const updatedProject = {
                ...projects.find((p) => p.id === id),
                id: id || '',
                hourlyPrice,
            }
            dispatch(updateProjectPrice(updatedProject))
        } catch (error) {
            console.error(error)
        }
    }

    const handleHoursChange = async (
        event: React.ChangeEvent<HTMLInputElement>,
        id: string
    ) => {
        console.log(event)
        let workHours = 0
        for (let i = 0; i < projects.length; i++) {
            if (projects[i].id === id) {
                workHours = projects[i].hourlyPrice
            }
        }
        const hours = event.target.value

        try {
            const response = await fetch(
                `http://localhost:100/Project/${id}/price/${workHours}/hours/${hours}`,
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

    async function getComponents() {
        try {
            const response = await fetch('http://localhost:100/Component')
            const data = await response.json()
            dispatch(addComponentFromResponse(data))
        } catch (error) {
            console.log('Error fetching components', error)
        }
    }

    async function getOptimalPath() {
        try {
            const response = await fetch(
                `http://localhost:100/Project/${project.id}/PathData`
            )
            const data = await response.json()
            dispatch(addOptimalPath({ id: project.id, optimalPath: data }))
        } catch (error) {
            console.log('Error fetching optimal path', error)
        }
    }
    useEffect(() => {
        getComponents()
        getOptimalPath()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const optimalPath = useSelector(
        (state: RootState) =>
            state.projectReducer.projects.find((p) => p.id === project.id)
                ?.optimalPath
    )
    const components = useSelector(
        (state: RootState) => state.componentReducer.components
    )

    return (
        <>
            <TableRow
                sx={{ verticalAlign: 'middle' }}
                key={project.id}
            >
                <TableCell>
                    <IconButton
                        aria-label='expand row'
                        size='small'
                        onClick={() => setOpen(!open)}
                    >
                        {open ? (
                            <KeyboardArrowUpIcon />
                        ) : (
                            <KeyboardArrowDownIcon />
                        )}
                    </IconButton>
                </TableCell>
                <TableCell align='right'>{project.name}</TableCell>
                <TableCell align='right'>{project.description}</TableCell>
                <TableCell align='right'>
                    <FormControl fullWidth>
                        <InputLabel>{project.projectPhase.name}</InputLabel>
                        <Select
                            value={project.projectPhase.name}
                            onChange={(event: SelectChangeEvent<string>) =>
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
                            <MenuItem value={ProjectStatus.SCHEDULED}>
                                {ProjectStatus.SCHEDULED}
                            </MenuItem>
                            <MenuItem value={ProjectStatus.IN_PROGRESS}>
                                {ProjectStatus.IN_PROGRESS}
                            </MenuItem>

                            <MenuItem value={ProjectStatus.COMPLETED}>
                                {ProjectStatus.COMPLETED}
                            </MenuItem>
                            <MenuItem value={ProjectStatus.FAILED}>
                                {ProjectStatus.FAILED}
                            </MenuItem>
                        </Select>
                    </FormControl>
                </TableCell>
                <TableCell align='right'>{project.customer.email}</TableCell>
                <TableCell align='right'>
                    <InputLabel>Hourly Price</InputLabel>
                    <Input
                        value={project.hourlyPrice}
                        onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                        ) => handlePriceChange(event, project.id)}
                    ></Input>
                </TableCell>
                <TableCell align='right'>
                    <InputLabel>Work Hours</InputLabel>
                    <Input
                        value={project.workHours}
                        onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                        ) => handleHoursChange(event, project.id)}
                    ></Input>
                </TableCell>
            </TableRow>
            <TableRow key={project.id}>
                <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={7}
                >
                    <Collapse
                        in={open}
                        timeout='auto'
                        unmountOnExit
                    >
                        <Box sx={{ margin: 1 }}>
                            <Typography
                                variant='h6'
                                gutterBottom
                                component='div'
                                align='center'
                                color='blue'
                            >
                                Total Components Needed
                            </Typography>
                            <Table
                                size='small'
                                aria-label='purchases'
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell align='center'>
                                            Component Type
                                        </TableCell>
                                        <TableCell align='center'>
                                            Quantity
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {project.componentClaims.map(
                                        (componentClaim) => (
                                            <TableRow
                                                key={componentClaim.quanity}
                                            >
                                                <TableCell align='center'>
                                                    {
                                                        componentClaim
                                                            .componentType.name
                                                    }
                                                </TableCell>
                                                <TableCell align='center'>
                                                    {componentClaim.quanity}
                                                </TableCell>
                                            </TableRow>
                                        )
                                    )}
                                </TableBody>
                            </Table>
                        </Box>
                        <Box sx={{ margin: 1 }}>
                            <Typography
                                variant='h6'
                                gutterBottom
                                component='div'
                                align='center'
                                color='green'
                            >
                                Components Added to Project
                            </Typography>
                            <Table
                                size='small'
                                aria-label='purchases'
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell align='center'>
                                            Component Type
                                        </TableCell>
                                        <TableCell align='center'>
                                            Price of Component
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {components
                                        .filter(
                                            (component) =>
                                                component.projectId ===
                                                project.id
                                        )
                                        .map((component) => (
                                            <TableRow key={component.id}>
                                                <TableCell align='center'>
                                                    {
                                                        component.componentType
                                                            .name
                                                    }
                                                </TableCell>
                                                <TableCell align='center'>
                                                    {
                                                        component.componentType
                                                            .price
                                                    }
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </Box>
                        <Box sx={{ margin: 1 }}>
                            <Typography
                                variant='h6'
                                gutterBottom
                                component='div'
                                align='center'
                                color={'red'}
                            >
                                Missing Components
                            </Typography>
                            <Table
                                size='small'
                                aria-label='purchases'
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell align='center'>
                                            Component Type
                                        </TableCell>
                                        <TableCell align='center'>
                                            Missing Quantity
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {project.componentClaims.map(
                                        (componentClaim) => (
                                            <TableRow
                                                key={componentClaim.quanity}
                                            >
                                                <TableCell align='center'>
                                                    {
                                                        componentClaim
                                                            .componentType.name
                                                    }
                                                </TableCell>
                                                <TableCell align='center'>
                                                    {componentClaim.quanity -
                                                        componentClaim.actualQuantity}
                                                </TableCell>
                                            </TableRow>
                                        )
                                    )}
                                </TableBody>
                            </Table>
                        </Box>
                        {currentUserRole === 'specialist' && (
                            <Box
                                component='form'
                                onSubmit={handleSubmit}
                                sx={{
                                    display: 'flex',
                                    '& > :not(style)': { m: 1, width: '25ch' },
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <TextField
                                    select
                                    label='Component Type'
                                    value={componentTypeId}
                                    onChange={(event) =>
                                        setComponentTypeId(event.target.value)
                                    }
                                >
                                    {componentTypes.map((componentType) => (
                                        <MenuItem
                                            key={componentType.id}
                                            value={componentType.id}
                                        >
                                            {componentType.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    label='Quantity'
                                    type='number'
                                    value={quantity}
                                    onChange={(event) => {
                                        setQuantity(Number(event.target.value))
                                    }}
                                />
                                <Button
                                    variant='contained'
                                    color='primary'
                                    type='submit'
                                >
                                    Add Need for Component
                                </Button>
                            </Box>
                        )}
                        {currentUserRole === 'warehouseworker' && (
                            <Box
                                sx={{
                                    display: 'flex',
                                    '& > :not(style)': { m: 1, width: '25ch' },
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Typography
                                    variant='h6'
                                    gutterBottom
                                    component='div'
                                    align='center'
                                    color={'black'}
                                >
                                    Optimal path for collection:
                                    {
                                        // @ts-ignore
                                        // check if the path is empty
                                        typeof project.optimalPath !==
                                            'undefined' &&
                                        project.optimalPath.length !== 0 ? (
                                            project.optimalPath.map(
                                                (component) => (
                                                    <Typography
                                                        variant='h6'
                                                        gutterBottom
                                                        component='div'
                                                        align='center'
                                                        color={'black'}
                                                    >
                                                        {component.collectQuantity +
                                                            'x ' +
                                                            component.componentTypeName +
                                                            ' from ' +
                                                            'row: ' +
                                                            component.location
                                                                .row +
                                                            ' column: ' +
                                                            component.location
                                                                .col +
                                                            ' level: ' +
                                                            component.location
                                                                .level +
                                                            ' ->'}
                                                    </Typography>
                                                )
                                            )
                                        ) : (
                                            <Typography
                                                variant='h6'
                                                gutterBottom
                                                component='div'
                                                align='center'
                                                color={'red'}
                                            >
                                                No path found
                                            </Typography>
                                        )
                                    }
                                </Typography>
                            </Box>
                        )}
                        {
                            // if user type is specialist show the price of the project
                            currentUserRole === 'specialist' && (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        '& > :not(style)': {
                                            m: 1,
                                            width: '25ch',
                                        },
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Typography
                                        variant='h6'
                                        gutterBottom
                                        component='div'
                                        align='center'
                                        color={'black'}
                                    >
                                        Price of the components:
                                        {project.projectPrice.priceByComponent.map(
                                            (price) => (
                                                <Typography
                                                    variant='h6'
                                                    gutterBottom
                                                    component='div'
                                                    align='center'
                                                    color={'black'}
                                                >
                                                    {price.name +
                                                        ': ' +
                                                        price.totalPrice}
                                                </Typography>
                                            )
                                        )}
                                        <Typography
                                            variant='h6'
                                            gutterBottom
                                            component='div'
                                            align='center'
                                            color={'black'}
                                        >
                                            Project price:
                                            {project.projectPrice.projectPrice}
                                            <br />
                                            Total price:
                                            {project.projectPrice.totalPrice}
                                        </Typography>
                                    </Typography>
                                </Box>
                            )
                        }
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    )
}
