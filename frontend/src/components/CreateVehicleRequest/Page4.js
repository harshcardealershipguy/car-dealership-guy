import { useForm } from "react-hook-form";


import {Field} from "@/components/CreateVehicleRequest/Field";
import {useEffect, useState} from "react";
import Label from "@/components/Label";
import Input from "@/components/Input";
import InputError from "@/components/InputError";
import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    InputLabel, LinearProgress, MenuItem,
    RadioGroup,
    Select,
    Typography
} from "@mui/material";
import {makesModels} from "@/data/makesModels";

export const Page4 = ({goToPage}) => {

    const tradeInYears = [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023];
    const [state, setState] = useState({});
    const {
        handleSubmit,
        register,
        watch,
        formState: { errors },
    } = useForm({ defaultValues: state, mode: "onSubmit" });

    const saveData = (data) => {
        setState({ ...state, ...data });

        goToPage('Page5', 80);
    };

    const make = watch('make');

    const has_trade_in = watch('has_trade_in');

    useEffect(() => {
        console.log(state);
        //TODO: save to DB
        //TODO: go to the next page

    }, [state])

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
                                        <MenuItem value="any" defaultValue>Any</MenuItem>
                                        {tradeInYears.map(function (year) {
                                            return <MenuItem value={year} key={year}>{year}</MenuItem>
                                        })}
                                    </Select>
                                </FormControl>

                                <FormControl fullWidth sx={{mt: 3}} error={errors?.make}>
                                    <InputLabel>Make</InputLabel>

                                    <Select defaultValue={"any"} {...register("make", { required: true })} id={"make"}>
                                        <MenuItem value="any">Any</MenuItem>
                                        {Object.keys(makesModels).map(function(make) {
                                            return <MenuItem value={make} key={make}>{make}</MenuItem>
                                        })}
                                    </Select>
                                </FormControl>

                                <FormControl fullWidth sx={{mt: 3}} error={errors?.model}>
                                    <InputLabel>Model</InputLabel>
                                    <Select defaultValue={"any"} {...register("model", { required: true })} id={"model"}>
                                        <MenuItem value="any">Any</MenuItem>

                                        {makesModels[make] && Object.keys(makesModels[make]).map(function(model) {
                                            return <MenuItem value={makesModels[make][model]} key={makesModels[make][model]}>{makesModels[make][model]}</MenuItem>
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
                    <Button type="submit" variant="outlined" sx={{mt: 1}} fullWidth>Next</Button>
                </div>

            </form>
        </>
    );
};
