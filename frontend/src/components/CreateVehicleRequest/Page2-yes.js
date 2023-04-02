import {useForm} from "react-hook-form";
import {useState} from "react";
import {FormControl, InputLabel, MenuItem, Select, Typography} from "@mui/material";
import {makesModels} from "@/data/makesModels";
import {interiorColors} from "@/data/interiorColors";
import {exteriorColors} from "@/data/exteriorColors";
import axios from "@/lib/axios";
import MultiSelect from "@/components/Form/MultiSelect";
import {LoadingButton} from "@mui/lab";
import SingleSelect from "@/components/Form/SingleSelect";

export const Page2Yes = ({goToPage, externalId}) => {
    const yearLows = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023];
    const yearHighs = [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];

    const {
        control,
        reset,
        handleSubmit,
        register,
        watch,
        formState: { errors },
    } = useForm({mode: "onSubmit" });

    const [isLoading, setIsLoading] = useState(false);
    const make = watch('make');

    const saveData = async  (data) => {
        setIsLoading(true);

        data.external_id = externalId;
        const response = axios
            .post('/api/request/vehicle-info', data)
            .then(res => res.data)
            .catch((error) => {setIsLoading(false); throw error});
        await response;

        setIsLoading(false);

        goToPage('timing');

        reset(); // reset form after successful submission
    };

    return (
        <>
            <Typography variant={'h4'} fontWeight={'bold'} sx={{mt: 3}}>Vehicle Details</Typography>
            <Typography variant={'subtitle1'} color="gray" sx={{mb: 1}}>We'll ask you some questions to understand the vehicle you're looking for.</Typography>

            <form onSubmit={handleSubmit(saveData)}>

                <SingleSelect id={'new_or_used'} label={'New Or Used'} defaultValue={''} errors={errors} register={register}>
                    <MenuItem value="new">New</MenuItem>
                    <MenuItem value="used">Used</MenuItem>
                    <MenuItem value="new_or_used">New Or Used</MenuItem>
                </SingleSelect>

                <SingleSelect id={'year_low'} label={'Year Minimum'} defaultValue={''} errors={errors} register={register}>
                    <MenuItem value="any" defaultValue>Any</MenuItem>
                    {yearLows.map(function(year) {
                        return <MenuItem value={year} key={year}>{year}</MenuItem>
                    })}
                </SingleSelect>

                <SingleSelect id={'year_high'} label={'Year Maximum'} defaultValue={''} errors={errors} register={register}>
                    <MenuItem value="any">Any</MenuItem>
                    {yearHighs.map(function(year) {
                        return <MenuItem value={year} key={year}>{year}</MenuItem>
                    })}
                </SingleSelect>

                <SingleSelect id={'make'} label={'Make'} defaultValue={''} errors={errors} register={register}>
                    <MenuItem value="any">Any</MenuItem>
                    {Object.keys(makesModels).map(function(make) {
                        return <MenuItem value={make} key={make}>{make}</MenuItem>
                    })}
                </SingleSelect>

                <SingleSelect id={'model'} label={'Model'} defaultValue={''} errors={errors} register={register}>
                    <MenuItem value="any">Any</MenuItem>
                    {makesModels[make] && Object.keys(makesModels[make]).map(function(model) {
                        return <MenuItem value={makesModels[make][model]} key={makesModels[make][model]}>{makesModels[make][model]}</MenuItem>
                    })}
                </SingleSelect>

                <SingleSelect id={'engine_type'} label={'Engine Type'} defaultValue={''} errors={errors} register={register}>
                    <MenuItem value="any">Any</MenuItem>
                    <MenuItem value="gasoline">Gasoline</MenuItem>
                    <MenuItem value="hybrid">Hybrid</MenuItem>
                    <MenuItem value="plugin_hybrid">Plugin Hybrid</MenuItem>
                    <MenuItem value="electric">Electric</MenuItem>
                    <MenuItem value="diesel">Diesel</MenuItem>
                </SingleSelect>

                <MultiSelect name={'exterior_colors'} label={'Preferred Exterior Colors'} control={control} options={Object.keys(exteriorColors).map(exteriorColor => {return { "id": exteriorColor, "name": exteriorColors[exteriorColor] }} )}/>

                <MultiSelect name={'interior_colors'} label={'Preferred Interior Colors'} control={control} options={Object.keys(interiorColors).map(interiorColor => {return { "id": interiorColor, "name": interiorColors[interiorColor] }} )}/>

                <LoadingButton type="submit" variant="contained" sx={{mt: 3}} fullWidth size={'large'} loading={isLoading}>Next</LoadingButton>

            </form>
        </>
    );
};
