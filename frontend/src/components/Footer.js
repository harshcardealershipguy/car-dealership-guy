import {Box, Container, Paper, Typography} from "@mui/material";


const Footer = () => (
    <Paper sx={{
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
        </Container>
    </Paper>
)

export default Footer
