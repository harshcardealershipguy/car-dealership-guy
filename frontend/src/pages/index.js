import Head from 'next/head'
import {
    Box,
    Button,
    CardMedia,
    Chip, Divider,
    Grid,
    Paper,
    styled,
    Tooltip,
    tooltipClasses,
    Typography,
    Zoom
} from "@mui/material";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import NoCrashIcon from '@mui/icons-material/NoCrash';
import CarRentalIcon from '@mui/icons-material/CarRental';
import axios from "@/lib/axios";
import {useEffect} from "react";

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
            image: '/vehicle-images/vehicle-1.png',
            location: '60060 - Mundelein, IL'
        },
        {
            title: '2020 Mazda CX',
            price: '20,493',
            mileage: '94,203',
            image: '/vehicle-images/vehicle-5.png',
            location: '19446 - Lansdale, PA'
        },
        {
            title: '2020 Mazda CX',
            price: '20,493',
            mileage: '94,203',
            image: '/vehicle-images/vehicle-6.png',
            location: '60060 - Mundelein, IL'
        },
        {
            title: '2020 Mazda CX',
            price: '20,493',
            mileage: '94,203',
            image: '/vehicle-images/vehicle-7.png',
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
            image: '/vehicle-images/vehicle-1.png',
            location: '60060 - Mundelein, IL'
        },
        {
            title: '2020 Mazda CX',
            price: '20,493',
            mileage: '94,203',
            image: '/vehicle-images/vehicle-5.png',
            location: '19446 - Lansdale, PA'
        },
        {
            title: '2020 Mazda CX',
            price: '20,493',
            mileage: '94,203',
            image: '/vehicle-images/vehicle-6.png',
            location: '60060 - Mundelein, IL'
        },
        {
            title: '2020 Mazda CX',
            price: '20,493',
            mileage: '94,203',
            image: '/vehicle-images/vehicle-7.png',
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
            borderRadius: '10px',
        },
    }));

    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    const getCards = () => {
        const listingCards = listings.map(listing => {
            return <Grid item xs={4}>
                <Paper sx={{pb: 2}} elevation={0}>

                    <Box display="flex" justifyContent="center">
                        <CardMedia component="img" height="230" image={listing.image} sx={{borderTopRightRadius: '20px', borderTopLeftRadius: '20px'}} />
                    </Box>
                    <Chip color={'primary'} label={'New'} sx={{mx: 2, mt: 2}} variant={'outlined'}/>
                    <Typography variant={'h5'} fontWeight={'bold'} textAlign={'center'} sx={{pt: 0}}>{listing.title}</Typography>
                    <Typography variant={'body1'} textAlign={'center'} color={'gray'}>Platinum 4D AWD</Typography>
                    <Typography variant={'subtitle1'} color={'gray'} textAlign={'center'}>{listing.location}</Typography>

                    <Typography variant={'h6'} textAlign={'center'} sx={{mt: 2}}>
                        <Typography variant={'h5'} display={'inline'} fontWeight={'bold'}> {listing.mileage} miles - $</Typography>

                        <HtmlTooltip TransitionComponent={Zoom} title={<Typography variant={'h6'} textAlign={'center'}>Sign up to see our exclusive pricing!</Typography>}>
                            <Box display={'inline'}>
                                <Typography display={'inline'} className={'blur-text'} fontWeight={'bold'} variant={'h5'}>23,000</Typography>
                                <HelpOutlineIcon fontSize={'small'}/>
                            </Box>
                        </HtmlTooltip>

                    </Typography>


                </Paper>
            </Grid>
        });

        const promoCard1 = <Grid item xs={4}>
            <Paper sx={{pb: 2}} elevation={0} sx={{px: 2}}>
                <Typography variant={'h5'} textAlign={'center'} sx={{pt: 4}}>
                    <ReceiptLongIcon fontSize={'large'} style={{transform: 'scale(2.8)'}} sx={{my: 4}}/>
                </Typography>
                <Typography variant={'h6'} fontWeight={'bold'} textAlign={'center'} sx={{mt: 2}}>
                    Purchase Your Next Car With Car Dealership Guy
                </Typography>
                <Typography variant={'body1'} textAlign={'center'} sx={{mt: 2, pb: 4}}>
                    Get a great deal and a personalized experience, exclusively for members.
                </Typography>
                <Button variant={'contained'} size={'large'} sx={{mb: 4}} fullWidth>Sign Up Now</Button>
            </Paper>
        </Grid>

        const promoCard2 = <Grid item xs={4}>
            <Paper sx={{pb: 2}} elevation={0} sx={{px: 2}}>
                <Typography variant={'h5'} textAlign={'center'} sx={{pt: 4}}>
                    <NoCrashIcon fontSize={'large'} style={{transform: 'scale(2.8)'}} sx={{my: 4}}/>
                </Typography>
                <Typography variant={'h6'} fontWeight={'bold'} textAlign={'center'} sx={{mt: 2}}>
                    Purchase Your Next Car With Car Dealership Guy
                </Typography>
                <Typography variant={'body1'} textAlign={'center'} sx={{mt: 2, pb: 4}}>
                    Get a great deal and a personalized experience, exclusively for members.
                </Typography>
                <Button variant={'contained'} size={'large'} sx={{mb: 4}} fullWidth>Sign Up Now</Button>
            </Paper>
        </Grid>

        const promoCard3 = <Grid item xs={4}>
            <Paper sx={{pb: 2}} elevation={0} sx={{px: 2}}>
                <Typography variant={'h5'} textAlign={'center'} sx={{pt: 4}}>
                    <CarRentalIcon fontSize={'large'} style={{transform: 'scale(2.8)'}} sx={{my: 4}}/>
                </Typography>
                <Typography variant={'h6'} fontWeight={'bold'} textAlign={'center'} sx={{mt: 2}}>
                    Purchase Your Next Car With Car Dealership Guy
                </Typography>
                <Typography variant={'body1'} textAlign={'center'} sx={{mt: 2, pb: 4}}>
                    Get a great deal and a personalized experience, exclusively for members.
                </Typography>
                <Button variant={'contained'} size={'large'} sx={{mb: 4}} fullWidth>Sign Up Now</Button>
            </Paper>
        </Grid>

        const array = [...listingCards, promoCard1, promoCard2, promoCard3];

        shuffleArray(array);

        return array;


    }


    useEffect(() => {
        axios.get('http://stagi-stagi-pllspmjzuuso-1831827029.us-east-1.elb.amazonaws.com/')
            .then(res => res.data);
    }, []);


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
                                    <Grid item sm={1}>
                                    </Grid>
                                    <Grid item sm={6} md={4} >
                                        <Box style={{backgroundColor: 'transparent'}} sx={{pt: 0}}>
                                            <Typography sx={{pl: 4}} textAlign={'left'} variant={'h2'} color={'white'} fontWeight={'bold'} >READY<br/> FOR YOUR<br/> NEW VEHICLE?</Typography>
                                        </Box>

                                        <Box style={{backgroundColor: 'transparent'}} sx={{pb: 2, mt: 1}}>
                                            <Typography sx={{pl: 4}} textAlign={'left'} variant={'h6'} color={'white'} fontWeight={'bold'} >Getting a great deal has never been easier.</Typography>
                                        </Box>
                                    </Grid>
                                </Grid>

                            </Box>
                        </Grid>
                    </Grid>
                    <Grid container sx={{my:3}} justifyContent={'center'} >
                        <Grid item md={10}>

                            <Grid container spacing={3}>
                                {getCards()}

                            </Grid>
                        </Grid>

                    </Grid>

                </Box>

                <Footer/>
            </div>

        </>
    )
}
