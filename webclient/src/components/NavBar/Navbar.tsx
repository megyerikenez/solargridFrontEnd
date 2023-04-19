import { useSelector } from 'react-redux'
import { selectUserType } from '../../selectors/userSelectors'
import SpecialistNavbar from './SpecialistNavbar'
import WarehouseManagerNavbar from './WarehouseManagerNavbar'
import { useEffect } from 'react'
import AdminNavBar from './AdminNavbar'
import WarehouseWorkerNavbar from './WarehouseWorkerNavbar'

export const Navbar = () => {
    const userType = useSelector(selectUserType)
    useEffect(() => {
        console.log(userType)
    }, [userType])
    return (
        <>
            {userType === 'specialist' && <SpecialistNavbar />}
            {userType === 'warehousemanager' && <WarehouseManagerNavbar />}
            {userType === 'warehouseworker' && <WarehouseWorkerNavbar />}
            {userType === 'admin' && <AdminNavBar />}
        </>
    )
}
