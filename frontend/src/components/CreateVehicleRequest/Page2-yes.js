import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {Button, FormControl, InputLabel, MenuItem, Select, Typography} from "@mui/material";
import {makesModels} from "@/data/makesModels";
import {interiorColors} from "@/data/interiorColors";
import {exteriorColors} from "@/data/exteriorColors";
import axios from "@/lib/axios";
import MultiSelect from "@/components/Form/MultiSelect";

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

    const make = watch('make');

    return (
        <>
            <Typography fontWeight={'bold'} variant={'h3'} sx={{mt: 3}}>Vehicle Details</Typography>
            <Typography sx={{mb: 3}}>We'll ask you some questions to understand the vehicle you're looking for.</Typography>

            <form onSubmit={handleSubmit(saveData)}>

                <FormControl fullWidth sx={{mt: 3}} error={errors?.new_or_used}>
                    <InputLabel>New Or Used</InputLabel>
                    <Select {...register("new_or_used", { required: true })} id={"new_or_used"}>
                        <MenuItem value="new">New</MenuItem>
                        <MenuItem value="used">Used</MenuItem>
                        <MenuItem value="new_or_used">New Or Used</MenuItem>
                    </Select>
                </FormControl>

                <FormControl fullWidth sx={{mt: 3}} error={errors?.year_low}>
                    <InputLabel>Year Minimum</InputLabel>
                        <Select defaultValue={"any"} {...register("year_low", { required: true })} id={"year_low"}>
                            <MenuItem value="any" defaultValue>Any</MenuItem>
                            {yearLows.map(function(year) {
                                return <MenuItem value={year} key={year}>{year}</MenuItem>
                            })}
                        </Select>

                </FormControl>

                <FormControl fullWidth sx={{mt: 3}}  error={errors?.year_high}>
                    <InputLabel>Year Maximum</InputLabel>

                        <Select defaultValue={"any"} {...register("year_high", { required: true })} id={"year_high"}>
                            <MenuItem value="any">Any</MenuItem>
                            {yearHighs.map(function(year) {
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

                <FormControl fullWidth sx={{mt: 3}} error={errors?.engine_type}>
                    <InputLabel>Engine Type</InputLabel>
                        <Select {...register("engine_type", { required: true })} id={"engine_type"}>
                            <MenuItem value="gasoline">Gasoline</MenuItem>
                            <MenuItem value="hybrid">Hybrid</MenuItem>
                            <MenuItem value="plugin_hybrid">Plugin Hybrid</MenuItem>
                            <MenuItem value="electric">Electric</MenuItem>
                            <MenuItem value="diesel">Diesel</MenuItem>
                            <MenuItem value="any">Any</MenuItem>
                        </Select>
                </FormControl>

                <MultiSelect name={'exterior_colors'} label={'Preferred Exterior Colors'} control={control} options={Object.keys(exteriorColors).map(exteriorColor => {return { "id": exteriorColor, "name": exteriorColors[exteriorColor] }} )}/>

                <MultiSelect name={'interior_colors'} label={'Preferred Interior Colors'} control={control} options={Object.keys(interiorColors).map(interiorColor => {return { "id": interiorColor, "name": interiorColors[interiorColor] }} )}/>

                <Button type="submit" variant="outlined" sx={{mt: 1}} fullWidth>Next</Button>

            </form>
        </>
    );
};
