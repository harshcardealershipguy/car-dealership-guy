import {useForm} from "react-hook-form";
import {useState} from "react";
import {MenuItem, Typography} from "@mui/material";
import MultiSelect from "@/components/Form/MultiSelect";
import {makesModels} from "@/data/makesModels";
import {exteriorColors} from "@/data/exteriorColors";
import {interiorColors} from "@/data/interiorColors";
import {importantFeatures} from "@/data/importantFeatures";
import axios from "@/lib/axios";
import {LoadingButton} from "@mui/lab";
import SingleSelect from "@/components/Form/SingleSelect";
import {yearHighs, yearLows} from "@/data/years";


export const Page2No = ({goToPage, externalId}) => {

    const {
        control,
        reset,
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({ mode: "onSubmit" });

    const [isLoading, setIsLoading] = useState(false);

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

        goToPage('timing');

        reset(); // reset form after successful submission
    };

    return (
        <>
            <Typography variant={'h4'} fontWeight={'bold'} sx={{mt: 3}}>Vehicle Details</Typography>
            <Typography variant={'subtitle1'} color="gray" sx={{mb: 1}}>We'll ask you some simple questions to better understand what types of vehicles would fit what you're looking for.</Typography>

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

                <SingleSelect id={'body_style'} label={'Body Style'} defaultValue={''} errors={errors} register={register}>
                    <MenuItem value="any">Any</MenuItem>
                    <MenuItem value="sports_car">Sports Car</MenuItem>
                    <MenuItem value="hatchback">Hatchback</MenuItem>
                    <MenuItem value="coupe">Coupe</MenuItem>
                    <MenuItem value="sedan">Sedan</MenuItem>
                    <MenuItem value="convertable">Convertable</MenuItem>
                    <MenuItem value="station_wagon">Station Wagon</MenuItem>
                    <MenuItem value="minivan">Minivan</MenuItem>
                    <MenuItem value="van">Van</MenuItem>
                    <MenuItem value="suv">SUV</MenuItem>
                    <MenuItem value="pickup_truck">Pickup Truck</MenuItem>
                </SingleSelect>

                <SingleSelect id={'engine_type'} label={'Engine Type'} defaultValue={''} errors={errors} register={register}>
                    <MenuItem value="any">Any</MenuItem>
                    <MenuItem value="gasoline">Gasoline</MenuItem>
                    <MenuItem value="hybrid">Hybrid</MenuItem>
                    <MenuItem value="plugin_hybrid">Plugin Hybrid</MenuItem>
                    <MenuItem value="electric">Electric</MenuItem>
                    <MenuItem value="diesel">Diesel</MenuItem>
                </SingleSelect>

                <SingleSelect id={'size'} label={'Size'} defaultValue={''} errors={errors} register={register}>
                    <MenuItem value="any">Any</MenuItem>
                    <MenuItem value="compact">Compact</MenuItem>
                    <MenuItem value="small">Small</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="large">Large</MenuItem>
                </SingleSelect>

                <MultiSelect name={'makes'} label={'Preferred Makes'} control={control} options={Object.keys(makesModels).map(make => {return { "id": make, "name": make }} )}/>

                <MultiSelect name={'exclude_makes'} label={'Makes to Exclude'} control={control} options={Object.keys(makesModels).map(make => {return { "id": make, "name": make }} )}/>

                <MultiSelect name={'exterior_colors'} label={'Preferred Exterior Colors'} control={control} options={Object.keys(exteriorColors).map(exteriorColor => {return { "id": exteriorColor, "name": exteriorColors[exteriorColor] }} )}/>

                <MultiSelect name={'interior_colors'} label={'Preferred Interior Colors'} control={control} options={Object.keys(interiorColors).map(interiorColor => {return { "id": interiorColor, "name": interiorColors[interiorColor] }} )}/>

                <MultiSelect name={'important_features'} label={'Important Features'} control={control} options={importantFeatures.map(importantFeature => {return { "id": importantFeature, "name": importantFeature }} )}/>

                <LoadingButton type="submit" variant="contained" sx={{mt: 3}} fullWidth size={'large'} loading={isLoading}>Next</LoadingButton>
            </form>
        </>
    );
};
