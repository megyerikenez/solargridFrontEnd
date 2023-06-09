import {
    MenuItem,
    Select,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import {
    addComponentFromResponse,
    addProjectToComponentReducer,
    updateComponent,
} from '../../reducers/componentReducer'
import { useEffect, useState } from 'react'
import { UnauthorizedAccess } from '../UnathorizedAccess/UnauthorizedAccess'
import { selectUserType } from '../../selectors/userSelectors'

export const Components = () => {
    const dispatch = useDispatch()

    const [selectedComponentType, setSelectedComponentType] = useState('')

    // get components from endpoint and display it
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
        // eslint-disable-next-line
    }, [])

    const componentTypes = useSelector(
        (state: RootState) => state.componentReducerType.components
    )

    const components = useSelector(
        (state: RootState) => state.componentReducer.components
    )

    const projects = useSelector(
        (state: RootState) => state.projectReducer.projects
    )

    const currentUserRole = useSelector(selectUserType)

    const filteredComponents = selectedComponentType
        ? components.filter(
              (component) =>
                  component.componentType.id === selectedComponentType
          )
        : components

    const addProjectToComponent = async (
        componentId: string,
        projectId: string
    ) => {
        try {
            await fetch(`http://localhost:100/Project/${projectId}/Component`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify([componentId]),
            })
            dispatch(addProjectToComponentReducer({ componentId, projectId }))
        } catch (error) {
            console.error(`Failed to add project to component: ${error}`)
        }
    }

    return currentUserRole === 'warehousemanager' ? (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Component Type</TableCell>
                    <TableCell>Storage</TableCell>
                    <TableCell>Occupied</TableCell>
                    <TableCell>Select Project</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell colSpan={5}>
                        <Select
                            value={selectedComponentType}
                            onChange={(event) =>
                                setSelectedComponentType(event.target.value)
                            }
                            displayEmpty
                            fullWidth
                        >
                            <MenuItem
                                value=''
                                disabled
                            >
                                Select a component type
                            </MenuItem>
                            {componentTypes.map((componentType) => (
                                <MenuItem
                                    key={componentType.id}
                                    value={componentType.id}
                                >
                                    {componentType.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </TableCell>
                </TableRow>
                {filteredComponents.length ? (
                    filteredComponents.map((component) => (
                        // @ts-ignore
                        <TableRow key={component.id}>
                            <TableCell>{component.componentType.id}</TableCell>
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
                                <Select
                                    value={component.projectId || ''}
                                    onChange={(event) =>
                                        dispatch(
                                            updateComponent({
                                                ...component,
                                                projectId: event.target.value,
                                            })
                                        )
                                    }
                                >
                                    {projects.map((project) => (
                                        <MenuItem
                                            key={project.id}
                                            value={project.id}
                                            onClick={() =>
                                                addProjectToComponent(
                                                    component.id,
                                                    project.id
                                                )
                                            }
                                        >
                                            {project.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={5}>
                            <Typography align='center'>
                                No components found
                            </Typography>
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    ) : (
        <UnauthorizedAccess />
    )
}
