import AuthSessionStatus from '@/components/AuthSessionStatus'

import GuestLayout from '@/components/Layouts/GuestLayout'
import Link from 'next/link'
import {useAuth} from '@/hooks/auth'
import {useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import {Button, Checkbox, FormControlLabel, FormGroup, Grid, Paper, TextField, Typography} from "@mui/material";
import {useForm} from "react-hook-form";

const Login = () => {
    const router = useRouter()

    const { login } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard',
    })

    const { register, handleSubmit } = useForm();
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)

    useEffect(() => {
        if (router.query.reset?.length > 0 && errors.length === 0) {
            setStatus(atob(router.query.reset))
        } else {
            setStatus(null)
        }
    })

    const submitForm = async data => {
        login({
            email: data.email,
            password: data.password,
            remember: data.remember,
            setErrors,
            setStatus,
        })
    }

    return (
        <GuestLayout>
            <Grid container alignItems={'center'} justifyContent="center" >
                <Grid item xs={12} md={6} lg={4}>

                    <AuthSessionStatus status={status} />

                    <Paper elevation={0} sx={{px: 4, pb: 4, pt: 1, mt: 2}}>

                        <Typography variant={'h4'} fontWeight={'bold'} sx={{mt: 3}}>Login</Typography>
                        <Typography variant={'subtitle1'} color="gray">If you already have an account, login here. Or <Link href={'/register'}>create an account</Link>.</Typography>
                        <form onSubmit={handleSubmit(submitForm)}>

                            <TextField sx={{mt: 3}} {...register("email")} error={errors?.email} helperText={errors.email} type='email' label="Email" variant="outlined" fullWidth required autoFocus />

                            <TextField sx={{mt: 3}} {...register('password')} error={errors?.password} helperText={errors.password} type='password' label="Password" variant="outlined" fullWidth required />

                            <FormGroup sx={{my: 2}}>
                                <FormControlLabel control={<Checkbox {...register('remember')} defaultChecked />} label="Remember Me" />
                            </FormGroup>

                            <Button variant="contained" type='submit' fullWidth size={'large'}>Login</Button>

                            <br/>
                            <Link href="/forgot-password">
                                <Typography sx={{py: 3}} textAlign={'right'}>Forgot your password?</Typography>
                            </Link>
                        </form>
                    </Paper>

                </Grid>
            </Grid>
        </GuestLayout>
    )
}

export default Login
