import axios from "@/lib/axios";
import {useEffect, useState} from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    CardMedia,
    Chip,
    CircularProgress,
    Grid,
    Paper,
    Typography
} from "@mui/material";
import moment from "moment";
import toTitleCase from "@/lib/toTitleCase";
import {useRouter} from "next/router";
import AuthSessionStatus from "@/components/AuthSessionStatus";
import Link from "next/link";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ConversationsList from "@/components/ConversationsList";
import vehicleRequestNameFormatter from "@/lib/vehicleRequestNameFormatter";

const DealerDashboard = ({user}) => {

    const [vehicleRequests, setVehicleRequests] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [isVehiclesLoading, setIsVehiclesLoading] = useState(true);
    const [isVehicleRequestsLoading, setIsVehicleRequestsLoading] = useState(true);

    const router = useRouter();

    useEffect(() => {
        axios
            .get('/api/vehicle-requests?limit=15')
            .then(res => res.data)
            .then(data => {
                data.forEach(dataItem => {
                    dataItem['created_since'] = moment(dataItem['created_at']).fromNow();
                });
                setIsVehicleRequestsLoading(false);
                return setVehicleRequests(data);
            });

        axios
            .get('/api/vehicle?limit=9')
            .then(res => res.data)
            .then(data => {
                setIsVehiclesLoading(false);
                return setVehicles(data);
            });

    }, []);

    function detailsLine (vehicleRequest, property) {
        return <><Typography color="text.secondary" style={{display: 'inline-block'}} sx={{ml: 1}}>{toTitleCase(property)}</Typography> <Typography style={{display: 'inline-block'}}>{toTitleCase(vehicleRequest[property] ?? '--')}</Typography></>
    }

    return (
        <>
            <Grid container alignItems={'center'} justifyContent="center" >
                <Grid item xs={12} md={10} lg={8}>

                    <AuthSessionStatus status={status} />

                    <Paper elevation={0} sx={{px: 4, pb: 4, pt: 1, mt: 2}}>

                        <Grid container sx={{mt: 3}}>
                            <Grid item sm={9}>
                                <Typography variant={'h4'} fontWeight={'bold'} >Dealer Dashboard</Typography>
                                <Typography variant={'body1'} color={'gray'}>Dashboard</Typography>
                            </Grid>
                            <Grid item sm={3}>
                                <Button onClick={() => router.push('/create-vehicle')} variant={'contained'} size={'large'} fullWidth>List a Vehicle!</Button>
                            </Grid>
                        </Grid>

                        <ConversationsList/>

                        {isVehicleRequestsLoading && (
                            <div style={{display: 'flex', justifyContent: 'center', paddingTop: '30px', paddingBottom: '30px'}}>
                                <CircularProgress />
                            </div>
                        )}

                        {!isVehicleRequestsLoading && (
                            <>
                                {vehicleRequests.length > 0 && (<Typography variant={'h6'} fontWeight={'bold'} sx={{mt: 3}}>Open Vehicle Requests</Typography>)}
                                <Grid container spacing={2}>
                                    {vehicleRequests.map((vehicleRequest) => {
                                        return (
                                            <Grid item key={vehicleRequest.external_id} xs={12}>
                                                <Paper className={'vehicle-request-card'}>
                                                    <Grid container justifyContent={'center'} alignItems={'center'}>
                                                        <Grid item sx={{my: 1, p: 1}} sm={10}>

                                                            <Accordion elevation={0}>
                                                                <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel1a-header" >
                                                                    <Typography variant={'body1'}>{vehicleRequestNameFormatter(vehicleRequest)}</Typography>
                                                                </AccordionSummary>
                                                                <AccordionDetails>
                                                                    <Grid container>
                                                                        <Grid item md={4}>
                                                                            {detailsLine(vehicleRequest, 'new_or_used')} <br/>
                                                                            {detailsLine(vehicleRequest, 'year_low')} <br/>
                                                                            {detailsLine(vehicleRequest, 'year_high')} <br/>
                                                                            {detailsLine(vehicleRequest, 'make')} <br/>
                                                                            {detailsLine(vehicleRequest, 'model')} <br/>
                                                                            {detailsLine(vehicleRequest, 'created_since')}
                                                                        </Grid>
                                                                        <Grid item md={4}>
                                                                            {detailsLine(vehicleRequest, 'timeframe')} <br/>
                                                                            {detailsLine(vehicleRequest, 'body_style')} <br/>
                                                                            {detailsLine(vehicleRequest, 'size')} <br/>
                                                                            {detailsLine(vehicleRequest, 'makes')} <br/>
                                                                            {detailsLine(vehicleRequest, 'exterior_colors')}
                                                                        </Grid>
                                                                        <Grid item md={4}>
                                                                            {detailsLine(vehicleRequest, 'payment_method')} <br/>
                                                                            {detailsLine(vehicleRequest, 'budget_or_monthly_payment')} <br/>
                                                                            {detailsLine(vehicleRequest, 'city')} <br/>
                                                                            {detailsLine(vehicleRequest, 'state')}
                                                                        </Grid>
                                                                    </Grid>
                                                                </AccordionDetails>
                                                            </Accordion>
                                                        </Grid>
                                                        <Grid item sx={{my: 1}} sm={2}>
                                                            <Link href={'/vehicle-request/' + vehicleRequest.external_id}><Button variant={'outlined'}>View Vehicle Request</Button></Link>
                                                        </Grid>
                                                    </Grid>
                                                </Paper>
                                            </Grid>
                                        );
                                    })}
                                </Grid>
                            </>
                        )}

                        {isVehiclesLoading && (
                            <div style={{display: 'flex', justifyContent: 'center', paddingTop: '30px'}}>
                                <CircularProgress />
                            </div>
                        )}

                        {!isVehiclesLoading && (
                            <>
                                <Typography variant={'h6'} fontWeight={'bold'} sx={{mt: 3}}>Your Listed Vehicles</Typography>
                                <Grid container spacing={2}>
                                {vehicles.map((vehicle) => {
                                    return (
                                        <Grid item md={4}>
                                            <Paper sx={{pb: 2}} elevation={0} className={'vehicle-request-card'}>

                                                <Box display="flex" justifyContent="center">
                                                    <CardMedia component="img" height="230" image={vehicle.images[0]} sx={{borderTopRightRadius: '20px', borderTopLeftRadius: '20px'}} />
                                                </Box>

                                                <Typography variant={'h5'} fontWeight={'bold'} textAlign={'center'} sx={{pt: 1}}>{vehicle.year} {vehicle.make} {vehicle.model}</Typography>
                                                <Typography variant={'body1'} textAlign={'center'}>Sale Price: ${vehicle.price}</Typography>
                                                <Box display="flex" justifyContent="center">
                                                    <Chip color={'primary'} label={vehicle.status} sx={{mt: 2}} variant={'outlined'}/>
                                                </Box>

                                            </Paper>
                                        </Grid>
                                    );

                                })}
                                </Grid>
                            </>
                        )}
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
}

export default DealerDashboard
