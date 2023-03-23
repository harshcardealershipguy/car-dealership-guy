import {AppBar, Box, Button, IconButton, Toolbar, Typography} from "@mui/material";

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
                <img src={"logo.png"} style={{maxHeight: '50px', marginTop: '5px', marginBottom: '5px', marginRight: '5px'}}/>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} fontWeight={'bold'}>
                    Car Dealership Guy
                </Typography>
                <Button color="inherit">Dealer Login</Button>
            </Toolbar>
        </AppBar>
    </Box>
)

export default Header
