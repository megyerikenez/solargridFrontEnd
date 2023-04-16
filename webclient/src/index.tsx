import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { userSlice } from './reducers/userReducer'
import { store } from './store'
import { AddNewPart } from './pages/NewPartPage/AddNewPart'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
    <Provider store={store}>
        <React.StrictMode>
            <AddNewPart />
        </React.StrictMode>
    </Provider>
)
const counterReducer = userSlice.reducer
export default counterReducer
