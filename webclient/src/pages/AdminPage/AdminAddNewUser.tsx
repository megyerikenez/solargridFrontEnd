import {
    Box,
    InputLabel,
    MenuItem,
    NativeSelect,
    Select,
    TextField,
    Typography,
} from '@mui/material'

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
                <InputLabel
                    variant='standard'
                    htmlFor='uncontrolled-native'
                    required
                >
                    Type
                </InputLabel>
                <Select
                    defaultValue={10}
                    inputProps={{
                        name: 'type',
                        id: 'uncontrolled-native',
                    }}
                >
                    <MenuItem value={10}>Szakember</MenuItem>
                    <MenuItem value={20}>Raktárvezető</MenuItem>
                    <MenuItem value={30}>Raktáros</MenuItem>
                </Select>
            </Box>
        </Box>
    )
}
