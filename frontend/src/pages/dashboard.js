import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import axios from "@/lib/axios";
import {useEffect, useState} from "react";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";

const Dashboard = () => {

    const [vehicleRequests, setVehicleRequests] = useState([]);

    useEffect(() => {
        axios
            .get('/api/vehicle-requests')
            .then(res => res.data)
            .then(data => setVehicleRequests(data))
    }, []);

    useEffect(() => {
        console.log(vehicleRequests);
    }, [vehicleRequests])

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }>

            <Head>
                <title>Laravel - Dashboard</title>
            </Head>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">

                            <Typography variant={'h2'}>All Vehicle Requests</Typography>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            {vehicleRequests[0] && Object.keys(vehicleRequests[0]).map(value => <TableCell align="right">{value}</TableCell>)}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {vehicleRequests.map(vehicleRequest =>
                                            <TableRow
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                {Object.keys(vehicleRequest).map(value => <TableCell align="right">{vehicleRequest[value]}</TableCell>)}
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}

export default Dashboard
