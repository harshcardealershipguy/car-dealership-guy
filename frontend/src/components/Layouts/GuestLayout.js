import Head from 'next/head'
import Header from "@/components/Header";
import Footer from "@/components/Footer";


const GuestLayout = ({ children }) => {
    return (
        <div>
            <Head>
                <title>CarDealershipGuy</title>
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
