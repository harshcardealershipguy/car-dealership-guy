import Head from 'next/head'
import {
    Box,
    Button,
    CardMedia, Chip, CircularProgress,
    Grid,
    MenuItem,
    Paper,
    styled,
    Tooltip,
    tooltipClasses,
    Typography, Zoom
} from "@mui/material";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import NoCrashIcon from '@mui/icons-material/NoCrash';
import CarRentalIcon from '@mui/icons-material/CarRental';
import axios from "@/lib/axios";
import {useEffect, useState} from "react";
import SingleSelect from "@/components/Form/SingleSelect";
import {yearHighs, yearLows} from "@/data/years";
import {useForm} from "react-hook-form";
import {makesModels} from "@/data/makesModels";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

export default function Home() {

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

    const [vehicles, setVehicles] = useState([]);
    const [isVehiclesLoading, setIsVehiclesLoading] = useState(true);

    const getCards = () => {
        const listingCards = vehicles.map((vehicle) => {
            return (
                <Grid item xs={4} key={vehicle.external_id}>
                    <Paper sx={{pb: 2}} elevation={0}>

                        <Box display="flex" justifyContent="center">
                            <CardMedia component="img" height="230" image={vehicle.images[0]} sx={{borderTopRightRadius: '20px', borderTopLeftRadius: '20px'}} />
                        </Box>
                        <Chip color={'primary'} label={'New'} sx={{mx: 2, mt: 2}} variant={'outlined'}/>
                        <Typography variant={'h5'} fontWeight={'bold'} textAlign={'center'} sx={{pt: 0}}>{vehicle.year} {vehicle.make} {vehicle.model}</Typography>
                        <Typography variant={'body1'} textAlign={'center'} color={'gray'}>trim</Typography>
                        <Typography variant={'subtitle1'} color={'gray'} textAlign={'center'}>location</Typography>

                        <Box textAlign={'center'}>
                            <Typography variant={'h6'} display={'inline'} fontWeight={'bold'} > {vehicle.mileage} miles - $</Typography>
                            <HtmlTooltip TransitionComponent={Zoom} title={<Typography variant={'h6'} textAlign={'center'}>Sign up to see our exclusive pricing!</Typography>}>
                                <Box display={'inline'}>
                                    <Typography display={'inline'} className={'blur-text'} fontWeight={'bold'} variant={'h5'}>{vehicle.price}</Typography>
                                    <HelpOutlineIcon fontSize={'small'}/>
                                </Box>
                            </HtmlTooltip>
                        </Box>
                    </Paper>
                </Grid>
            );
        })

        const promoCard1 = <Grid item xs={4}>
            <Paper sx={{p: 4}} elevation={0} className={'promo-card-1'}>
                <Typography variant={'h4'} fontWeight={'bold'} textAlign={'center'} sx={{mt: 2}}>
                    Purchase Your Next Car With Car Dealership Guy
                </Typography>
                <Typography variant={'body1'} textAlign={'center'} sx={{mt: 2, pb: 4}}>
                    Get a great deal and a personalized experience, exclusively for members.
                </Typography>
                <Button variant={'contained'} size={'large'} sx={{mb: 4}} fullWidth>Sign Up Now</Button>
            </Paper>
        </Grid>

        const promoCard2 = <Grid item xs={4}>
            <Paper sx={{p: 4}} elevation={0} className={'promo-card-2'}>
                <Typography variant={'h4'} fontWeight={'bold'} textAlign={'center'} sx={{mt: 2}}>
                    Purchase Your Next Car With Car Dealership Guy
                </Typography>
                <Typography variant={'body1'} textAlign={'center'} sx={{mt: 2, pb: 4}}>
                    Get a great deal and a personalized experience, exclusively for members.
                </Typography>
                <Button variant={'contained'} size={'large'} sx={{mb: 4}} fullWidth>Sign Up Now</Button>
            </Paper>
        </Grid>

        const promoCard3 = <Grid item xs={4}>
            <Paper sx={{p: 4}} elevation={0} className={'promo-card-3'}>
                <Typography variant={'h4'} fontWeight={'bold'} textAlign={'center'} sx={{mt: 2}}>
                    Purchase Your Next Car With Car Dealership Guy
                </Typography>
                <Typography variant={'body1'} textAlign={'center'} sx={{mt: 2, pb: 4}}>
                    Get a great deal and a personalized experience, exclusively for members.
                </Typography>
                <Button variant={'contained'} size={'large'} sx={{mb: 4}} fullWidth>Sign Up Now</Button>
            </Paper>
        </Grid>

        listingCards.splice(2, 0, promoCard1);

        if (listingCards.length > 7) {
            listingCards.splice(6, 0, promoCard2);
            listingCards.splice(11, 0, promoCard3);
        }
        return listingCards;
    }

    const {
        reset,
        handleSubmit,
        register,
        watch,
        setValue,
        formState: { errors },
    } = useForm({ mode: "onChange" });

    const year_low = watch('year_low');
    const year_high = watch('year_high');
    const make = watch('make');
    const model = watch('model');

    useEffect(() => {
        setIsVehiclesLoading(true);

        //if the make changes, clear out the model
        if(make && model && !(makesModels[make].includes(model))) {
            setValue('model', '');
        }

        const queryParams = {
            "limit": 99,
            "year_low": year_low,
            "year_high": year_high,
            "make": make,
            "model": model
        };

        const queryString = Object.keys(queryParams).filter(key => queryParams[key]).map(key => key + '=' + queryParams[key]).join('&');

        axios
            .get('/api/vehicles?' + queryString)
            .then(res => res.data)
            .then(data => {
                setIsVehiclesLoading(false);
                setVehicles(data);
            });
    }, [year_low, year_high, make, model]);

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
                        <Grid item sm={10}>
                            <Paper className={'vehicle-request-card'} sx={{mb: 2, py: 2, pl: 2}}>
                                <form>

                                    <Grid container  alignItems={'center'} spacing={1}>
                                        <Grid item sm={1}>
                                            <Typography variant={'body1'} color={'gray'} textAlign={'center'} fontWeight={'bold'}>Filter</Typography>
                                        </Grid>
                                        <Grid item sm={2}>
                                            <SingleSelect id={'year_low'} label={'Year Minimum'} defaultValue={''} errors={errors} register={register}>
                                                <MenuItem value={""}>Any</MenuItem>

                                                {yearLows.map(function(year) {
                                                    return <MenuItem value={year} key={year}>{year}</MenuItem>
                                                })}
                                            </SingleSelect>
                                        </Grid>

                                        <Grid item sm={2}>
                                            <SingleSelect id={'year_high'} label={'Year Maximum'} defaultValue={''} errors={errors} register={register}>
                                                <MenuItem value="">Any</MenuItem>

                                                {yearHighs.map(function(year) {
                                                    return <MenuItem value={year} key={year}>{year}</MenuItem>
                                                })}
                                            </SingleSelect>
                                        </Grid>

                                        <Grid item sm={2}>
                                            <SingleSelect id={'make'} label={'Make'} defaultValue={''} errors={errors} register={register}>
                                                <MenuItem value="">Any</MenuItem>

                                                {Object.keys(makesModels).map(function(make) {
                                                    return <MenuItem value={make} key={make}>{make}</MenuItem>
                                                })}
                                            </SingleSelect>
                                        </Grid>

                                        <Grid item sm={2}>
                                            <SingleSelect id={'model'} label={'Model'} defaultValue={''} errors={errors} register={register}>
                                                <MenuItem value="">Any</MenuItem>

                                                {makesModels[make] && Object.keys(makesModels[make]).map(function(model) {
                                                    return <MenuItem value={makesModels[make][model]} key={makesModels[make][model]}>{makesModels[make][model]}</MenuItem>
                                                })}
                                            </SingleSelect>
                                        </Grid>
                                </Grid>
                                </form>
                            </Paper>

                        </Grid>

                        <Grid item md={10}>
                            <Grid container spacing={2}>

                                {isVehiclesLoading && (
                                    <div style={{display: 'flex', justifyContent: 'center', paddingTop: '30px', paddingBottom: '30px', width: '100%'}}>
                                        <CircularProgress />
                                    </div>
                                )}

                                {!isVehiclesLoading && getCards() }

                            </Grid>
                        </Grid>

                    </Grid>

                </Box>

                <Footer/>
            </div>

        </>
    )
}
