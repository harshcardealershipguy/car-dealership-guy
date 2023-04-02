import {AppBar, Box, Button, IconButton, Toolbar, Typography} from "@mui/material";
import Link from "next/link";

const Header = () => (
    <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{background: "#252530"}}>
            <Toolbar >
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >

                </IconButton>

                    <img src={"/logo.png"} style={{maxHeight: '50px', marginTop: '5px', marginBottom: '5px', marginRight: '5px'}}/>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} fontWeight={'bold'}>
                        <a href={'/'} className={'white'}>Car Dealership Guy</a>
                    </Typography>

                <Typography sx={{mx: 2}}>
                    <Link href={'/create-vehicle-request/initial'} className={'white'}>Create Vehicle Request</Link>
                </Typography>

                <Typography>
                    <Link href={'/create-dealer-request'} className={'white'}>Join Partner Program</Link>
                </Typography>
            </Toolbar>
        </AppBar>
    </Box>
)

export default Header
