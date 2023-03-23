import { useForm } from "react-hook-form";


import {Field} from "@/components/CreateVehicleRequest/Field";
import {useEffect, useState} from "react";
import {Button, FormControl, InputLabel, MenuItem, Select, Typography} from "@mui/material";
import {makesModels} from "@/data/makesModels";
import {interiorColors} from "@/data/interiorColors";
import {exteriorColors} from "@/data/exteriorColors";

export const Page2Yes = ({goToPage}) => {
    const yearLows = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023];
    const yearHighs = [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];

    const [state, setState] = useState({});
    const {
        handleSubmit,
        register,
        watch,
        formState: { errors },
    } = useForm({ defaultValues: state, mode: "onSubmit" });

    const saveData = (data) => {
        setState({ ...state, ...data });

        goToPage('Page3');
    };

    const make = watch('make');
    const model = watch('model');

    useEffect(() => {
        console.log(state);
        //TODO: save to DB
        //TODO: go to the next page

    }, [state])

    return (
        <form onSubmit={handleSubmit(saveData)}>

            <Typography variant="h5" fontWeight={'bold'}>Vehicle Info</Typography>

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

            <FormControl fullWidth sx={{mt: 3}} error={errors?.exterior_colors}>
                <InputLabel>Exterior Colors</InputLabel>
                <Select  defaultValue={'any'} {...register("exterior_colors", { required: true })} id={"exterior_colors"}>
                    {Object.keys(exteriorColors).map(exteriorColorKey => <MenuItem value={exteriorColorKey}>{exteriorColors[exteriorColorKey]}</MenuItem>)}
                </Select>
            </FormControl>

            <FormControl fullWidth sx={{mt: 3}} error={errors?.interior_colors}>
                <InputLabel>Interior Colors</InputLabel>
                <Select defaultValue={'any'} {...register("interior_colors", { required: true })} id={"interior_colors"}>
                    {Object.keys(interiorColors).map(interiorColorKey => <MenuItem value={interiorColorKey}>{interiorColors[interiorColorKey]}</MenuItem>)}
                </Select>
            </FormControl>

            <Button type="submit" variant="outlined" sx={{mt: 1}} fullWidth>Next</Button>

        </form>
    );
};
