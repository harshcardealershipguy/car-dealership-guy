import { useForm } from "react-hook-form";


import {Field} from "@/components/CreateVehicleRequest/Field";
import {useEffect, useState} from "react";

export const Page1 = ({goToPage}) => {
    const [state, setState] = useState({});
    const {
        handleSubmit,
        register,
        watch,
        formState: { errors },
    } = useForm({ defaultValues: state, mode: "onSubmit" });

    const saveData = (data) => {
        setState({ ...state, ...data });

    };

    useEffect(() => {
        console.log(state);
        //TODO: save to DB

        if(state['exact_vehicle_known'] === 'exact_vehicle_known_yes') {
            goToPage('Page2-yes');
        } else if (state['exact_vehicle_known'] === 'exact_vehicle_known_no') {
            goToPage('Page2-no');
        }
    }, [state])

    return (
        <form onSubmit={handleSubmit(saveData)}>
            <fieldset>
                <legend>Page 1</legend>

                <Field label="Yes" error={errors?.exact_vehicle_known}>
                    <input
                        {...register("exact_vehicle_known", { required: "Exact Vehicle Known is required" })}
                        type="radio"
                        value="exact_vehicle_known_yes"
                        id="exact_vehicle_known_yes"
                    />

                </Field>
                <Field label="No">
                    <input
                        {...register("exact_vehicle_known", { required: "Exact Vehicle Known is required" })}
                        type="radio"
                        value="exact_vehicle_known_no"
                        id="exact_vehicle_known_no"
                    />

                </Field>

                <button>Next {">"}</button>
            </fieldset>
        </form>
    );
};
