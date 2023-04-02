import AuthSessionStatus from '@/components/AuthSessionStatus'
import GuestLayout from '@/components/Layouts/GuestLayout'
import {useState} from 'react'
import {Grid, TextField, Typography} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import axios from "@/lib/axios";

const CreateDealerRequest = () => {


    const schema = yup.object({
        name: yup.string().required(),
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
            .post('/api/dealer-request', data)
            .then(res => res.data)
            .catch((error) => {setIsLoading(false); throw error});
        await response;

        setIsLoading(false);

        goToPage('thank-you');

        reset(); // reset form after successful submission
    };

    return (
        <GuestLayout>
            <Grid container justifyContent="center" sx={{mt: 5}}>
                <Grid item xs={5}>

                    {/* Session Status */}
                    <AuthSessionStatus className="mb-4" />

                    <Typography fontWeight={'bold'} variant={'h3'} sx={{mt: 3}}>Join Our Partner Program</Typography>
                    <Typography sx={{mb: 3}}>Are you a sales agent looking for vehicle leads? Sign up to be a part of our Partner Program to start the process. </Typography>

                    <form onSubmit={handleSubmit(saveData)}>
                        <TextField {...register("city")} variant="outlined" label="Primary zip code that you serve" error={!!errors?.city} helperText={errors?.['city']?.message} fullWidth/>

                        <TextField {...register("email")} variant="outlined" label="Email" error={!!errors?.email} helperText={errors?.['email']?.message} fullWidth sx={{mt: 3}}/>

                        <TextField {...register("name")} variant="outlined" label="Name" error={!!errors?.name} fullWidth sx={{mt: 3}}/>

                        <TextField {...register("password")} type={'password'} variant="outlined" label="Password" error={!!errors?.password} helperText={errors?.['password']?.message} fullWidth sx={{mt: 3}}/>

                        <TextField {...register("password_confirmation")} type={'password'} variant="outlined" label="Password Confirmation" error={!!errors?.password_confirmation} helperText={errors?.['password_confirmation']?.message} fullWidth sx={{mt: 3}}/>

                        <LoadingButton type="submit" variant="outlined" sx={{mt: 1}} fullWidth loading={isLoading}>Next</LoadingButton>

                    </form>

                </Grid>
            </Grid>
        </GuestLayout>
    )
}

export default CreateDealerRequest
