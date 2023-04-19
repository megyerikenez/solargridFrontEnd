import React, { useState } from 'react'
import {
    AppBar,
    Box,
    Button,
    CssBaseline,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Toolbar,
    Typography,
} from '@mui/material'
import { Link } from 'react-router-dom'
import GrassIcon from '@mui/icons-material/Grass'

interface Props {
    window?: () => Window
}

const drawerWidth = 240
const navItems = [
    { name: 'Add part', link: '/addpart' },
    { name: 'Parts', link: '/partlist' },
]

export default function WarehouseWorkerNavbar(props: Props) {
    const { window } = props
    const [mobileOpen, setMobileOpen] = useState(false)

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    }

    const drawer = (
        <Box
            onClick={handleDrawerToggle}
            sx={{ textAlign: 'center' }}
        >
            <Typography
                variant='h6'
                sx={{ my: 2 }}
            >
                TODOOOOOOOOOOOOOOOOOOOO
            </Typography>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem
                        key={item.name}
                        disablePadding
                    >
                        <ListItemButton sx={{ textAlign: 'center' }}>
                            <Link to={item.link}>
                                <ListItemText primary={item.name} />
                            </Link>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    )

    const container =
        window !== undefined ? () => window().document.body : undefined

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar component='nav'>
                <Toolbar>
                    <IconButton
                        color='inherit'
                        aria-label='open drawer'
                        edge='start'
                        onClick={handleDrawerToggle}
                        sx={{ display: { sm: 'none' } }}
                    >
                        <GrassIcon />
                    </IconButton>
                    <Typography
                        variant='h6'
                        component='div'
                        sx={{
                            flexGrow: 1,
                            display: { sm: 'block' },
                        }}
                    ></Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {navItems.map((item) => (
                            <Link to={item.link}>
                                <Button
                                    key={item.name}
                                    sx={{ color: '#fff' }}
                                >
                                    {item.name}
                                </Button>
                            </Link>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>
            <Box component='nav'>
                <Drawer
                    container={container}
                    variant='temporary'
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                        },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component='main'
                sx={{ p: 3 }}
            >
                <Toolbar />
            </Box>
        </Box>
    )
}
