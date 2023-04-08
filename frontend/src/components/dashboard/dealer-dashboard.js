import axios from "@/lib/axios";
import {useEffect, useState} from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Grid,
    Typography
} from "@mui/material";
import {ExpandMore} from "@mui/icons-material";
import moment from "moment";
import toTitleCase from "@/lib/toTitleCase";

const DealerDashboard = ({user}) => {

    const [vehicleRequests, setVehicleRequests] = useState([]);

    useEffect(() => {
        axios
            .get('/api/vehicle-requests')
            .then(res => res.data)
            .then(data => {
                data.forEach(dataItem => {
                    dataItem['created_at'] = moment(dataItem['created_at']).fromNow();
                })

                return setVehicleRequests(data);
            })
    }, []);

    function detailsLine (vehicleRequest, property) {
        return <><Typography color="text.secondary" style={{display: 'inline-block'}}>{toTitleCase(property)}</Typography> <Typography style={{display: 'inline-block'}}>{toTitleCase(vehicleRequest[property])}</Typography><br/></>
    }

    return (
        <>
            <Typography variant={'h4'} fontWeight={'bold'} sx={{mt: 3}}>Dealer Dashboard</Typography>


            <Typography variant={'h5'} fontWeight={'bold'} sx={{mt: 3}}>Urgent</Typography>
            <Grid container spacing={4}>
                {vehicleRequests.map(vehicleRequest =>

                    <Grid item md={4} >
                        <Card sx={{ minWidth: 275 }} class={'vehicle-request-card'}>
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>


                                    <Chip label={detailsLine(vehicleRequest, 'created_at')} />

                                </Typography>

                                <Typography variant="h5" component="div">
                                    {vehicleRequest['year_low']}-{vehicleRequest['year_high']} {vehicleRequest['make']} {vehicleRequest['model']}
                                </Typography>
                                <Box sx={{py: 2}}>
                                    <Chip color="primary" label={detailsLine(vehicleRequest, 'exact_vehicle_known')} />
                                    <Chip color="success" label={detailsLine(vehicleRequest, 'timeframe')} />
                                </Box>


                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMore />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography>Vehicle Details</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        {detailsLine(vehicleRequest, 'new_or_used')}
                                        {detailsLine(vehicleRequest, 'body_style')}
                                        {detailsLine(vehicleRequest, 'size')}
                                        {detailsLine(vehicleRequest, 'engine_type')}

                                        {detailsLine(vehicleRequest, 'makes')}
                                        {detailsLine(vehicleRequest, 'exclude_makes')}
                                        {detailsLine(vehicleRequest, 'exterior_colors')}
                                        {detailsLine(vehicleRequest, 'interior_colors')}
                                        {detailsLine(vehicleRequest, 'important_features')}
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMore />}
                                        aria-controls="panel2a-content"
                                        id="panel2a-header"
                                    >
                                        <Typography>Timing & Financing</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        {detailsLine(vehicleRequest, 'timeframe')}
                                        {detailsLine(vehicleRequest, 'payment_method')}
                                        {detailsLine(vehicleRequest, 'budget_or_monthly_payment')}
                                        {detailsLine(vehicleRequest, 'credit_score')}
                                        {detailsLine(vehicleRequest, 'money_down')}
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMore />}
                                        aria-controls="panel3a-content"
                                        id="panel3a-header"
                                    >
                                        <Typography>Trade-In Details</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        {detailsLine(vehicleRequest, 'trade_in_year')}
                                        {detailsLine(vehicleRequest, 'trade_in_make')}
                                        {detailsLine(vehicleRequest, 'trade_in_model')}
                                    </AccordionDetails>
                                </Accordion>

                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMore />}
                                        aria-controls="panel4a-content"
                                        id="panel4a-header"
                                    >
                                        <Typography>Personal Information</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        {detailsLine(vehicleRequest, 'city')}
                                        {detailsLine(vehicleRequest, 'state')}
                                    </AccordionDetails>
                                </Accordion>

                                <Button href={'/vehicle-request/' + vehicleRequest.external_id} variant="outlined" sx={{mt: 3}} fullWidth size={'large'}>View</Button>


                            </CardContent>

                        </Card>
                    </Grid>







                )}

            </Grid>

        </>
    )
}

export default DealerDashboard
