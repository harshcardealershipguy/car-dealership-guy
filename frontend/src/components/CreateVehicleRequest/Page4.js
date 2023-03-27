import {useForm} from "react-hook-form";
import {useState} from "react";
import {
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    InputLabel,
    MenuItem,
    RadioGroup,
    Select,
    Typography
} from "@mui/material";
import {makesModels} from "@/data/makesModels";
import axios from "@/lib/axios";
import {LoadingButton} from "@mui/lab";

export const Page4 = ({goToPage, externalId}) => {

    const tradeInYears = [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023];

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
            .post('/api/request/vehicle-info', data)
            .then(res => res.data)
            .catch((error) => {setIsLoading(false); throw error});
        await response;

        setIsLoading(false);

        goToPage('personal-info');

        reset(); // reset form after successful submission
    };

    const tradeInMake = watch('trade_in_make');

    const has_trade_in = watch('has_trade_in');


    return (
        <>
            <Typography fontWeight={'bold'} variant={'h3'} sx={{mt: 3}}>Trade-In Details</Typography>
            <Typography sx={{mb: 3}}>If you have a trade-in, our partners can help include it as part of your deal.</Typography>
            <form onSubmit={handleSubmit(saveData)}>

                <div>
                    <FormControl error={errors?.has_trade_in} sx={{mt: 3}}>
                        <FormLabel>Do you have a trade-in vehicle?</FormLabel>

                        <RadioGroup sx={{ml: 1}}>
                            <FormControlLabel value="has_trade_in_yes" control={
                                <input
                                    {...register("has_trade_in", { required: "Trade-in is required" })}
                                    type="radio"
                                    value="has_trade_in_yes"
                                    id="has_trade_in_yes"
                                />

                            } label="Yes" />

                            <FormControlLabel value="has_trade_in_no" control={

                                <input
                                    {...register("has_trade_in", { required: "Trade-in is required" })}
                                    type="radio"
                                    value="has_trade_in_no"
                                    id="has_trade_in_no"
                                />

                            } label="No" />

                        </RadioGroup>

                    </FormControl>


                    {
                        has_trade_in === 'has_trade_in_yes' &&
                        (
                            <>
                                <FormControl fullWidth sx={{mt: 3}} error={errors?.trade_in_year}>
                                    <InputLabel>Trade In Year</InputLabel>
                                    <Select defaultValue={"any"} {...register("trade_in_year", {required: true})}
                                            id={"trade_in_year"}>
                                        {tradeInYears.map(function (year) {
                                            return <MenuItem value={year} key={year}>{year}</MenuItem>
                                        })}
                                    </Select>
                                </FormControl>

                                <FormControl fullWidth sx={{mt: 3}} error={errors?.trade_in_make}>
                                    <InputLabel>Trade In Make</InputLabel>

                                    <Select defaultValue={"any"} {...register("trade_in_make", { required: true })} id={"trade_in_make"}>
                                        {Object.keys(makesModels).map(function(make) {
                                            return <MenuItem value={make} key={make}>{make}</MenuItem>
                                        })}
                                    </Select>
                                </FormControl>

                                <FormControl fullWidth sx={{mt: 3}} error={errors?.trade_in_model}>
                                    <InputLabel>Trade In Model</InputLabel>
                                    <Select defaultValue={"any"} {...register("trade_in_model", { required: true })} id={"trade_in_model"}>
                                        {makesModels[tradeInMake] && Object.keys(makesModels[tradeInMake]).map(function(model) {
                                            return <MenuItem value={makesModels[tradeInMake][model]} key={makesModels[tradeInMake][model]}>{makesModels[tradeInMake][model]}</MenuItem>
                                        })}
                                    </Select>
                                </FormControl>

                            </>
                        )
                    }
                    {
                        has_trade_in === 'has_trade_in_no' &&
                            (
                                <Typography>No problem!</Typography>
                            )
                    }


                    {/*TODO: Make the next button active only when the trade-in is answered*/}
                    <LoadingButton type="submit" variant="outlined" sx={{mt: 1}} fullWidth loading={isLoading}>Next</LoadingButton>
                </div>

            </form>
        </>
    );
};
