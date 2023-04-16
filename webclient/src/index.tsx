import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { userSlice } from './reducers/userReducer'
import LoginPage from './pages/LoginPage/LoginPage'
import { store } from './store'
import { AdminAddNewUser } from './pages/AdminPage/AdminAddNewUser'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
    <Provider store={store}>
        <React.StrictMode>
            <AdminAddNewUser />
        </React.StrictMode>
    </Provider>
)
const counterReducer = userSlice.reducer
export default counterReducer
