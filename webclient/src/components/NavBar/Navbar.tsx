import { useSelector } from 'react-redux'
import { selectUserType } from '../../selectors/userSelectors'
import SpecialistNavbar from './SpecialistNavbar'
import WarehouseManagerNavbar from './SpecialistNavbar'
import { useEffect } from 'react'
import AdminNavBar from './AdminNavbar'
import WarehouseWorker from './WarehouseWorker'

export const Navbar = () => {
    const userType = useSelector(selectUserType)
    useEffect(() => {
        console.log(userType)
    }, [userType])
    return (
        <>
            {userType === 'specialist' && <SpecialistNavbar />}
            {userType === 'warehousemanager' && <WarehouseManagerNavbar />}
            {userType === 'warehouseworker' && <WarehouseWorker />}
            {userType === 'admin' && <AdminNavBar />}
        </>
    )
}
