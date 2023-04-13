import { Box, Button, TextField, Typography } from '@mui/material'

export function AdminPage() {
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
                Add a new part
            </Typography>
            <Box>
                <TextField
                    margin='normal'
                    required
                    fullWidth
                    id='partNumber'
                    label='Part Number'
                    name='partNumber'
                    autoComplete='partNumber'
                    autoFocus
                />
                <TextField
                    margin='normal'
                    required
                    fullWidth
                    id='partName'
                    label='Part Name'
                    name='partName'
                    autoComplete='partName'
                    autoFocus
                />
                <TextField
                    margin='normal'
                    required
                    fullWidth
                    id='partDescription'
                    label='Part Description'
                    name='partDescription'
                    autoComplete='partDescription'
                    autoFocus
                />
                <TextField
                    margin='normal'
                    required
                    fullWidth
                    id='partPrice'
                    label='Part Price'
                    name='partPrice'
                    autoComplete='partPrice'
                    autoFocus
                />
                <TextField
                    margin='normal'
                    required
                    fullWidth
                    id='partQuantity'
                    label='Part Quantity'
                    name='partQuantity'
                    autoComplete='partQuantity'
                    autoFocus
                />
                <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    sx={{ mt: 3, mb: 2 }}
                >
                    Add Part
                </Button>
            </Box>
        </Box>
    )
}
