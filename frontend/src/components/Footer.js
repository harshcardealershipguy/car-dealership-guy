import {Box, Container, Paper, Typography} from "@mui/material";


const Footer = () => (
    <Paper sx={{marginTop: 'calc(10% + 60px)',
        width: '100%',
        position: 'fixed',
        bottom: 0,
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
        </Container>
    </Paper>
)

export default Footer
