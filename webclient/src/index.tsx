import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store'
import { AddNewPart } from './pages/NewPartPage/AddNewPart'
import { ListPart } from './pages/ListPartPage/ListPartPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
    <BrowserRouter>
        <Provider store={store}>
            <React.StrictMode>
                <Routes>
                    <Route
                        path='/'
                        element={<AddNewPart />}
                    />
                    <Route
                        path='/list'
                        element={<ListPart />}
                    />
                </Routes>
            </React.StrictMode>
        </Provider>
    </BrowserRouter>
)
