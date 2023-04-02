import AuthSessionStatus from '@/components/AuthSessionStatus'

import GuestLayout from '@/components/Layouts/GuestLayout'
import {useAuth} from '@/hooks/auth'
import {useState} from 'react'
import {Button, Grid, TextField, Typography} from "@mui/material";
import {useForm} from "react-hook-form";

const ForgotPassword = () => {
    const { forgotPassword } = useAuth({ middleware: 'guest' })

    const { register, handleSubmit } = useForm();

    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)

    const submitForm = data => {
        forgotPassword({ email: data.email, setErrors, setStatus })
    }

    return (
        <GuestLayout>
            <Grid container alignItems={'center'} justifyContent="center" >
                <Grid item xs={12} md={6} lg={4}>

                    <Typography variant={'h4'} fontWeight={'bold'}>Forgot Password</Typography>
                    <Typography variant={'subtitle1'} color="gray">Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.</Typography>

                    {/* Session Status */}
                    <AuthSessionStatus className="mb-4" status={status} />

                    <form onSubmit={handleSubmit(submitForm)}>

                        <TextField sx={{mt: 3}} {...register("email")} error={errors?.email} helperText={errors.email} type='email' label="Email" variant="outlined" fullWidth required autoFocus />

                        <Button sx={{my: 3}} variant="contained" type='submit' fullWidth size={'large'}>Email Password Reset Link</Button>
                    </form>

                </Grid>
            </Grid>

        </GuestLayout>
    )
}

export default ForgotPassword
