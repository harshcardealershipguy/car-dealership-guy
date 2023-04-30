import {useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import {Button, Card, CardContent, Chip, CircularProgress, Grid, Paper, Typography} from "@mui/material";
import AppLayout from "@/components/Layouts/AppLayout";
import axios from "@/lib/axios";
import moment from "moment/moment";
import toTitleCase from "@/lib/toTitleCase";
import vehicleRequestNameFormatter from "@/lib/vehicleRequestNameFormatter";
import Link from "next/link";

const VehicleRequest = () => {

    const router = useRouter();

    const { externalId } = router.query

    const [vehicleRequest, setVehicleRequest] = useState(null);
    const [isVehicleRequestsLoading, setIsVehicleRequestsLoading] = useState(true);

    useEffect(() => {
        if(externalId) {
            axios
                .get('/api/vehicle-request/' + externalId)
                .then(res => res.data)
                .then(data => {
                    data['created_at'] = moment(data['created_at']).fromNow();
                    setVehicleRequest(data);
                    setIsVehicleRequestsLoading(false);
                })
        }
    }, [externalId]);

    function detailsLine (vehicleRequest, property) {
        return <><Typography color="text.secondary" style={{display: 'inline-block'}}>{toTitleCase(property)}</Typography> <Typography style={{display: 'inline-block'}}>{toTitleCase(vehicleRequest[property]) ?? '--'}</Typography> <br/></>
    }

    return (
        <AppLayout>

            <Grid container justifyContent="center" spacing={2}>
                <Grid item xs={8}>
                    <Link href={'/dashboard'}><Typography variant={'body1'}>← Back to Dashboard</Typography></Link>
                </Grid>
            </Grid>

            <Grid container alignItems={'center'} justifyContent="center" >
                <Grid item xs={12} md={10} lg={8}>
                    <Paper elevation={0} sx={{px: 4, pb: 4, pt: 1, mt: 2}}>

                        {isVehicleRequestsLoading && (
                            <div style={{display: 'flex', justifyContent: 'center', paddingTop: '30px', paddingBottom: '30px'}}>
                                <CircularProgress />
                            </div>
                        )}

                        {vehicleRequest && (
                            <>
                                <Typography variant={'h4'} fontWeight={'bold'} sx={{mt: 3}}>{vehicleRequestNameFormatter(vehicleRequest)}</Typography>

                                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                    <Chip label={detailsLine(vehicleRequest, 'created_at')}/>
                                    <Chip color="success" label={detailsLine(vehicleRequest, 'timeframe')} sx={{ml: 1}}/>
                                </Typography>

                                <Grid container spacing={2}>
                                    <Grid item md={9}>

                                        <Grid container spacing={2}>
                                            <Grid item md={6}>
                                                <Card sx={{my: 2}} className={'vehicle-request-card'} style={{minHeight: '100%'}}>
                                                    <CardContent>
                                                        <Typography variant={'h5'} fontWeight={'bold'} sx={{mb: 1}}>Vehicle Details</Typography>

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
                                                        <Typography variant={'h5'} fontWeight={'bold'} sx={{mb: 1}}>Timing & Financing</Typography>

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
                                                        <Typography variant={'h5'} fontWeight={'bold'} sx={{mb: 1}}>Trade-In Details</Typography>

                                                        {detailsLine(vehicleRequest, 'trade_in_year')}
                                                        {detailsLine(vehicleRequest, 'trade_in_make')}
                                                        {detailsLine(vehicleRequest, 'trade_in_model')}
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                            <Grid item md={6}>
                                                <Card sx={{my: 2}} className={'vehicle-request-card'} style={{minHeight: '100%'}}>
                                                    <CardContent>
                                                        <Typography variant={'h5'} fontWeight={'bold'} sx={{mb: 1}}>Personal Information</Typography>

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

                                            <Button href={'/message/' + vehicleRequest.user_external_id} variant="contained" sx={{mt: 3}} fullWidth size={'large'}>Send Message</Button>
                                        </Card>
                                    </Grid>
                                </Grid>

                            </>
                        )
                        }

                    </Paper>
                </Grid>
            </Grid>

        </AppLayout>
    )
}

export default VehicleRequest
