import {
    Box,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@mui/material'
import { generatePassword } from '../LoginPage/passwordGenerator'

const password = generatePassword()

const possibleUserTypes = [
    'Specialist',
    'Warehouse Manager',
    'Warehouse Worker',
]

export function AdminAddNewUser() {
    return (
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
                >
                    <InputLabel htmlFor='name'>Name</InputLabel>
                </TextField>
                <TextField
                    margin='normal'
                    required
                    fullWidth
                    id='email'
                    label='Email'
                    name='email'
                    autoComplete='email'
                    autoFocus
                >
                    <InputLabel htmlFor='email'>Email</InputLabel>
                </TextField>
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
                    htmlFor='uncontrolled-native'
                    required
                >
                    Type
                </InputLabel>
                <Select
                    defaultValue='Specialist'
                    inputProps={{
                        name: 'type',
                        id: 'uncontrolled-native',
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
            </Box>
        </Box>
    )
}
