import { useForm } from "react-hook-form";


import {Field} from "@/components/CreateVehicleRequest/Field";
import {useEffect, useState} from "react";
import Label from "@/components/Label";
import Input from "@/components/Input";
import InputError from "@/components/InputError";

export const Page4 = ({goToPage}) => {

    const [state, setState] = useState({});
    const {
        handleSubmit,
        register,
        watch,
        formState: { errors },
    } = useForm({ defaultValues: state, mode: "onSubmit" });

    const saveData = (data) => {
        setState({ ...state, ...data });

        goToPage('ThankYouPage');
    };

    useEffect(() => {
        console.log(state);
        //TODO: save to DB
        //TODO: go to the next page

    }, [state])

    return (
        <form onSubmit={handleSubmit(saveData)}>

            <div>
                <Label htmlFor="email">Email</Label>

                {/*TODO: this form needs to be react-hook-form'ed*/}
                <Input
                    id="email"
                    type="email"

                    className="block mt-1 w-full"

                    required
                    autoFocus
                />

                <InputError messages={errors.email} className="mt-2" />

                <button>Submit!</button>
            </div>

        </form>
    );
};
