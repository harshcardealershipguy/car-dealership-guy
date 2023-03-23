import AuthCard from '@/components/AuthCard'
import AuthSessionStatus from '@/components/AuthSessionStatus'
import GuestLayout from '@/components/Layouts/GuestLayout'
import { useAuth } from '@/hooks/auth'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {Page1} from "@/components/CreateVehicleRequest/Page1";
import {Page2Yes} from "@/components/CreateVehicleRequest/Page2-yes";
import {Page2No} from "@/components/CreateVehicleRequest/Page2-no";
import {Page3} from "@/components/CreateVehicleRequest/Page3";
import {Page4} from "@/components/CreateVehicleRequest/Page4";
import {ThankYouPage} from "@/components/CreateVehicleRequest/ThankYouPage";
import {Box, Grid, LinearProgress} from "@mui/material";
import {Page5} from "@/components/CreateVehicleRequest/Page5";

const CreateVehicleRequest = () => {

    const [page, setPage] = useState('Page1');
    const [progressBarValue, setProgressBarValue] = useState(0);

    useEffect(() => {
      //TODO: if there is an external_id in the query param, attempt to load the data
    })

    function renderForm() {
        switch(page) {
            case 'Page1':
                return (
                    <Page1 goToPage={goToPage}/>
                );
            case 'Page2-yes':
                return (
                    <Page2Yes goToPage={goToPage}/>
                );
            case 'Page2-no':
                return (
                    <Page2No goToPage={goToPage}/>
                );
            case 'Page3':
                return (
                    <Page3 goToPage={goToPage}/>
                );
            case 'Page4':
                return (
                    <Page4 goToPage={goToPage}/>
                )
            case 'Page5':
                return (
                    <Page5 goToPage={goToPage}/>
                )
            case 'ThankYouPage':
                return (
                    <ThankYouPage/>
                )
            default:
                return <div>no page</div>
        }
    }

    function goToPage(pageName, progressBar) {
        //TODO: send form state up to server
        setProgressBarValue(progressBar);
        setPage(pageName);
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
