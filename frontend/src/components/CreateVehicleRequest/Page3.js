import { useForm } from "react-hook-form";


import {Field} from "@/components/CreateVehicleRequest/Field";
import {useEffect, useState} from "react";
import {Box, Button, FormControl, InputLabel, LinearProgress, MenuItem, Select, Typography} from "@mui/material";

export const Page3 = ({goToPage}) => {

    const [state, setState] = useState({});
    const {
        handleSubmit,
        register,
        watch,
        formState: { errors },
    } = useForm({ defaultValues: state, mode: "onSubmit" });

    const saveData = (data) => {
        setState({ ...state, ...data });

        goToPage('Page4', 60);
    };

    const payment_method = watch('payment_method');


    useEffect(() => {
        console.log(state);
        //TODO: save to DB
        //TODO: go to the next page
    }, [state])

    return (
        <>
            <Typography fontWeight={'bold'} variant={'h3'} sx={{mt: 3}}>Timing & Financing</Typography>
            <Typography sx={{mb: 3}}>Let's understand when you're looking to buy and what your budget looks like.</Typography>

            <form onSubmit={handleSubmit(saveData)}>

                <FormControl fullWidth sx={{mt: 3}} error={errors?.timeframe}>
                    <InputLabel>Purchase Timeframe</InputLabel>
                    <Select {...register("timeframe", { required: true })} id={"timeframe"}>
                        <MenuItem value="asap">ASAP</MenuItem>
                        <MenuItem value="2_weeks">In the next 2 weeks</MenuItem>
                        <MenuItem value="30_days">In the next 30 days</MenuItem>
                        <MenuItem value="60_days">In the next 60 days</MenuItem>
                        <MenuItem value="90_days">In the next 90 days</MenuItem>
                        <MenuItem value="more_than_90_days">90+ days</MenuItem>
                    </Select>
                </FormControl>

                <FormControl fullWidth sx={{mt: 3}} error={errors?.payment_method}>
                    <InputLabel>Payment Method</InputLabel>
                    <Select {...register("payment_method", { required: true })} id={"payment_method"}>
                        <MenuItem value="financing">Financing</MenuItem>
                        <MenuItem value="cash">Cash</MenuItem>
                    </Select>
                </FormControl>

                {payment_method === 'financing' && (
                    <FormControl fullWidth sx={{mt: 3}} error={errors?.money_down}>
                        <InputLabel>Money Down</InputLabel>
                        <Select {...register("money_down", {required: true})} id={"money_down"}>
                            <MenuItem value="0">$0</MenuItem>
                            <MenuItem value="1_to_5000">$1 - $5,000</MenuItem>
                            <MenuItem value="5000_to_10000">$5,000 - $10,000</MenuItem>
                            <MenuItem value="10000_to_15000">$10,000 - $15,000</MenuItem>
                            <MenuItem value="15000_to_20000">$15,000 - $20,000</MenuItem>
                            <MenuItem value="more_than_20000">$20,000+</MenuItem>
                        </Select>
                    </FormControl>
                )}

                <FormControl fullWidth sx={{mt: 3}} error={errors?.budget_or_monthly_payment}>
                    <InputLabel>Budget</InputLabel>
                    <Select {...register("budget_or_monthly_payment", { required: true })} id={"budget_or_monthly_payment"}>
                        {
                            payment_method === 'cash' ? (
                                [
                                    <MenuItem value="under_5000">Under $5,000</MenuItem>,
                                    <MenuItem value="under_10000">Under $10,000</MenuItem>,
                                    <MenuItem value="under_20000">Under $20,000</MenuItem>,
                                    <MenuItem value="under_30000">Under $30,000</MenuItem>,
                                    <MenuItem value="under_50000">Under $50,000</MenuItem>,
                                    <MenuItem value="under_80000">Under $80,000</MenuItem>,
                                    <MenuItem value="under_100000">Under $100,000</MenuItem>
                                ]
                            )
                            : (
                                [
                                    <MenuItem value="100_per_month">$100/month</MenuItem>,
                                    <MenuItem value="200_per_month">$200/month</MenuItem>,
                                    <MenuItem value="300_per_month">$300/month</MenuItem>,
                                    <MenuItem value="400_per_month">$400/month</MenuItem>,
                                    <MenuItem value="500_per_month">$500/month</MenuItem>,
                                    <MenuItem value="600_per_month">$600/month</MenuItem>,
                                    <MenuItem value="700_per_month">$700/month</MenuItem>
                                ]
                            )
                        }
                    </Select>
                </FormControl>

                <FormControl fullWidth sx={{mt: 3}} error={errors?.credit_score}>
                    <InputLabel>Credit Score</InputLabel>
                    <Select {...register("credit_score", { required: true })} id={"credit_score"}>
                        <MenuItem value="poor">300 to 579 - Poor</MenuItem>
                        <MenuItem value="fair">580 to 669 - Fair</MenuItem>
                        <MenuItem value="good">670 to 739 - Good</MenuItem>
                        <MenuItem value="very_good">740 to 799 - Very Good</MenuItem>
                        <MenuItem value="excellent">800 to 850 - Excellent</MenuItem>
                    </Select>
                </FormControl>

                <br/>
                <Button type="submit" variant="outlined" sx={{mt: 1}} fullWidth>Next</Button>
            </form>
        </>
    );
};
