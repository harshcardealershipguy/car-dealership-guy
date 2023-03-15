import { useForm } from "react-hook-form";


import {Field} from "@/components/CreateVehicleRequest/Field";
import {useEffect, useState} from "react";

export const Page2Yes = ({goToPage}) => {
    const yearLows = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023];
    const yearHighs = [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];
    const makes = {
        toyota: {
            name: "Toyota",
            models: {
                camry: {name: "Camry", trims: ['CE', 'LE']},
                corolla: {name: "Corolla", trims: ['CE', 'LE', 'XLE']}
            },
        },
        honda: {
            name: "Honda",
            models: {
                accord: {name: "Accord", trims: ['LX', 'EX']},
                civic: {name: "Civic", trims: ['LX', 'EX', 'EX-L']}
            }
        }
    };

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
            <fieldset>
                <legend>Page 2</legend>

                <Field label="New Or Used" error={errors?.new_or_used}>
                    <select {...register("new_or_used", { required: true })} id={"new_or_used"}>
                        <option value="new">New</option>
                        <option value="used">Used</option>
                        <option value="new_or_used">New Or Used</option>
                    </select>
                </Field>

                <Field label="Year Minimum" error={errors?.year_low}>
                    <select defaultValue={"any"} {...register("year_low", { required: true })} id={"year_low"}>
                        <option value="any" defaultValue>Any</option>
                        {yearLows.map(function(year) {
                            return <option value={year} key={year}>{year}</option>
                        })}
                    </select>
                </Field>

                <Field label="Year Maximum" error={errors?.year_high}>
                    <select defaultValue={"any"} {...register("year_high", { required: true })} id={"year_high"}>
                        <option value="any">Any</option>
                        {yearHighs.map(function(year) {
                            return <option value={year} key={year}>{year}</option>
                        })}
                    </select>
                </Field>

                <Field label="Make" error={errors?.make}>
                    <select defaultValue={"any"} {...register("make", { required: true })} id={"make"}>
                        <option value="any">Any</option>
                        {Object.keys(makes).map(function(makeId) {
                            return <option value={makeId} key={makeId}>{makes[makeId].name}</option>
                        })}
                    </select>
                </Field>

                <Field label="Model" error={errors?.model}>
                    <select defaultValue={"any"} {...register("model", { required: true })} id={"model"}>
                        <option value="any">Any</option>

                        {makes[make] && Object.keys(makes[make]['models']).map(function(modelId) {
                            return <option value={modelId} key={modelId}>{makes[make]['models'][modelId]['name']}</option>
                        })}
                    </select>
                </Field>

                <Field label="Trim" error={errors?.model}>
                    <select defaultValue={"any"} {...register("trim", { required: true })} id={"trim"}>
                        <option value="any">Any</option>
                        {makes[make] && makes[make]['models'][model] && makes[make]['models'][model]['trims'].map(function(trim) {
                            return <option value={trim} key={trim}>{trim}</option>
                        })}
                    </select>
                </Field>

                <Field label="Engine Type" error={errors?.engine_type}>
                    <select {...register("engine_type", { required: true })} id={"engine_type"}>
                        <option value="gasoline">Gasoline</option>
                        <option value="hybrid">Hybrid</option>
                        <option value="plugin_hybrid">Plugin Hybrid</option>
                        <option value="electric">Electric</option>
                        <option value="diesel">Diesel</option>
                        <option value="any">Any</option>
                    </select>
                </Field>

                <button>Next {">"}</button>
            </fieldset>
        </form>
    );
};
