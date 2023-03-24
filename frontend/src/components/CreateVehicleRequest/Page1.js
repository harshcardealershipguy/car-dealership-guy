import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {Button, FormControl, FormControlLabel, FormLabel, RadioGroup, Typography} from "@mui/material";

export const Page1 = ({goToPage}) => {
    const [state, setState] = useState({});
    const {
        handleSubmit,
        register,
        watch,
        formState: { errors },
    } = useForm({ defaultValues: state, mode: "onSubmit" });

    const saveData = (data) => {
        setState({ ...state, ...data });

    };

    useEffect(() => {
        console.log(state);
        //TODO: save to DB

        if(state['exact_vehicle_known'] === 'exact_vehicle_known_yes') {
            goToPage('known-vehicle');
        } else if (state['exact_vehicle_known'] === 'exact_vehicle_known_no') {
            goToPage('unknown-vehicle');
        }
    }, [state])

    return (
        <>
            <Typography fontWeight={'bold'} variant={'h3'} sx={{mt: 3}}>Request Vehicle Information</Typography>
            <Typography sx={{mb: 3}}>We'll ask you some basic information to get an idea of the types of vehicles you're looking for.</Typography>

            <form onSubmit={handleSubmit(saveData)}>
                <FormControl error={errors?.exact_vehicle_known} sx={{mt: 3}}>
                    <FormLabel>Do you know exactly which vehicle you're interested in?</FormLabel>

                    <RadioGroup sx={{ml: 1}}>
                        <FormControlLabel value="exact_vehicle_known_yes" control={
                            <input
                            {...register("exact_vehicle_known", { required: "Exact Vehicle Known is required" })}
                            type="radio"
                            value="exact_vehicle_known_yes"
                            id="exact_vehicle_known_yes"
                        />

                        } label="Yes" />

                        <FormControlLabel value="exact_vehicle_known_no" control={

                            <input
                                {...register("exact_vehicle_known", { required: "Exact Vehicle Known is required" })}
                                type="radio"
                                value="exact_vehicle_known_no"
                                id="exact_vehicle_known_no"
                            />

                        } label="No" />

                    </RadioGroup>
                </FormControl>
                <Button type="submit" variant="outlined" sx={{mt: 1}} fullWidth>Next</Button>
            </form>
        </>
    );
};
