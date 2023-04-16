import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { userSlice } from './reducers/userReducer'
import LoginPage from './pages/LoginPage/LoginPage'
import { store } from './store'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
    <Provider store={store}>
        <React.StrictMode>
            <LoginPage />
        </React.StrictMode>
    </Provider>
)
const counterReducer = userSlice.reducer
export default counterReducer
