import {useAuth} from '@/hooks/auth'
import {useState} from 'react'
import {Alert, Grid, Paper, TextField, Typography} from "@mui/material";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {LoadingButton} from "@mui/lab";
import AuthSessionStatus from "@/components/AuthSessionStatus";
import GuestLayout from "@/components/Layouts/GuestLayout";
import {useRouter} from "next/router";

const Register = () => {

    const router = useRouter();

    const { registerApi } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard',
    })

    //TODO: Show API errors to the user
    const [errors, setErrors] = useState({});

    const schema = yup.object({
        zip: yup.string().required()
            .matches(/^[0-9]+$/, "Zip must be only digits")
            .min(5, "Zip must be exactly 5 digits")
            .max(5, "Zip must be exactly 5 digits"),
        email: yup.string().email().required(),
        password: yup.string().min(8).required(),
        password_confirmation: yup.string().min(8).oneOf([yup.ref('password'), null], 'Passwords must match').required()
    });

    const {
        reset,
        handleSubmit,
        register,
        formState,
    } = useForm({resolver: yupResolver(schema), mode: "onSubmit" });

    const [isLoading, setIsLoading] = useState(false);

    const saveData = async (data) => {
        setIsLoading(true);

        await registerApi({setErrors, ...data})
            .catch((error) => {setIsLoading(false); throw error})
            .then(() => {
                router.push('/dashboard');
            })
    };

    return (
        <>
            <GuestLayout>
                <Grid container justifyContent="center">
                    <Grid item xs={5}>

                        {/* Session Status */}
                        <AuthSessionStatus className="mb-4" />

                        {Object.keys(errors).length > 0 && (
                            <Alert severity="error">
                                There was a problem!
                                <ul>
                                    {Object.keys(errors).map(error => <li>{errors[error]}</li>)}
                                </ul>
                            </Alert>

                        )}

                        <Paper elevation={0} sx={{px: 4, pb: 4, pt: 1, mt: 2}}>

                            <Typography variant={'h4'} fontWeight={'bold'} sx={{mt: 3}}>Register</Typography>
                            <Typography variant={'subtitle1'} color="gray" sx={{mb: 3}}>One quick step to gain exclusive access to all of the great deals!</Typography>

                            <form onSubmit={handleSubmit(saveData)}>

                                <TextField {...register("name")} variant="outlined" label="Name" error={!!formState.errors?.name} fullWidth/>

                                <TextField {...register("email")} variant="outlined" label="Email" error={!!formState.errors?.email} helperText={formState.errors?.['email']?.message} fullWidth sx={{mt: 3}}/>

                                <TextField {...register("zip")} variant="outlined" label="Zipcode" error={!!formState.errors?.zip} helperText={formState.errors?.['zip']?.message} fullWidth sx={{mt: 3}}/>

                                <TextField {...register("password")} type={'password'} variant="outlined" label="Password" error={!!formState.errors?.password} helperText={formState.errors?.['password']?.message} fullWidth sx={{mt: 3}}/>

                                <TextField {...register("password_confirmation")} type={'password'} variant="outlined" label="Password Confirmation" error={!!formState.errors?.password_confirmation} helperText={formState.errors?.['password_confirmation']?.message} fullWidth sx={{mt: 3}}/>

                                <LoadingButton type="submit" variant="contained" sx={{mt: 3}} fullWidth size={'large'} loading={isLoading}>Register</LoadingButton>

                            </form>
                        </Paper>
                    </Grid>
                </Grid>
            </GuestLayout>
        </>
    );


}

export default Register
