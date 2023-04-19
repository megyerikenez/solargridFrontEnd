import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store'
import { NewComponentType } from './pages/NewComponentType/NewComponentType'
import { ListComponentType } from './pages/ListComponentTypePage/ListComponentType'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/LoginPage/Login'
import { Navbar } from './components/NavBar/Navbar'
import { AdminAddNewUser } from './pages/AdminPage/AdminAddNewUser'
import { NewProject } from './pages/NewProjectPage/NewProject'
import { ListProject } from './pages/ListProject/ListProject'
import { IncomingComponents } from './pages/IncomingComponentsPage/IncomingComponents'
import { Components } from './pages/ListComponentsPage/Components'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
    <BrowserRouter>
        <Provider store={store}>
            <React.StrictMode>
                <Navbar />
                <Routes>
                    <Route
                        path='/'
                        element={<Login />}
                    />
                    <Route
                        path='/componenttypelist'
                        element={<ListComponentType />}
                    />
                    <Route
                        path='/addcomponenttype'
                        element={<NewComponentType />}
                    />
                    <Route
                        path='/adduser'
                        element={<AdminAddNewUser />}
                    />
                    <Route
                        path='/newproject'
                        element={<NewProject />}
                    />
                    <Route
                        path='/listprojects'
                        element={<ListProject />}
                    />
                    <Route
                        path='/incomingcomponents'
                        element={<IncomingComponents />}
                    />
                    <Route
                        path='listcomponents'
                        element={<Components />}
                    />
                </Routes>
            </React.StrictMode>
        </Provider>
    </BrowserRouter>
)
