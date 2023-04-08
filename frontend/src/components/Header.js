import {AppBar, Box, IconButton, Toolbar, Typography} from "@mui/material";
import Link from "next/link";

const Header = () => (
    <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{background: "#eeeeee"}} elevation={0}>
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
                    <Typography variant="h5" component="div" sx={{ flexGrow: 1 }} fontWeight={'bold'}>
                        <Link href={'/'} className={'black'} style={{textDecoration: 'none'}}>Car Dealership Guy</Link>
                    </Typography>

                <Typography sx={{mx: 2}}>
                    <Link href={'/create-vehicle-request/initial'} className={'black'}  style={{textDecoration: 'none'}}>Create Vehicle Request</Link>
                </Typography>

                <Typography>
                    <Link href={'/create-dealer-request'} className={'black'}  style={{textDecoration: 'none'}}>Join Partner Program</Link>
                </Typography>
            </Toolbar>
        </AppBar>
    </Box>
)

export default Header
