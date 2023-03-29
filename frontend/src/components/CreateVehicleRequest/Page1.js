import {useForm, Controller} from "react-hook-form";
import {useState} from "react";
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography} from "@mui/material";
import axios from "@/lib/axios";
import {LoadingButton} from "@mui/lab";

export const Page1 = ({goToPage}) => {

    const {
        handleSubmit,
        register,
        formState: { errors },
        reset,
        control
    } = useForm({ mode: "onSubmit" });

    const [isLoading, setIsLoading] = useState(false);

    const csrf = () => axios.get('/sanctum/csrf-cookie');

    const saveData = async (data) => {
        setIsLoading(true);
        data.exact_vehicle_known = data.exact_vehicle_known === 'true';

        await csrf();

        const response = axios
            .post('/api/request', data)
            .then(res => res.data)
            .catch((error) => {setIsLoading(false); throw error});

        const responseData = await response;

        setIsLoading(false);

        if(data['exact_vehicle_known']) {
            goToPage('known-vehicle', responseData.external_id);
        } else if (!data['exact_vehicle_known']) {
            goToPage('unknown-vehicle', responseData.external_id);
        }

        // reset form after successful submission
        reset();
    };

    return (
        <>
            <Typography fontWeight={'bold'} variant={'h3'} sx={{mt: 3}}>Request Vehicle Information</Typography>
            <Typography sx={{mb: 3}}>We'll ask you some basic information to get an idea of the types of vehicles you're looking for.</Typography>

            <form onSubmit={handleSubmit(saveData)}>
                <Controller
                    name={'exact_vehicle_known'}
                    control={control}
                    render={ ({field}) => (
                        <>
                            <FormLabel id={'exact_vehicle_known_label'}>Do you know exactly which vehicle you're interested in?</FormLabel>
                            <FormControl sx={{mt: 0}} fullWidth>
                                <RadioGroup {...field} value={field.value}>
                                    <FormControlLabel value="true" control={<Radio  />} label="Yes" />
                                    <FormControlLabel value="false" control={<Radio/>} label="No" />
                                </RadioGroup>
                            </FormControl>
                        </>
                    )}/>

                <LoadingButton type="submit" variant="outlined" sx={{mt: 1}} fullWidth loading={isLoading}>Next</LoadingButton>
            </form>
        </>
    );
};
