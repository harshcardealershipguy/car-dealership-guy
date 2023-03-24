import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {Button, FormControl, InputLabel, MenuItem, Select, Typography} from "@mui/material";
import MultiSelect from "@/components/Form/MultiSelect";
import {makesModels} from "@/data/makesModels";
import {exteriorColors} from "@/data/exteriorColors";
import {interiorColors} from "@/data/interiorColors";
import {importantFeatures} from "@/data/importantFeatures";

export const Page2No = ({goToPage}) => {
    const [state, setState] = useState({});
    const {
        control,
        reset,
        handleSubmit,
        register,
        watch,
        formState: { errors },
    } = useForm({ defaultValues: state, mode: "onSubmit" });

    const saveData = (data) => {
        setState({ ...state, ...data });

        goToPage('timing');
    };

    useEffect(() => {
        reset({ multipleSelect: [] });
        console.log(state);
        //TODO: save to DB
        //TODO: go to the next page
    }, [state])

    return (
        <>
            <Typography fontWeight={'bold'} variant={'h3'} sx={{mt: 3}}>Vehicle Details</Typography>
            <Typography sx={{mb: 3}}>We'll ask you some simple questions to better understand what types of vehicles would fit what you're looking for.</Typography>

            <form onSubmit={handleSubmit(saveData)}>

                <FormControl fullWidth error={errors?.new_or_used}>
                    <InputLabel>New Or Used</InputLabel>
                    <Select {...register("new_or_used", { required: true })} id={"new_or_used"}>
                        <MenuItem value="new">New</MenuItem>
                        <MenuItem value="used">Used</MenuItem>
                        <MenuItem value="new_or_used">New Or Used</MenuItem>
                    </Select>
                </FormControl>

                <FormControl fullWidth sx={{mt: 3}} error={errors?.body_style}>
                    <InputLabel>Body Style</InputLabel>
                    <Select {...register("body_style", { required: true })} id={"body_style"}>
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

                <FormControl fullWidth sx={{mt: 3}} error={errors?.size}>
                    <InputLabel>Size</InputLabel>
                    <Select {...register("size", { required: true })} id={"size"}>
                        <MenuItem value="compact">Compact</MenuItem>
                        <MenuItem value="small">Small</MenuItem>
                        <MenuItem value="medium">Medium</MenuItem>
                        <MenuItem value="large">Large</MenuItem>
                        <MenuItem value="any">Any</MenuItem>
                    </Select>
                </FormControl>

                <MultiSelect name={'makes'} label={'Preferred Makes'} control={control} options={Object.keys(makesModels).map(make => {return { "id": make, "name": make }} )}/>

                <MultiSelect name={'exclude_makes'} label={'Makes to Exclude'} control={control} options={Object.keys(makesModels).map(make => {return { "id": make, "name": make }} )}/>

                <MultiSelect name={'exterior_colors'} label={'Preferred Exterior Colors'} control={control} options={Object.keys(exteriorColors).map(exteriorColor => {return { "id": exteriorColor, "name": exteriorColors[exteriorColor] }} )}/>
                <MultiSelect name={'interior_colors'} label={'Preferred Interior Colors'} control={control} options={Object.keys(interiorColors).map(interiorColor => {return { "id": interiorColor, "name": interiorColors[interiorColor] }} )}/>

                <MultiSelect name={'important_features'} label={'Important Features'} control={control} options={importantFeatures.map(importantFeature => {return { "id": importantFeature, "name": importantFeature }} )}/>

                <Button type="submit" variant="outlined" sx={{mt: 1}} fullWidth>Next</Button>
            </form>
        </>
    );
};
