import {useForm} from "react-hook-form";
import {useState} from "react";
import {Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography} from "@mui/material";
import {states} from "@/data/states";
import axios from "@/lib/axios";
import {LoadingButton} from "@mui/lab";

export const Page5 = ({goToPage, externalId}) => {

    const {
        reset,
        handleSubmit,
        register,
        watch,
        formState: { errors },
    } = useForm({ mode: "onSubmit" });

    const [isLoading, setIsLoading] = useState(false);

    const saveData = async (data) => {
        setIsLoading(true);

        data.external_id = externalId;
        const response = axios
            .post('/api/request/personal-info', data)
            .then(res => res.data)
            .catch((error) => {setIsLoading(false); throw error});
        await response;

        setIsLoading(false);

        goToPage('thank-you');

        reset(); // reset form after successful submission
    };


    return (
        <>
            <Typography fontWeight={'bold'} variant={'h3'} sx={{mt: 3}}>Personal Information</Typography>
            <Typography sx={{mb: 3}}>One final step so that we know where you're located and how to get in-touch.</Typography>

            <form onSubmit={handleSubmit(saveData)}>
                <TextField {...register("city", {required: true})} variant="outlined" label="City" error={errors?.city} fullWidth/>

                <FormControl fullWidth sx={{mt: 3}} error={errors?.state}>
                    <InputLabel>State</InputLabel>
                    <Select defaultValue={"any"} {...register("state", {required: true})}
                            id={"state"}>
                        {Object.keys(states).map(function (stateId) {
                            return <MenuItem value={stateId} key={stateId}>{states[stateId]}</MenuItem>
                        })}
                    </Select>
                </FormControl>

                <TextField {...register("email", {required: true})} variant="outlined" label="Email" error={errors?.email} fullWidth sx={{mt: 3}}/>
                <TextField {...register("name", {required: true})} variant="outlined" label="Name" error={errors?.name} fullWidth sx={{mt: 3}}/>
                <TextField {...register("password", {required: true})} type={'password'} variant="outlined" label="Password" error={errors?.password} fullWidth sx={{mt: 3}}/>
                <TextField {...register("password_confirmation", {required: true})} type={'password'} variant="outlined" label="Password Confirmation" error={errors?.password_confirmation} fullWidth sx={{mt: 3}}/>

                <LoadingButton type="submit" variant="outlined" sx={{mt: 1}} fullWidth loading={isLoading}>Next</LoadingButton>

            </form>
        </>
    );
};
