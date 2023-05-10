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
import { getProjects } from '../../selectors/projectSelector'

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

    const projects = useSelector(getProjects) 

    let missingComponents : { [key: string]: number } = {};

    projects.forEach((project) => {
        project.componentClaims.forEach((component) => {
            const missingComponentQuantity: number = component.quanity - component.actualQuantity
            
            if (missingComponentQuantity > 0) {
                const key = component.componentType.name as keyof typeof missingComponents; 

                if (missingComponents[key] !== undefined) {
                    missingComponents[key] += missingComponentQuantity
                } else {
                    missingComponents[key] = 0;
                    missingComponents[key] = missingComponentQuantity
                }
            }
        })
    })
         
    const currentUserRole = useSelector(
        (state: RootState) => state.userReducer.userType
    ) 
       
    return currentUserRole === 'warehousemanager' ? (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Component Name</TableCell>
                    <TableCell>Quantity</TableCell>
                   </TableRow>
            </TableHead>
            <TableBody>
                {Object.keys(missingComponents).length ? (
                    Object.entries(missingComponents).map(([key, value]) => (
                        // @ts-ignore
                        <TableRow key={key}>
                            <TableCell>
                                {key}
                            </TableCell>
                            <TableCell>
                                {value}
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
