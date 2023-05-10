import {
    Box,
    Button,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@mui/material'
import { generatePassword } from '../LoginPage/passwordGenerator'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { UnauthorizedAccess } from '../UnathorizedAccess/UnauthorizedAccess'

const possibleUserTypes = ['Specialist', 'WarehouseManager', 'WarehouseWorker']

export function AdminAddNewUser() {
    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [role, setRole] = React.useState('Specialist')
    const [password, setPassword] = React.useState(generatePassword())
    const currentUserRole = useSelector(
        (state: RootState) => state.userReducer.userType
    )

    const handleSubmit = (event: any) => {
        event.preventDefault()

        fetch('http://localhost:100/Auth/Register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                role,
                password,
            }),
        })
            .then(() => {
                console.log('sikeres')
            })
            .catch((error) => {
                console.error('Error:', error)
            })
    }
    return currentUserRole === 'admin' ? (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Typography
                component='h1'
                variant='h5'
            >
                Add a new user
            </Typography>
            <Box
                component='form'
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    margin: '1rem',
                }}
            >
                <TextField
                    margin='normal'
                    required
                    fullWidth
                    id='name'
                    label='Name'
                    name='name'
                    autoComplete='name'
                    autoFocus
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
                <TextField
                    margin='normal'
                    required
                    fullWidth
                    id='email'
                    label='Email'
                    name='email'
                    autoComplete='email'
                    autoFocus
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
                <TextField
                    margin='normal'
                    required
                    fullWidth
                    id='password'
                    name='password'
                    helperText='Copy this password and send to the user'
                    autoComplete='password'
                    autoFocus
                    value={password}
                    disabled
                >
                    <InputLabel htmlFor='password'>Password</InputLabel>
                </TextField>
                <InputLabel
                    variant='standard'
                    htmlFor='role'
                    required
                >
                    Type
                </InputLabel>
                <Select
                    value={role}
                    onChange={(event) => setRole(event.target.value)}
                    inputProps={{
                        name: 'type',
                        id: 'type',
                    }}
                >
                    {possibleUserTypes.map((type) => (
                        <MenuItem
                            key={type}
                            value={type}
                        >
                            {type}
                        </MenuItem>
                    ))}
                </Select>
                <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    sx={{ mt: 3, mb: 2 }}
                >
                    <Typography
                        component='h1'
                        variant='h5'
                    >
                        Add User
                    </Typography>
                </Button>
            </Box>
        </Box>
    ) : (
        <UnauthorizedAccess />
    )
}
