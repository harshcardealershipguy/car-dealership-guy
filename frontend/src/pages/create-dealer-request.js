import AuthSessionStatus from '@/components/AuthSessionStatus'
import GuestLayout from '@/components/Layouts/GuestLayout'
import {useState} from 'react'
import {Grid, Paper, TextField, Typography} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import axios from "@/lib/axios";
import {useRouter} from "next/router";

const CreateDealerRequest = () => {
    const router = useRouter();

    const schema = yup.object({
        zip: yup.string().required()
            .matches(/^[0-9]+$/, "Zip must be only digits")
            .min(5, "Zip must be exactly 5 digits")
            .max(5, "Zip must be exactly 5 digits"),
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

    const csrf = () => axios.get('/sanctum/csrf-cookie');

    const [isLoading, setIsLoading] = useState(false);

    const saveData = async (data) => {
        setIsLoading(true);

        await csrf();

        const response = axios
            .post('/api/dealer-join-request', data)
            .then(res => res.data)
            .catch((error) => {setIsLoading(false); throw error});
        await response;

        setIsLoading(false);

        router.push('/dashboard/');

        reset(); // reset form after successful submission
    };

    return (
        <GuestLayout>
            <Grid container justifyContent="center">
                <Grid item xs={5}>

                    <Paper elevation={0} sx={{px: 4, pb: 4, pt: 1, mt: 2}}>

                        {/* Session Status */}
                        <AuthSessionStatus className="mb-4" />

                        <Typography variant={'h4'} fontWeight={'bold'} sx={{mt: 3}}>Join Our Partner Program</Typography>
                        <Typography variant={'subtitle1'} color="gray" sx={{mb: 3}}>Are you a sales agent looking for vehicle leads? Sign up to be a part of our Partner Program to start the process. </Typography>

                        <form onSubmit={handleSubmit(saveData)}>
                            <TextField {...register("zip")} variant="outlined" label="Primary zip code that you serve" error={!!errors?.zip} helperText={errors?.['zip']?.message} fullWidth/>

                            <TextField {...register("email")} variant="outlined" label="Email" error={!!errors?.email} helperText={errors?.['email']?.message} fullWidth sx={{mt: 3}}/>

                            <TextField {...register("name")} variant="outlined" label="Name" error={!!errors?.name} fullWidth sx={{mt: 3}}/>

                            <TextField {...register("password")} type={'password'} variant="outlined" label="Password" error={!!errors?.password} helperText={errors?.['password']?.message} fullWidth sx={{mt: 3}}/>

                            <TextField {...register("password_confirmation")} type={'password'} variant="outlined" label="Password Confirmation" error={!!errors?.password_confirmation} helperText={errors?.['password_confirmation']?.message} fullWidth sx={{mt: 3}}/>

                            <LoadingButton type="submit" variant="contained" sx={{mt: 3}} fullWidth size={'large'} loading={isLoading}>Next</LoadingButton>

                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </GuestLayout>
    )
}

export default CreateDealerRequest
