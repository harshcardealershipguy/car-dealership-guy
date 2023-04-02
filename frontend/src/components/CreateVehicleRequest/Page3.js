import {useForm} from "react-hook-form";
import {useState} from "react";
import {Button, FormControl, InputLabel, MenuItem, Select, Typography} from "@mui/material";
import axios from "@/lib/axios";
import {LoadingButton} from "@mui/lab";
import SingleSelect from "@/components/Form/SingleSelect";

export const Page3 = ({goToPage, externalId}) => {
    const {
        reset,
        handleSubmit,
        register,
        watch,
        formState: { errors },
    } = useForm({ mode: "onSubmit" });

    const [isLoading, setIsLoading] = useState(false);
    const payment_method = watch('payment_method');

    const saveData = async (data) => {
        setIsLoading(true);

        data.external_id = externalId;
        const response = axios
            .post('/api/request/vehicle-info', data)
            .then(res => res.data)
            .catch((error) => {setIsLoading(false); throw error});
        await response;

        setIsLoading(false);

        goToPage('trade-in');

        reset(); // reset form after successful submission
    };

    return (
        <>
            <Typography variant={'h4'} fontWeight={'bold'} sx={{mt: 3}}>Timing & Financing</Typography>
            <Typography variant={'subtitle1'} color="gray" sx={{mb: 1}}>Let's understand when you're looking to buy and what your budget looks like.</Typography>

            <form onSubmit={handleSubmit(saveData)}>

                <SingleSelect id={'timeframe'} label={'Purchase Timeframe'} defaultValue={''} errors={errors} register={register}>
                    <MenuItem value="asap">ASAP</MenuItem>
                    <MenuItem value="2_weeks">In the next 2 weeks</MenuItem>
                    <MenuItem value="30_days">In the next 30 days</MenuItem>
                    <MenuItem value="60_days">In the next 60 days</MenuItem>
                    <MenuItem value="90_days">In the next 90 days</MenuItem>
                    <MenuItem value="more_than_90_days">90+ days</MenuItem>
                </SingleSelect>

                <SingleSelect id={'payment_method'} label={'Payment Method'} defaultValue={''} errors={errors} register={register}>
                    <MenuItem value="financing">Financing</MenuItem>
                    <MenuItem value="cash">Cash</MenuItem>
                </SingleSelect>

                {payment_method === 'financing' && (
                    <SingleSelect id={'money_down'} label={'Money Down'} defaultValue={''} errors={errors} register={register}>
                        <MenuItem value="0">$0</MenuItem>
                        <MenuItem value="1_to_5000">$1 - $5,000</MenuItem>
                        <MenuItem value="5000_to_10000">$5,000 - $10,000</MenuItem>
                        <MenuItem value="10000_to_15000">$10,000 - $15,000</MenuItem>
                        <MenuItem value="15000_to_20000">$15,000 - $20,000</MenuItem>
                        <MenuItem value="more_than_20000">$20,000+</MenuItem>
                    </SingleSelect>
                )}

                <SingleSelect id={'budget_or_monthly_payment'} label={'Budget'} defaultValue={''} errors={errors} register={register}>
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
                </SingleSelect>

                <SingleSelect id={'credit_score'} label={'Credit Score'} defaultValue={''} errors={errors} register={register}>
                    <MenuItem value="poor">300 to 579 - Poor</MenuItem>
                    <MenuItem value="fair">580 to 669 - Fair</MenuItem>
                    <MenuItem value="good">670 to 739 - Good</MenuItem>
                    <MenuItem value="very_good">740 to 799 - Very Good</MenuItem>
                    <MenuItem value="excellent">800 to 850 - Excellent</MenuItem>
                </SingleSelect>


                <LoadingButton type="submit" variant="contained" sx={{mt: 3}} fullWidth size={'large'} loading={isLoading}>Next</LoadingButton>
            </form>
        </>
    );
};
