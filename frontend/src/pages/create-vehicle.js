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
import AppLayout from "@/components/Layouts/AppLayout";

const CreateVehicle = () => {
    const router = useRouter();

    const schema = yup.object({
        vin: yup.string().required()
            .matches(/^[A-Z0-9]+$/, "Vin must be only letters or digits")
            .min(17, "VIN must be exactly 17 digits")
            .max(17, "VIN must be exactly 17 digits"),
        year: yup.number().required()
            .min(4, "Year must be exactly 4 digits")
            .max(4, "Year must be exactly 4 digits"),
        make: yup.string().required(),
        model: yup.string().required(),
        mileage: yup.number().required(),
        condition: yup.string().required(),
        zip: yup.string().required()
            .matches(/^[0-9]+$/, "Zip must be only digits")
            .min(5, "Zip must be exactly 5 digits")
            .max(5, "Zip must be exactly 5 digits"),
        msrp: yup.number().required(),
        price: yup.number().required(),
        description: yup.string().required()
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
            .post('/api/create-vehicle', data)
            .then(res => res.data)
            .catch((error) => {setIsLoading(false); throw error});
        await response;

        setIsLoading(false);

        router.push('/dashboard/');

        reset(); // reset form after successful submission
    };

    return (
        <AppLayout>
            <Grid container justifyContent="center">
                <Grid item xs={5}>

                    <Paper elevation={0} sx={{px: 4, pb: 4, pt: 1, mt: 2}}>

                        {/* Session Status */}
                        <AuthSessionStatus className="mb-4" />

                        <Typography variant={'h4'} fontWeight={'bold'} sx={{mt: 3}}>List a Vehicle</Typography>
                        <Typography variant={'subtitle1'} color="gray" sx={{mb: 3}}>List a vehicle in our inventory. All vehicles will be reviewed by our team to ensure a great experience for our customers.</Typography>

                        <form onSubmit={handleSubmit(saveData)}>
                            <TextField {...register("vin")} variant="outlined" label="VIN" error={!!errors?.vin} helperText={errors?.['vin']?.message} fullWidth/>

                            <TextField {...register("year")} variant="outlined" label="Year" error={!!errors?.year} helperText={errors?.['year']?.message} fullWidth sx={{mt: 3}}/>

                            <TextField {...register("make")} variant="outlined" label="Make" error={!!errors?.make} helperText={errors?.['make']?.message} fullWidth sx={{mt: 3}}/>

                            <TextField {...register("model")} variant="outlined" label="Model" error={!!errors?.model} helperText={errors?.['model']?.message} fullWidth sx={{mt: 3}}/>

                            <TextField {...register("mileage")} variant="outlined" label="Mileage" error={!!errors?.mileage} fullWidth sx={{mt: 3}}/>

                            <TextField {...register("condition")} variant="outlined" label="Condition" error={!!errors?.condition} fullWidth sx={{mt: 3}}/>

                            <TextField {...register("zip")} variant="outlined" label="Zip" error={!!errors?.zip} fullWidth sx={{mt: 3}}/>

                            <TextField {...register("msrp")} variant="outlined" label="MSRP" error={!!errors?.msrp} fullWidth sx={{mt: 3}}/>

                            <TextField {...register("price")} variant="outlined" label="Sale Price" error={!!errors?.price} fullWidth sx={{mt: 3}}/>

                            <TextField {...register("description")} variant="outlined" label="Description" error={!!errors?.description} fullWidth sx={{mt: 3}}/>

                            <LoadingButton type="submit" variant="contained" sx={{mt: 3}} fullWidth size={'large'} loading={isLoading}>Submit for Review</LoadingButton>

                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </AppLayout>
    )
}

export default CreateVehicle
