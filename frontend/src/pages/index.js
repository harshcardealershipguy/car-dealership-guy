import Head from 'next/head'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import AppLayout from "@/components/Layouts/AppLayout";
import {Grid, Typography} from "@mui/material";

export default function Home() {
    const { user } = useAuth({ middleware: 'guest' })

    return (
        <>
            <Head>
                <title>Car Dealership Guy</title>
            </Head>

            <AppLayout>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant={'h1'}>Car Dealership Guy</Typography>
                    </Grid>
                </Grid>
                <Grid container>
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
            </AppLayout>

        </>
    )
}
