import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import DealerDashboard from "@/components/dashboard/dealer-dashboard";
import CustomerDashboard from "@/components/dashboard/customer-dashboard";
import AdminDashboard from "@/components/dashboard/admin-dashboard";
import {useAuth} from "@/hooks/auth";

const Dashboard = () => {

    const { user } = useAuth({ middleware: 'auth' })

    function renderForm(role) {
        switch(role) {
            case 'customer':
                return <CustomerDashboard/>;
            case 'dealer':
                return <DealerDashboard/>;
            case 'admin':
                return <AdminDashboard/>;
            default:
                return <></>
        }
    }

    return (
        <AppLayout header={'Dashboard'}>
            <Head>
                <title>Laravel - Dashboard</title>
            </Head>

            {renderForm(user?.role)}
        </AppLayout>
    )
}

export default Dashboard
