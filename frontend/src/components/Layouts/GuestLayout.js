import Head from 'next/head'
import {AppBar, Box, Button, Container, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import Header from "@/components/Header";
import Footer from "@/components/Footer";


const GuestLayout = ({ children }) => {
    return (
        <div>
            <Head>
                <title>Laravel</title>
            </Head>

            <Header/>
            <div>
                {children}
            </div>

            <Footer/>
        </div>
    )
}

export default GuestLayout
