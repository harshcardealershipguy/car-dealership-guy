import {Controller, useForm} from "react-hook-form";
import {useState} from "react";
import {FormControl, FormControlLabel, FormLabel, MenuItem, Radio, RadioGroup, Typography} from "@mui/material";
import {makesModels} from "@/data/makesModels";
import axios from "@/lib/axios";
import {LoadingButton} from "@mui/lab";
import SingleSelect from "@/components/Form/SingleSelect";
import {useAuth} from "@/hooks/auth";

export const Page4 = ({goToPage, externalId}) => {

    const tradeInYears = [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023];

    const {
        reset,
        handleSubmit,
        register,
        watch,
        control,
        formState: { errors },
    } = useForm({ mode: "onSubmit" });

    const [isLoading, setIsLoading] = useState(false);
    const tradeInMake = watch('trade_in_make');
    const has_trade_in = watch('has_trade_in');
    const {user} = useAuth();

    const csrf = () => axios.get('/sanctum/csrf-cookie');

    const saveData = async (data) => {
        setIsLoading(true);

        await csrf();

        data.external_id = externalId;
        const response = axios
            .post('/api/request/vehicle-info', data)
            .then(res => res.data)
            .catch((error) => {setIsLoading(false); throw error});
        await response;

        setIsLoading(false);

        //if the user is logged in, go to thank you
        if (user) {
            goToPage('thank-you');
        } else {
            goToPage('personal-info');
        }


        reset(); // reset form after successful submission
    };

    return (
        <>
            <Typography variant={'h4'} fontWeight={'bold'} sx={{mt: 3}}>Trade-In Details</Typography>
            <Typography variant={'subtitle1'} color="gray" sx={{mb: 3}}>If you have a trade-in, our partners can help include it as part of your deal.</Typography>
            <form onSubmit={handleSubmit(saveData)}>

                <div>

                    {/*TODO: error, required */}
                    <Controller
                        name={'has_trade_in'}
                        control={control}
                        render={ ({field}) => (
                            <FormControl sx={{mt: 0}} fullWidth>
                                <FormLabel id={'has_trade_in_label'} style={{color: '#000'}} focused={false}>Do you have a trade-in vehicle?</FormLabel>
                                <RadioGroup {...field} value={field.value}>
                                    <FormControlLabel value="true" control={<Radio  />} label="Yes" />
                                    <FormControlLabel value="false" control={<Radio/>} label="No" />
                                </RadioGroup>
                            </FormControl>

                        )}/>

                    {
                        has_trade_in === 'true' &&
                        (
                            <>
                                <SingleSelect id={'trade_in_year'} label={'Trade In Year'} defaultValue={''} errors={errors} register={register} sx={{mt: 3}}>
                                    {tradeInYears.map(function (year) {
                                        return <MenuItem value={year} key={year}>{year}</MenuItem>
                                    })}
                                </SingleSelect>

                                <SingleSelect id={'trade_in_make'} label={'Trade In Make'} defaultValue={''} errors={errors} register={register} sx={{mt: 3}}>
                                    {Object.keys(makesModels).map(function(make) {
                                        return <MenuItem value={make} key={make}>{make}</MenuItem>
                                    })}
                                </SingleSelect>

                                <SingleSelect id={'trade_in_model'} label={'Trade In Model'} defaultValue={''} errors={errors} register={register} sx={{mt: 3}}>
                                    {makesModels[tradeInMake] && Object.keys(makesModels[tradeInMake]).map(function(model) {
                                        return <MenuItem value={makesModels[tradeInMake][model]} key={makesModels[tradeInMake][model]}>{makesModels[tradeInMake][model]}</MenuItem>
                                    })}
                                </SingleSelect>

                            </>
                        )
                    }
                    {
                        has_trade_in === 'false' &&
                            (
                                <></>
                            )
                    }


                    {/*TODO: Make the next button active only when the trade-in is answered*/}
                    <LoadingButton type="submit" variant="contained" sx={{mt: 3}} fullWidth size={'large'} loading={isLoading}>Next</LoadingButton>

                </div>

            </form>
        </>
    );
};
