import {useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import {Chip, Grid, Paper, Typography} from "@mui/material";
import AppLayout from "@/components/Layouts/AppLayout";
import axios from "@/lib/axios";
import moment from "moment/moment";
import toTitleCase from "@/lib/toTitleCase";
import AuthSessionStatus from "@/components/AuthSessionStatus";

const Vehicle = () => {

    const router = useRouter();

    const { externalId } = router.query

    const [vehicle, setVehicle] = useState(null);

    useEffect(() => {
        if(externalId) {
            axios
                .get('/api/vehicle/' + externalId)
                .then(res => res.data)
                .then(data => {
                    data['created_at'] = moment(data['created_at']).fromNow();
                    return setVehicle(data);
                })
        }
    }, [externalId]);

    function detailsLine (vehicleRequest, property) {
        return <><Typography color="text.secondary" style={{display: 'inline-block'}}>{toTitleCase(property)}</Typography> <Typography style={{display: 'inline-block'}}><Chip label={toTitleCase(vehicleRequest[property])}/></Typography><br/></>
    }

    return (
        <AppLayout>
            <Grid container alignItems={'center'} justifyContent="center" >
                <Grid item xs={12} md={10} lg={8}>

                    <AuthSessionStatus />

                    <Paper elevation={0} sx={{px: 4, pb: 4, pt: 1, mt: 2}}>

                    {/*    TODO*/}



                    </Paper>
                </Grid>
            </Grid>
        </AppLayout>
    )
}

export default Vehicle
