import {Box, Container, Grid, Paper, Typography} from "@mui/material";
import Link from "next/link";


const Footer = () => (
    <Paper sx={{
        mt: 6,
        width: '100%',
        backgroundColor: '#eee'
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
                    mb: 4,
                    mt: 2
                }}
            >
                <br/>
                <br/>
                <Typography variant="caption" color="initial">
                    Copyright ©2023. CarDealership Guy
                </Typography>

            </Box>


            <Grid container sx={{my: 3}}>
                <Grid item xs={4}>
                    <Link href={'/login'}>Login</Link>
                </Grid>

            </Grid>
        </Container>
    </Paper>
)

export default Footer
