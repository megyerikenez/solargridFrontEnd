import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { userSlice } from './reducers/userReducer'
import { store } from './store'
import { AddNewPart } from './pages/NewPartPage/AddNewPart'
import { ListPart } from './pages/ListPartPage/ListPartPage'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
    <Provider store={store}>
        <React.StrictMode>
            <AddNewPart />
            <ListPart />
        </React.StrictMode>
    </Provider>
)
const counterReducer = userSlice.reducer
export default counterReducer
