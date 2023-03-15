import { useForm } from "react-hook-form";


import {Field} from "@/components/CreateVehicleRequest/Field";
import {useEffect, useState} from "react";

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

        goToPage('Page4');
    };

    useEffect(() => {
        console.log(state);
        //TODO: save to DB
        //TODO: go to the next page
    }, [state])

    return (
        <form onSubmit={handleSubmit(saveData)}>
            Page 3
            Timing and Financing Questions

            <br/>
            <button>Next {">"}</button>
        </form>
    );
};
