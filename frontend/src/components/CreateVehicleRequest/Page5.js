import { useForm } from "react-hook-form";


import {Field} from "@/components/CreateVehicleRequest/Field";
import {useEffect, useState} from "react";
import Label from "@/components/Label";
import Input from "@/components/Input";
import InputError from "@/components/InputError";
import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {states} from "@/data/states";

export const Page5 = ({goToPage}) => {

    const [state, setState] = useState({});
    const {
        handleSubmit,
        register,
        watch,
        formState: { errors },
    } = useForm({ defaultValues: state, mode: "onSubmit" });

    const saveData = (data) => {
        setState({ ...state, ...data });

        goToPage('ThankYouPage');
    };

    useEffect(() => {
        console.log(state);
        //TODO: save to DB
        //TODO: go to the next page

    }, [state])

    return (
        <form onSubmit={handleSubmit(saveData)}>

            Page 5



            <TextField {...register("city", {required: true})} variant="outlined" label="City" error={errors?.city} fullWidth/>

            <FormControl fullWidth sx={{mt: 3}} error={errors?.state}>
                <InputLabel>State</InputLabel>
                <Select defaultValue={"any"} {...register("state", {required: true})}
                        id={"state"}>
                    <MenuItem value="any" defaultValue>Any</MenuItem>
                    {Object.keys(states).map(function (stateId) {
                        return <MenuItem value={stateId} key={stateId}>{states[stateId]}</MenuItem>
                    })}
                </Select>
            </FormControl>


            <TextField {...register("name", {required: true})} variant="outlined" label="Name" error={errors?.name} fullWidth sx={{mt: 3}}/>
            <TextField {...register("email", {required: true})} variant="outlined" label="Email" error={errors?.email} fullWidth sx={{mt: 3}}/>
            <TextField {...register("password", {required: true})} variant="outlined" label="Password" error={errors?.password} fullWidth sx={{mt: 3}}/>
            <TextField {...register("password_confirmation", {required: true})} variant="outlined" label="Password Confirmation" error={errors?.password_confirmation} fullWidth sx={{mt: 3}}/>

            <Button type="submit" variant="outlined" sx={{mt: 1}} fullWidth>Next</Button>

        </form>
    );
};
