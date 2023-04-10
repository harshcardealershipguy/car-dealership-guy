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
                    mb: 15,
                    mt: 5
                }}
            >
                <br/>
                <br/>
                <Typography variant="caption" color="initial">
                    Copyright ©2023. CarDealership Guy
                </Typography>

            </Box>


            <Grid container sx={{my: 10}}>
                <Grid item xs={4}>
                    <Link href={'/register'}>Register</Link>
                </Grid>
                <Grid item xs={4}>
                    <Link href={'/login'}>Login</Link>
                </Grid>

            </Grid>
        </Container>
    </Paper>
)

export default Footer
