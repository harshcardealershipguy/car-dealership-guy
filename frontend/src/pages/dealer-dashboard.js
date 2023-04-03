import GuestLayout from '@/components/Layouts/GuestLayout'
import {Grid, Typography} from "@mui/material";

const DealerDashboard = () => {

    return (
        <GuestLayout>
            <Grid container justifyContent="center">
                <Grid item xs={5}>

                    <Typography variant={'h4'} fontWeight={'bold'} sx={{mt: 3}}>Dealer Dashboard</Typography>


                </Grid>
            </Grid>
        </GuestLayout>
    )
}

export default DealerDashboard
