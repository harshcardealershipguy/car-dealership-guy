import axios from "@/lib/axios";
import {useEffect, useState} from "react";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";

const DealerDashboard = ({user}) => {

    const [vehicleRequests, setVehicleRequests] = useState([]);

    useEffect(() => {
        axios
            .get('/api/vehicle-requests')
            .then(res => res.data)
            .then(data => setVehicleRequests(data))
    }, []);

    return (
        <>
            <Typography variant={'h2'}>Dealer Dashboard</Typography>
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
        </>
    )
}

export default DealerDashboard
