import {Box, Typography} from "@mui/material";

export const ThankYouPage = () => {
    return (
        <>
            <Box display="flex"
                 justifyContent="center"
                 alignItems="center">
                <Typography fontWeight={'bold'} variant={'h2'} sx={{my: 2}}>Thank you!</Typography>
            </Box>
            <Box display="flex"
                 justifyContent="center"
                 alignItems="center">
                <Typography textAlign={'center'} variant={'p'}>One of our trusted partners will be in touch shortly.</Typography>
            </Box>
        </>
    );
};
