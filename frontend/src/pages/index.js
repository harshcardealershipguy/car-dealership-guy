import Head from 'next/head'
import AppLayout from "@/components/Layouts/AppLayout";
import {Grid, Typography} from "@mui/material";
import GuestLayout from "@/components/Layouts/GuestLayout";

export default function Home() {
    return (
        <>
            <Head>
                <title>Car Dealership Guy</title>
            </Head>

            <GuestLayout>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography textAlign={'center'} variant={'h4'}>Ready for your new vehicle?</Typography>
                    </Grid>
                </Grid>
                <Grid container sx={{my:3}}>
                    <Grid item xs={4}>
                        Item 1
                    </Grid>
                    <Grid item xs={4}>
                        Item 2
                    </Grid>
                    <Grid item xs={4}>
                        Item 3
                    </Grid>
                </Grid>
            </GuestLayout>

        </>
    )
}
