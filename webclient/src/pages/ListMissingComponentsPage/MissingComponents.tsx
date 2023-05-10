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

export const MissingComponents = () => {
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
    }, [])

    const componentTypes = useSelector(
        (state: RootState) => state.componentReducerType.components
    )

    const components = useSelector(
        (state: RootState) => state.componentReducer.components // TODO: change to correct name if task is done
    )

    const projects = useSelector(
        (state: RootState) => state.projectReducer.projects
    )


    // Mocking this shit
    const missingComponents = [
        {
            'name': 'some component',
            'quantity': 3,
            'project': 'some project',
            'id': 'mittomen'
        },
        {
            'name': 'some component missing 2',
            'quantity': 13,
            'project': 'some 2222 project',
            'id': 'mittoasd786'
        }

    ]

    const currentUserRole = useSelector(
        (state: RootState) => state.userReducer.userType
    )

    const filteredComponents = selectedComponentType
        ? components.filter(
              (component) =>
                  component.componentType.id === selectedComponentType
          )
        : components

    
    return currentUserRole === 'warehousemanager' ? (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Component Name</TableCell>
                    <TableCell>Project</TableCell>
                    <TableCell>Quantity needed</TableCell>
               </TableRow>
            </TableHead>
            <TableBody>
                    {missingComponents.length ? (
                    missingComponents.map((component) => (
                        // @ts-ignore
                        <TableRow key={component.id}>
                            <TableCell>
                                {component.id}
                            </TableCell>
                            <TableCell>
                                {component.name}
                            </TableCell>
                            <TableCell>
                                {component.project}
                            </TableCell>
                            <TableCell>
                                {component.quantity}
                            </TableCell>
                            </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={5}>
                            <Typography align='center'>
                                No missing components
                            </Typography>
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    ): (
        <UnauthorizedAccess />
    )

}
