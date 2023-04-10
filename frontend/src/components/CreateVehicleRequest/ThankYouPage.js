import {Box, Typography} from "@mui/material";

export const ThankYouPage = () => {
    return (
        <>
            <Box display="flex"
                 justifyContent="center"
                 alignItems="center"
                 sx={{my: 4}}>
                <Typography fontWeight={'bold'} variant={'h2'} sx={{my: 2}}>Thank you!</Typography>
            </Box>
            <Box display="flex"
                 justifyContent="center"
                 alignItems="center">
                <Typography textAlign={'center'} variant={'body1'}>One of our trusted partners will be in touch shortly.</Typography>
            </Box>
        </>
    );
};
