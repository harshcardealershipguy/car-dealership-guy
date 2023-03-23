import { useForm } from "react-hook-form";


import {Field} from "@/components/CreateVehicleRequest/Field";
import {useEffect, useState} from "react";
import Label from "@/components/Label";
import Input from "@/components/Input";
import InputError from "@/components/InputError";
import {Box, Typography} from "@mui/material";

export const ThankYouPage = ({goToPage}) => {

    const [state, setState] = useState({});
    const {
        handleSubmit,
        register,
        watch,
        formState: { errors },
    } = useForm({ defaultValues: state, mode: "onSubmit" });

    const saveData = (data) => {
        setState({ ...state, ...data });

        goToPage('Page4');
    };

    useEffect(() => {
        console.log(state);
        //TODO: save to DB
        //TODO: go to the next page
    }, [state])

    return (
        <>
            <Box display="flex"
                 justifyContent="center"
                 alignItems="center">
                <Typography fontWeight={'bold'} variant={'h2'} sx={{my: 2}}>Thank you!</Typography>
            </Box>
            <Box display="flex"
                 justifyContent="center"
                 alignItems="center">
                <Typography textAlign={'center'} variant={'p'}>One of our trusted partners will be in touch shortly.</Typography>
            </Box>
        </>
    );
};
