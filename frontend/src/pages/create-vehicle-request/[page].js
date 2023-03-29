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

    const [progressBarValue, setProgressBarValue] = useState(0);
    const [externalId, setExternalId] = useState(null);
    const [page, setPage] = useState(router.query.page);

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
        if(page !== undefined) {
            setProgressBarValue(pagesToProgress[page]);
        }
    }, [page])

    //when URL changes, update the state
    useEffect(() => {
        setPage(router.query.page)
    }, [router.query.page]);

    //when URL changes, update the state
    useEffect(() => {
        setExternalId(router.query.externalId)
    }, [router.query.externalId]);

    function renderForm() {
        switch(page) {
            case 'initial':
                return <Page1 goToPage={goToPage}/>;
            case 'known-vehicle':
                return <Page2Yes goToPage={goToPage} externalId={externalId}/>;
            case 'unknown-vehicle':
                return <Page2No goToPage={goToPage} externalId={externalId}/>;
            case 'timing':
                return <Page3 goToPage={goToPage} externalId={externalId}/>;
            case 'trade-in':
                return <Page4 goToPage={goToPage} externalId={externalId}/>;
            case 'personal-info':
                return <Page5 goToPage={goToPage} externalId={externalId}/>;
            case 'thank-you':
                return <ThankYouPage/>;
            default:
                return <></>
        }
    }

    function goToPage(newPageName, newExternalId) {
        //there is a new page and we also have a new external id
        if (newExternalId !== undefined && newPageName !== undefined) {
            router.push('/create-vehicle-request/' + newPageName + "?externalId=" + newExternalId);
        }
        //there is a new page and we have an existing external id
        else if(externalId !== undefined && newPageName !== undefined) {
            router.push('/create-vehicle-request/' + newPageName + "?externalId=" + externalId);
        }
        //there is a new page and we don't have an existing external id
        else if (newPageName !== undefined) {
            router.push('/create-vehicle-request/' + newPageName);
        }
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
