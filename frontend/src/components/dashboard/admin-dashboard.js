import axios from "@/lib/axios";
import {useEffect, useState} from "react";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";

const AdminDashboard = ({user}) => {

    const [vehicleRequests, setVehicleRequests] = useState([]);

    useEffect(() => {
        axios
            .get('/api/vehicle-requests')
            .then(res => res.data)
            .then(data => setVehicleRequests(data))
    }, []);

    return (
        <>
            <Typography variant={'h4'} fontWeight={'bold'} sx={{mt: 3}}>Admin Dashboard</Typography>

        </>
    )
}

export default AdminDashboard
