import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { Container, Snackbar } from '@mui/material'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { setUserData } from '../../reducers/userReducer'
import {
    addNewComponent,
    componentInterface,
} from '../../reducers/componentReducer'

export default function Login() {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState('')
    const handleSubmit = async (event: any) => {
        event.preventDefault()

        const email = event.target.email.value
        const password = event.target.password.value

        const data = {
            email: email,
            password: password,
        }

        async function getComponents() {
            const response = await fetch('http://localhost:100/ComponentType')
            const data = await response.json()
            data.forEach((component: componentInterface) => {
                dispatch(addNewComponent(component))
            })
        }

        const response = await fetch('http://localhost:100/Auth/Login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                dispatch(
                    setUserData({
                        userType: data.role,
                        userName: data.name,
                        userEmail: data.email,
                        userID: data.id,
                    })
                )
                setTitle('Login successfully')
                setOpen(true)
                getComponents()
            })
            // TODO add error handling
            .catch((error) => {
                setTitle('Bad credentials')
                setOpen(true)
            })
    }

    return (
        <Container
            component='main'
            maxWidth='lg'
        >
            <Snackbar
                open={open}
                message='Login successfully'
                onClose={(event, reason) => {
                    setOpen(false)
                }}
            />
            <Box
                sx={{
                    marginTop: 8,
                }}
            >
                <Grid container>
                    <CssBaseline />
                    <Grid
                        item
                        xs={false}
                        sm={4}
                        md={7}
                        sx={{
                            backgroundImage:
                                'url(https://media0.giphy.com/media/VRKheDy4DkBMrQm66p/giphy.gif?cid=6c09b952fab417d7e05297d98585335429dbbd6d89e0a140&rid=giphy.gif&ct=g)',
                            backgroundRepeat: 'no-repeat',
                            backgroundColor: (t) =>
                                t.palette.mode === 'light'
                                    ? t.palette.grey[50]
                                    : t.palette.grey[900],
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />
                    <Grid
                        item
                        xs={12}
                        sm={8}
                        md={5}
                        component={Paper}
                        elevation={6}
                        square
                    >
                        <Box
                            sx={{
                                my: 8,
                                mx: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Typography
                                component='h1'
                                variant='h5'
                            >
                                Sign in
                            </Typography>
                            <Box
                                component='form'
                                noValidate
                                onSubmit={handleSubmit}
                                sx={{ mt: 1 }}
                            >
                                <TextField
                                    margin='normal'
                                    required
                                    fullWidth
                                    id='email'
                                    label='Email Address'
                                    name='email'
                                    autoComplete='email'
                                    autoFocus
                                />
                                <TextField
                                    margin='normal'
                                    required
                                    fullWidth
                                    name='password'
                                    label='Password'
                                    type='password'
                                    id='password'
                                    autoComplete='current-password'
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            value='remember'
                                            color='primary'
                                        />
                                    }
                                    label='Remember me'
                                />
                                <Button
                                    type='submit'
                                    fullWidth
                                    variant='contained'
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Sign In
                                </Button>
                                <Grid container></Grid>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}
