import {useAuth} from '@/hooks/auth'
import {Box} from "@mui/material";
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const AppLayout = ({ header, children }) => {
    // const { user } = useAuth({ middleware: 'auth' })

    return (
        <div>
            <Head>
                <title>CarDealershipGuy</title>
            </Head>

            {/*<Navigation user={user} />*/}
            <Header/>
            <Box sx={{pt: 5, pb: 18, px: 3}} className={'main-body'}>
                {children}
            </Box>

            <Footer/>
        </div>
    )
}

export default AppLayout
