import AuthSessionStatus from '@/components/AuthSessionStatus'
import GuestLayout from '@/components/Layouts/GuestLayout'
import {useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import {Page1} from "@/components/CreateVehicleRequest/Page1";
import {Page2Yes} from "@/components/CreateVehicleRequest/Page2-yes";
import {Page2No} from "@/components/CreateVehicleRequest/Page2-no";
import {Page3} from "@/components/CreateVehicleRequest/Page3";
import {Page4} from "@/components/CreateVehicleRequest/Page4";
import {ThankYouPage} from "@/components/CreateVehicleRequest/ThankYouPage";
import {Box, Grid, LinearProgress} from "@mui/material";
import {Page5} from "@/components/CreateVehicleRequest/Page5";

const CreateVehicleRequest = () => {

    const router = useRouter();
    const { page } = router.query;

    const [progressBarValue, setProgressBarValue] = useState(0);

    const pagesToProgress = {
        'initial': 0,
        'known-vehicle': 20,
        'unknown-vehicle': 20,
        'timing': 40,
        'trade-in': 60,
        'personal-info': 80,
        'thank-you': 100
    }

    useEffect(() => {
      //TODO: if there is an external_id in the query param, attempt to load the data

        setProgressBarValue(pagesToProgress[page]);
        console.log("page changed: " + page);
    }, [page])

    function renderForm() {
        switch(page) {
            case 'initial':
                return <Page1 goToPage={goToPage}/>;
            case 'known-vehicle':
                return <Page2Yes goToPage={goToPage}/>;
            case 'unknown-vehicle':
                return <Page2No goToPage={goToPage}/>;
            case 'timing':
                return <Page3 goToPage={goToPage}/>;
            case 'trade-in':
                return <Page4 goToPage={goToPage}/>;
            case 'personal-info':
                return <Page5 goToPage={goToPage}/>;
            case 'thank-you':
                return <ThankYouPage/>;
            default:
                return <div>No page</div>
        }
    }

    function goToPage(pageName, progressBar) {
        //TODO: send form state up to server

        router.push('/create-vehicle-request/'+pageName);
    }

    return (
        <GuestLayout>
            <Grid container justifyContent="center" sx={{mt: 5}}>
                <Grid item xs={5}>

                    {/* Session Status */}
                    <AuthSessionStatus className="mb-4" />

                    <Box sx={{ width: '100%' }}>
                        <LinearProgress variant="determinate" value={progressBarValue} />
                    </Box>
                    {renderForm()}

                </Grid>
            </Grid>
        </GuestLayout>
    )
}

export default CreateVehicleRequest
