import {useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import {Box, Button, Card, CardContent, Chip, Grid, Typography} from "@mui/material";
import AppLayout from "@/components/Layouts/AppLayout";
import axios from "@/lib/axios";
import moment from "moment/moment";
import toTitleCase from "@/lib/toTitleCase";

const VehicleRequest = () => {

    const router = useRouter();

    const { externalId } = router.query

    const [vehicleRequest, setVehicleRequest] = useState(null);

    useEffect(() => {
        if(externalId) {
            axios
                .get('/api/vehicle-request/' + externalId)
                .then(res => res.data)
                .then(data => {
                    data['created_at'] = moment(data['created_at']).fromNow();
                    return setVehicleRequest(data);
                })
        }
    }, [externalId]);

    function detailsLine (vehicleRequest, property) {
        return <><Typography color="text.secondary" style={{display: 'inline-block'}}>{toTitleCase(property)}</Typography> <Typography style={{display: 'inline-block'}}><Chip label={toTitleCase(vehicleRequest[property])}/></Typography><br/></>
    }

    return (
        <AppLayout>
            <Grid container justifyContent="center">
                <Grid item xs={8}>

                    {vehicleRequest && (
                        <>
                            <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                <Chip label={detailsLine(vehicleRequest, 'created_at')}/>
                            </Typography>

                            <Typography variant="h4">
                                {vehicleRequest['year_low']}-{vehicleRequest['year_high']} {vehicleRequest['make']} {vehicleRequest['model']}
                            </Typography>
                            <Box sx={{py: 2}}>
                                <Chip color="primary" variant={'outlined'} label={detailsLine(vehicleRequest, 'exact_vehicle_known')}/>
                                <Chip color="success" label={detailsLine(vehicleRequest, 'timeframe')}/>
                            </Box>

                            <Grid container spacing={2}>
                                <Grid item md={9}>

                                    <Grid container spacing={2}>
                                        <Grid item md={6}>
                                            <Card sx={{my: 2}} className={'vehicle-request-card'} style={{minHeight: '100%'}}>
                                                <CardContent>
                                                    <Typography variant={'h5'} fontWeight={'bold'}>Vehicle Details</Typography>
                                                    <hr/>
                                                    {detailsLine(vehicleRequest, 'new_or_used')}
                                                    {detailsLine(vehicleRequest, 'body_style')}
                                                    {detailsLine(vehicleRequest, 'size')}
                                                    {detailsLine(vehicleRequest, 'engine_type')}
                                                    {detailsLine(vehicleRequest, 'makes')}
                                                    {detailsLine(vehicleRequest, 'exclude_makes')}
                                                    {detailsLine(vehicleRequest, 'exterior_colors')}
                                                    {detailsLine(vehicleRequest, 'interior_colors')}
                                                    {detailsLine(vehicleRequest, 'important_features')}
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                        <Grid item md={6}>
                                            <Card sx={{my: 2}} className={'vehicle-request-card'} style={{minHeight: '100%'}}>
                                                <CardContent>
                                                    <Typography variant={'h5'} fontWeight={'bold'}>Timing & Financing</Typography>
                                                    <hr/>
                                                    {detailsLine(vehicleRequest, 'timeframe')}
                                                    {detailsLine(vehicleRequest, 'payment_method')}
                                                    {detailsLine(vehicleRequest, 'budget_or_monthly_payment')}
                                                    {detailsLine(vehicleRequest, 'credit_score')}
                                                    {detailsLine(vehicleRequest, 'money_down')}
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    </Grid>


                                    <Grid container spacing={2} sx={{my: 1}}>
                                        <Grid item md={6}>
                                            <Card sx={{my: 2}} className={'vehicle-request-card'} style={{minHeight: '100%'}}>
                                                <CardContent>
                                                    <Typography variant={'h5'} fontWeight={'bold'}>Trade-In Details</Typography>
                                                    <hr/>
                                                    {detailsLine(vehicleRequest, 'trade_in_year')}
                                                    {detailsLine(vehicleRequest, 'trade_in_make')}
                                                    {detailsLine(vehicleRequest, 'trade_in_model')}
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                        <Grid item md={6}>
                                            <Card sx={{my: 2}} className={'vehicle-request-card'} style={{minHeight: '100%'}}>
                                                <CardContent>
                                                    <Typography variant={'h5'} fontWeight={'bold'}>Personal Information</Typography>
                                                    <hr/>
                                                    {detailsLine(vehicleRequest, 'city')}
                                                    {detailsLine(vehicleRequest, 'state')}
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    </Grid>

                                </Grid>
                                <Grid item md={3}>
                                    <Card sx={{px: 2, py: 2, mt: 2}} className={'vehicle-request-card'}>
                                        <Typography variant={'h5'} fontWeight={'bold'}>Ready to Sell?</Typography>
                                        <Typography>Have a vehicle that matches this user's preferences? Message them now!</Typography>

                                        <Button href={'/vehicle-request/message/' + vehicleRequest.external_id} variant="contained" sx={{mt: 3}} fullWidth size={'large'}>Message</Button>
                                    </Card>
                                </Grid>
                            </Grid>

                        </>
                    )
                    }

                </Grid>
            </Grid>
        </AppLayout>
    )
}

export default VehicleRequest
