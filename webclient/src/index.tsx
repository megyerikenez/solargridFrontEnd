import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { AdminPage } from './pages/AdminPage/AdminPage'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <React.StrictMode>
        <AdminPage />
    </React.StrictMode>
)
