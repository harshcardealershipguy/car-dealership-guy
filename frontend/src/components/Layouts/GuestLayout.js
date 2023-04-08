import Head from 'next/head'
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {Box} from "@mui/material";


const GuestLayout = ({ children }) => {
    return (
        <div>
            <Head>
                <title>CarDealershipGuy</title>
            </Head>

            <Header/>
            <Box sx={{pt: 5, pb: 18, px: 3}} className={'main-body'}>
                {children}
            </Box>

            <Footer/>
        </div>
    )
}

export default GuestLayout
