import axios from "@/lib/axios";
import {useEffect, useState} from "react";
import {
    Box,
    Button,
    CircularProgress,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import Link from "next/link";
import AuthSessionStatus from "@/components/AuthSessionStatus";
import {useAuth} from "@/hooks/auth";
import toTitleCase from "@/lib/toTitleCase";

const CustomerDashboard = () => {

    const { user } = useAuth({ middleware: 'auth' })

    const [vehicleRequests, setVehicleRequests] = useState([]);
    const [conversations, setConversations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            axios
                .get('/api/my-vehicle-requests')
                .then(res => res.data)
                .then(data => setVehicleRequests(data)),
            axios
                .get('/api/conversations')
                .then(res => res.data)
                .then(data => setConversations(data))
            ]
        ).then(() => {
            setIsLoading(false);
        });
    }, []);

    return (
        <>
            <Grid container alignItems={'center'} justifyContent="center" >
                <Grid item xs={12} md={10} lg={8}>

                    <AuthSessionStatus status={status} />

                    <Paper elevation={0} sx={{px: 4, pb: 4, pt: 1, mt: 2}}>


                        <Typography variant={'h4'} fontWeight={'bold'} sx={{mt: 3}}>Hi {user.name}!</Typography>
                        <Typography variant={'body1'} color={'gray'}>Dashboard</Typography>

                        {isLoading && (
                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                <CircularProgress />
                            </div>
                        )}

                        {!isLoading && (
                            <>
                            {conversations.length > 0 && (
                                <>
                                    <Typography variant={'h6'} fontWeight={'bold'} sx={{mt: 3}}>Your Conversations</Typography>
                                    <TableContainer>
                                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align="center">Name</TableCell>
                                                    <TableCell align="center">Last Message</TableCell>
                                                    <TableCell align="center">Sent At</TableCell>
                                                    <TableCell align="center"></TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>

                                                {conversations.map((conversation) => {
                                                    return (
                                                        <TableRow
                                                            key={conversation.other_user_external_id}
                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                        >
                                                            <TableCell align="center">{conversation.name}</TableCell>
                                                            <TableCell align="center">{conversation.content}</TableCell>
                                                            <TableCell align="center">Date</TableCell>
                                                            <TableCell align="center"><Link href={'/message/' + conversation.other_user_external_id}><Button variant={'contained'}>View Messages</Button></Link></TableCell>
                                                        </TableRow>
                                                    );
                                                })}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </>
                                )}

                            {vehicleRequests.length > 0 && (<Typography variant={'h6'} fontWeight={'bold'} sx={{mt: 3}}>Your Vehicle Requests</Typography>)}

                            <Grid container spacing={2}>
                                {vehicleRequests.map((vehicleRequest) => {
                                    return (
                                        <Grid item md={4}>
                                            <Paper sx={{p: 4}} elevation={0} className={'vehicle-request-card'}>

                                                <img src={'/hidden-vehicle.png'} style={{width: '100%', height: 'auto', display: 'block'}}/>

                                                <Typography variant={'h5'} textAlign={'center'}>
                                                    {vehicleRequest.year_high ?? vehicleRequest.year_low ?? toTitleCase(vehicleRequest.new_or_used) } {' '}
                                                    {vehicleRequest.make ?? toTitleCase(vehicleRequest.budget_or_monthly_payment) ?? toTitleCase(vehicleRequest.size)} {' '}
                                                    {vehicleRequest.model ?? toTitleCase(vehicleRequest.body_style)}</Typography>
                                                <Typography variant={'body1'} color={'gray'} textAlign={'center'}>
                                                    {new Date(vehicleRequest.created_at).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})}
                                                </Typography>
                                            </Paper>
                                        </Grid>
                                    );
                                })}
                            </Grid>

                            {vehicleRequests.length === 0 &&
                                (
                                <Paper sx={{py: 3, px: 3, mt: 2}} elevation={0} >
                                    <Grid container alignItems={'center'} justifyContent={'center'}>
                                        <Grid sm={3}>
                                            <img src={'/hidden-vehicle.png'} style={{width: '100%', height: 'auto', display: 'block'}}/>
                                        </Grid>
                                        <Grid item sm={10}>
                                            <Typography variant={'h4'} textAlign={'center'} fontWeight={'bold'}>Submit a vehicle request</Typography>
                                            <Typography variant={'body1'} textAlign={'center'}>Tell us what you're looking for and we'll find you a great deal!</Typography>
                                            <Box textAlign={'center'}>
                                                <Link href={'/create-vehicle-request/initial'}><Button variant={'contained'} size={'large'} sx={{mt: 2}} >Create Vehicle Request</Button></Link>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Paper>
                                )}

                            <Paper style={{backgroundColor: '#131c44'}} sx={{py: 3, px: 3, mt: 6}} elevation={0}>
                                <Grid container alignItems={'center'}>
                                    <Grid item sm={8}>
                                        <Typography variant={'h4'} color={'white'} textAlign={'center'}>Start browsing inventory now!</Typography>
                                        <Typography variant={'body1'} color={'white'} textAlign={'center'}>Save big money with vehicles on Dealership Guy.</Typography>
                                        <Box textAlign={'center'}>
                                            <Link href={'/'}><Button variant={'contained'} size={'large'} sx={{mt: 2}} >View Inventory</Button></Link>
                                        </Box>
                                    </Grid>
                                    <Grid item sm={4}>
                                        <img src={'/lexus.png'} style={{width: '100%', height: 'auto', display: 'block'}}/>
                                    </Grid>
                                </Grid>


                            </Paper>
                        </>
                        )}

                    </Paper>
                </Grid>
            </Grid>
        </>
    )
}

export default CustomerDashboard
