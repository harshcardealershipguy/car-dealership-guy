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
            <Box sx={{py: 5, px: 3}}>
                {children}
            </Box>

            <Footer/>
        </div>
    )
}

export default GuestLayout
