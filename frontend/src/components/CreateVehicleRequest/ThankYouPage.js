import {Box, Button, Grid, Typography} from "@mui/material";
import {useRouter} from "next/router";


export const ThankYouPage = () => {
    const router = useRouter();

    return (
        <>
            <Box display="flex"
                 justifyContent="center"
                 alignItems="center"
                 sx={{my: 4}}>
                <Typography fontWeight={'bold'} variant={'h2'}>Thank you!</Typography>
            </Box>
            <Box display="flex"
                 justifyContent="center"
                 alignItems="center">
                <Typography textAlign={'center'} variant={'body1'}>One of our trusted partners will be in touch shortly.</Typography>
            </Box>

            <Grid container spacing={2} justifyContent={'center'} sx={{mt: 3}}>
                <Grid item>
                    <Button variant={'contained'} size={'large'} onClick={() => router.push('/')}>Browse Inventory</Button>
                </Grid>
            </Grid>
        </>
    );
};
