import {useForm} from "react-hook-form";
import {useState} from "react";
import {FormHelperText, MenuItem, TextField, Typography} from "@mui/material";
import {states} from "@/data/states";
import axios from "@/lib/axios";
import {LoadingButton} from "@mui/lab";
import SingleSelect from "@/components/Form/SingleSelect";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

export const Page5 = ({goToPage, externalId}) => {

    const schema = yup.object({
        city: yup.string().required(),
        state: yup.string().required(),
        email: yup.string().email().required(),
        password: yup.string().min(8).required(),
        password_confirmation: yup.string().min(8).oneOf([yup.ref('password'), null], 'Passwords must match').required()
    });

    const {
        reset,
        handleSubmit,
        register,
        watch,
        formState: { errors },
    } = useForm({resolver: yupResolver(schema), mode: "onSubmit" });

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
            <Typography variant={'h4'} fontWeight={'bold'} sx={{mt: 3}}>Personal Information</Typography>
            <Typography variant={'subtitle1'} color="gray" sx={{mb: 3}}>One final step so that we know where you're located and how to get in-touch.</Typography>

            <form onSubmit={handleSubmit(saveData)}>
                <TextField {...register("city")} variant="outlined" label="City" error={!!errors?.city} helperText={errors?.['city']?.message} fullWidth/>

                <SingleSelect id={'state'} label={'State'} defaultValue={''} errors={errors} register={register}>
                    {Object.keys(states).map(function (stateId) {
                        return <MenuItem value={stateId} key={stateId}>{states[stateId]}</MenuItem>
                    })}
                </SingleSelect>

                <TextField {...register("email")} variant="outlined" label="Email" error={!!errors?.email} helperText={errors?.['email']?.message} fullWidth sx={{mt: 3}}/>

                <TextField {...register("name")} variant="outlined" label="Name" error={!!errors?.name} fullWidth sx={{mt: 3}}/>

                <TextField {...register("password")} type={'password'} variant="outlined" label="Password" error={!!errors?.password} helperText={errors?.['password']?.message} fullWidth sx={{mt: 3}}/>

                <TextField {...register("password_confirmation")} type={'password'} variant="outlined" label="Password Confirmation" error={!!errors?.password_confirmation} helperText={errors?.['password_confirmation']?.message} fullWidth sx={{mt: 3}}/>

                <LoadingButton type="submit" variant="contained" sx={{mt: 3}} fullWidth size={'large'} loading={isLoading}>Next</LoadingButton>

            </form>
        </>
    );
};
