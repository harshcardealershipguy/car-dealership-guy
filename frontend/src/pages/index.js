import Head from 'next/head'
import {Box, Grid, Paper, styled, Tooltip, tooltipClasses, Typography, Zoom} from "@mui/material";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function Home() {

    const listings = [
        {
            title: '2020 Mazda CX',
            price: '20,493',
            mileage: '94,203',
            image: '/vehicle-images/vehicle-4.png',
            location: '19446 - Lansdale, PA'
        },
        {
            title: '2020 Mazda CX',
            price: '20,493',
            mileage: '94,203',
            image: '/vehicle-images/vehicle-3.png',
            location: '60060 - Mundelein, IL'
        },
        {
            title: '2020 Mazda CX',
            price: '20,493',
            mileage: '94,203',
            image: '/vehicle-images/vehicle-2.png',
            location: '19446 - Lansdale, PA'
        },
        {
            title: '2020 Mazda CX',
            price: '20,493',
            mileage: '94,203',
            image: '/vehicle-images/vehicle-4.png',
            location: '60060 - Mundelein, IL'
        },
        {
            title: '2020 Mazda CX',
            price: '20,493',
            mileage: '94,203',
            image: '/vehicle-images/vehicle-3.png',
            location: '19446 - Lansdale, PA'
        },
        {
            title: '2020 Mazda CX',
            price: '20,493',
            mileage: '94,203',
            image: '/vehicle-images/vehicle-2.png',
            location: '60060 - Mundelein, IL'
        },
        {
            title: '2020 Mazda CX',
            price: '20,493',
            mileage: '94,203',
            image: '/vehicle-images/vehicle-4.png',
            location: '60060 - Mundelein, IL'
        },
        {
            title: '2020 Mazda CX',
            price: '20,493',
            mileage: '94,203',
            image: '/vehicle-images/vehicle-3.png',
            location: '19446 - Lansdale, PA'
        },
        {
            title: '2020 Mazda CX',
            price: '20,493',
            mileage: '94,203',
            image: '/vehicle-images/vehicle-2.png',
            location: '60060 - Mundelein, IL'
        },
    ];

    const HtmlTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
    ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: '#0077ff',
            color: 'white',
        },
    }));


    return (
        <>
            <div>
                <Head>
                    <title>CarDealershipGuy</title>
                </Head>

                <Header/>
                <Box className={'main-body'}>

                    <Grid container>
                        <Grid item xs={12}>
                            <Box className={'hero'} sx={{py: 10}}>
                                <Grid container justifyContent={'left'}>
                                    <Grid item sm={2}>

                                    </Grid>
                                    <Grid item sm={6} md={4} >
                                        <Box style={{backgroundColor: 'white'}} sx={{py: 2}}>
                                            <Typography sx={{pl: 4}} textAlign={'left'} variant={'h2'} color={'black'} fontWeight={'bold'} >READY<br/> FOR YOUR<br/> NEW VEHICLE?</Typography>
                                        </Box>

                                        <Box style={{backgroundColor: 'white'}} sx={{py: 2, mt: 2}}>
                                            <Typography sx={{pl: 4}} textAlign={'left'} variant={'h6'} color={'black'} fontWeight={'bold'} >We put you in the drivers seat for the best deals.</Typography>
                                        </Box>
                                    </Grid>
                                </Grid>

                            </Box>
                        </Grid>
                    </Grid>
                    <Grid container sx={{my:3}} justifyContent={'center'} >
                        <Grid item md={10}>

                            <Grid container spacing={2}>
                                {listings.map(listing => {
                                    return <Grid item xs={3}>
                                        <Paper sx={{p: 2}}>
                                            <Box display="flex" justifyContent="center">
                                            <Image src={listing.image} width={350} height={250} style={{borderRadius: '10px'}}></Image>
                                            </Box>
                                            <Typography variant={'h5'} fontWeight={'bold'} textAlign={'center'}>{listing.title}</Typography>

                                            <Typography variant={'h6'} textAlign={'center'}>
                                                <HtmlTooltip TransitionComponent={Zoom} title={<Typography variant={'h6'} textAlign={'center'}>Sign up to see our exclusive pricing!</Typography>}><Typography display={'inline'}>$████ </Typography></HtmlTooltip>
                                                - {listing.mileage} miles
                                            </Typography>
                                            <Typography variant={'subtitle1'} color={'gray'} textAlign={'center'}>${listing.location}</Typography>
                                        </Paper>
                                    </Grid>
                                })
                                }

                            </Grid>
                        </Grid>

                    </Grid>

                </Box>

                <Footer/>
            </div>

        </>
    )
}
