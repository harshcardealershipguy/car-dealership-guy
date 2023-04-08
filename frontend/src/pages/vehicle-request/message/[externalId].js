import {useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import {Avatar, Box, Button, Chip, Grid, Paper, TextField, Typography} from "@mui/material";
import AppLayout from "@/components/Layouts/AppLayout";
import axios from "@/lib/axios";

const VehicleRequestMessage = () => {

    const router = useRouter();

    const { externalId } = router.query

    const [vehicleRequest, setVehicleRequest] = useState(null);

    useEffect(() => {
        if(externalId) {
            axios
                .get('/api/vehicle-request/' + externalId)
                .then(res => res.data)
                .then(data => setVehicleRequest(data))
        }
    }, [externalId]);



    return (
        <AppLayout>
            <Grid container justifyContent="center">
                <Grid item xs={5}>

                    {vehicleRequest && (
                        <>
                            <Typography variant="h4">
                                {vehicleRequest['year_low']}-{vehicleRequest['year_high']} {vehicleRequest['make']} {vehicleRequest['model']}
                            </Typography>

                            <Paper sx={{px: 2, py: 2, my: 2}}>



                                <Grid container spacing={1}>
                                    <Grid item>
                                        <Avatar>H</Avatar>
                                    </Grid>
                                    <Grid item>
                                        <Typography sx={{mb: 2}}><Chip sx={{py: 3, px: 1}} size={'medium'} style={{fontSize: '16px'}} label="Hi there! I'd be happy to help you find your next vehicle!" variant="filled" /></Typography>
                                        <Typography sx={{my: 2}}><Chip sx={{py: 3, px: 1}} size={'medium'} style={{fontSize: '16px'}} label="Here are some vehicles that match your request" variant="filled" /></Typography>
                                    </Grid>
                                </Grid>


                                <Grid container spacing={1} sx={{mb: 3}}>
                                    <Grid item md={4}>
                                        <Box sx={{px: 1, py: 1}} style={{borderStyle: 'solid', borderWidth: '1px', borderColor: '#eee', borderRadius: '5px'}}>
                                            <Box
                                                component="img"
                                                maxWidth={'100%'}
                                                alt="The house from the offer."
                                                src='/vehicle-images/vehicle-1.png'
                                                style={{borderRadius: '5px'}}
                                            />
                                            <Typography fontWeight={'bold'}>2020 Mazda 3</Typography>
                                            <Typography variant="body2">
                                                $20,499 - 54K miles
                                            </Typography>
                                            <Button sx={{ml: 0, pl: 0}} size="small">See Details</Button>
                                        </Box>
                                    </Grid>
                                    <Grid item md={4}>
                                        <Box sx={{px: 1, py: 1}} style={{borderStyle: 'solid', borderWidth: '1px', borderColor: '#eee', borderRadius: '5px'}}>
                                            <Box
                                                component="img"
                                                maxWidth={'100%'}
                                                alt="The house from the offer."
                                                src='/vehicle-images/vehicle-2.png'
                                                style={{borderRadius: '5px'}}
                                            />
                                            <Typography fontWeight={'bold'}>2021 Mazda CX</Typography>
                                            <Typography variant="body2">
                                                $26,499 - 34K miles
                                            </Typography>
                                            <Button sx={{ml: 0, pl: 0}} size="small">See Details</Button>
                                        </Box>
                                    </Grid>
                                    <Grid item md={4}>
                                        <Box sx={{px: 1, py: 1}} style={{borderStyle: 'solid', borderWidth: '1px', borderColor: '#eee', borderRadius: '5px'}}>
                                            <Box
                                                component="img"
                                                maxWidth={'100%'}
                                                alt="The house from the offer."
                                                src='/vehicle-images/vehicle-3.png'
                                                style={{borderRadius: '5px'}}
                                            />
                                            <Typography fontWeight={'bold'}>2023 Mazda 3</Typography>
                                            <Typography variant="body2">
                                                $19,499 - 75K miles
                                            </Typography>
                                            <Button sx={{ml: 0, pl: 0}} size="small">See Details</Button>
                                        </Box>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={1} justifyContent={'flex-end'}>
                                    <Grid item>
                                        <Typography sx={{mb: 2}} textAlign={'right'}><Chip sx={{py: 3, px: 1}} style={{fontSize: '16px'}} label="Do you have any that are white?" color="success" variant="filled" /></Typography>
                                        <Typography sx={{mb: 2}} textAlign={'right'}><Chip sx={{py: 3, px: 1}} style={{fontSize: '16px'}} label="Also I'm willing to pay more for a higher spec" color="success" variant="filled" /></Typography>
                                    </Grid>
                                    <Grid item>
                                        <Avatar>Y</Avatar>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={1}>
                                    <Grid item>
                                        <Avatar>H</Avatar>
                                    </Grid>
                                    <Grid item>
                                        <Typography sx={{mb: 2}}><Chip sx={{py: 3, px: 1}} style={{fontSize: '16px'}} label="I don't have any that are white but here are some in a light gray color" variant="filled" /></Typography>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={1} sx={{mb: 3}}>
                                    <Grid item md={4}>
                                        <Box sx={{px: 1, py: 1}} style={{borderStyle: 'solid', borderWidth: '1px', borderColor: '#eee', borderRadius: '5px'}}>
                                            <Box
                                                component="img"
                                                maxWidth={'100%'}
                                                alt="The house from the offer."
                                                src='/vehicle-images/vehicle-4.png'
                                                style={{borderRadius: '5px'}}
                                            />
                                            <Typography fontWeight={'bold'}>2019 Mazda CX</Typography>
                                            <Typography variant="body2">
                                                $27,499 - 20K miles
                                            </Typography>
                                            <Button sx={{ml: 0, pl: 0}} size="small">See Details</Button>
                                        </Box>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={1} justifyContent={'flex-end'}>
                                    <Grid item>
                                        <Typography sx={{mb: 2}} textAlign={'right'}><Chip sx={{py: 3, px: 1}} style={{fontSize: '16px'}} label="Great thank you!" color="success" variant="filled" /></Typography>
                                    </Grid>
                                    <Grid item>
                                        <Avatar>Y</Avatar>
                                    </Grid>
                                </Grid>



                                <Typography variant={'subtitle2'} color="text.secondary" textAlign={'center'}>User has shared their personal information with you!</Typography>


                                <Grid container spacing={1}>
                                    <Grid item>
                                        <Avatar>H</Avatar>
                                    </Grid>
                                    <Grid item md={10}>
                                        <Typography sx={{mb: 2}}><Chip sx={{
                                            py: 2, px: 1,
                                            height: 'auto',
                                            '& .MuiChip-label': {
                                                display: 'block',
                                                whiteSpace: 'normal',
                                            },}} size={'medium'} style={{fontSize: '16px'}} label="Thanks for sharing your information with me! I can give you a call in just a few minutes to discuss." variant="filled" /></Typography>
                                    </Grid>
                                </Grid>


                                <Grid container spacing={1} justifyContent={'flex-end'}>
                                    <Grid item>
                                        <Typography textAlign={'right'}><Chip sx={{py: 3, px: 1}} style={{fontSize: '16px'}} label="Okay that's fine you can call me" color="success" variant="filled" /></Typography>
                                    </Grid>
                                    <Grid item>
                                        <Avatar>Y</Avatar>
                                    </Grid>
                                </Grid>


                            </Paper>

                            <TextField
                                fullWidth
                                placeholder="Type your message here"
                                multiline
                                rows={5}
                            />

                            <Button type="submit" variant="contained" sx={{mt: 3}} fullWidth size={'large'} >Send</Button>

                        </>
                    )
                    }

                </Grid>
            </Grid>
        </AppLayout>
    )
}

export default VehicleRequestMessage
