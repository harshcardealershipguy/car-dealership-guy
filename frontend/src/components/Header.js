import {AppBar, Avatar, Box, IconButton, ListItemIcon, Menu, MenuItem, Toolbar, Typography} from "@mui/material";
import Link from "next/link";
import {useAuth} from "@/hooks/auth";
import * as React from 'react';
import {useState} from "react";
import {Logout, Person} from "@mui/icons-material";
import {useRouter} from "next/router";

const Header = () => {
    const router = useRouter();

    const {user} = useAuth();
    const {logout} = useAuth();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (<Box sx={{flexGrow: 1}}>
            <AppBar position="static" style={{background: "#eeeeee"}} elevation={0}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >

                    </IconButton>

                    <img src={"/logo.png"}
                         style={{maxHeight: '50px', marginTop: '5px', marginBottom: '5px', marginRight: '5px'}}/>
                    <Typography variant="h5" component="div" sx={{flexGrow: 1}} fontWeight={'bold'}>
                        <Link href={'/'} className={'black'} style={{textDecoration: 'none'}}>Car Dealership Guy</Link>
                    </Typography>

                    <Typography sx={{mx: 2}}>
                        <Link href={'/create-vehicle-request/initial'} className={'black'}
                              style={{textDecoration: 'none'}}>Create Vehicle Request</Link>
                    </Typography>

                    <Typography sx={{mx: 2}}>
                        <Link href={'/create-dealer-request'} className={'black'} style={{textDecoration: 'none'}}>Join Partner Program</Link>
                    </Typography>

                    {user ?
                        (
                            <>
                                <Avatar onClick={handleClick} sx={{ml: 1}}>{user?.name.charAt(0)}</Avatar>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    PaperProps={{
                                        elevation: 0,
                                        sx: {
                                            overflow: 'visible',
                                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                            mt: 1.5,
                                            '& .MuiAvatar-root': {
                                                width: 32,
                                                height: 32,
                                                ml: -0.5,
                                                mr: 1,
                                            },
                                            '&:before': {
                                                content: '""',
                                                display: 'block',
                                                position: 'absolute',
                                                top: 0,
                                                right: 14,
                                                width: 10,
                                                height: 10,
                                                bgcolor: 'background.paper',
                                                transform: 'translateY(-50%) rotate(45deg)',
                                                zIndex: 0,
                                            },
                                        },
                                    }}
                                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}

                                >
                                    <MenuItem onClick={() => router.push('/dashboard')}>
                                        <ListItemIcon><Person /></ListItemIcon>
                                        Dashboard
                                    </MenuItem>

                                    <MenuItem onClick={logout}>
                                        <ListItemIcon><Logout /></ListItemIcon>
                                        Logout
                                    </MenuItem>
                                </Menu>
                            </>
                        ) : (
                            <>
                                <Typography sx={{mx: 2}}>
                                    <Link href={'/login'} className={'black'} style={{textDecoration: 'none'}}>Login</Link>
                                </Typography>

                                <Typography sx={{mx: 2}}>
                                    <Link href={'/register'} className={'black'} style={{textDecoration: 'none'}}>Create Account</Link>
                                </Typography>
                            </>
                        )}
                    <Typography></Typography>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Header
