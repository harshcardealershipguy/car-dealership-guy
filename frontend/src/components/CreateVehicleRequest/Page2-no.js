import { useForm } from "react-hook-form";


import {Field} from "@/components/CreateVehicleRequest/Field";
import {useEffect, useState} from "react";

export const Page2No = ({goToPage}) => {
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

    useEffect(() => {
        console.log(state);
        //TODO: save to DB
        //TODO: go to the next page
    }, [state])

    return (
        <form onSubmit={handleSubmit(saveData)}>
            Page 2 No Flow

            <button>Next {">"}</button>
        </form>
    );
};
