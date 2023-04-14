import {Box, Container, Grid, Paper, Typography} from "@mui/material";
import Link from "next/link";


const Footer = () => (
    <Paper sx={{
        mt: 0,
        width: '100%',
        backgroundColor: '#2d2d2d'
    }} component="footer" square variant="outlined">
        <Container maxWidth="lg">
            <Box
                sx={{
                    flexGrow: 1,
                    justifyContent: "center",
                    display: "flex",
                    my:1
                }}
            >
                <div>

                </div>
            </Box>

            <Box
                sx={{
                    flexGrow: 1,
                    justifyContent: "center",
                    display: "flex",
                    mb: 2,
                    mt: 5
                }}
            >
                <br/>
                <br/>
                <Typography variant="caption" color="initial" className={'white'} textAlign={'center'}>
                    Copyright ©2023. CarDealership Guy
                </Typography>

            </Box>


            <Grid container sx={{mt: 2, mb: 25}} justifyContent={'center'} spacing={8}>
                <Grid item>
                    <Link href={'/login'} className={'white'}><Typography textAlign={'center'}>Login</Typography></Link>
                    <br/>
                    <Link href={'/register'} className={'white'}><Typography textAlign={'center'}>Register</Typography></Link>

                </Grid>
                <Grid item>

                    <Link href={'/create-vehicle-request/initial'} className={'white'}><Typography textAlign={'center'}>Create Vehicle Request</Typography></Link>
                    <br/>
                    <Link href={'/create-dealer-request'} className={'white'}><Typography textAlign={'center'}>Create Dealer Request</Typography></Link>
                </Grid>
                <Grid item>


                    <Link href={'/privacy-policy'} className={'white'}><Typography textAlign={'center'}>Privacy Policy</Typography></Link>
                    <br/>
                    <Link href={'/terms-of-use'} className={'white'}><Typography textAlign={'center'}>Terms Of Use</Typography></Link>
                </Grid>
                <Grid item>
                    <Link href={'/about-us'} className={'white'}><Typography textAlign={'center'}>About Us</Typography></Link>
                </Grid>

            </Grid>
        </Container>
    </Paper>
)

export default Footer
