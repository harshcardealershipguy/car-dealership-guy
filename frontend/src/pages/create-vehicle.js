import AuthSessionStatus from '@/components/AuthSessionStatus'
import {Grid, MenuItem, Paper, TextField, Typography} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import axios from "@/lib/axios";
import {useRouter} from "next/router";
import AppLayout from "@/components/Layouts/AppLayout";
import DropZone from "@/components/Form/DropZone";
import {useState} from "react";
import update from "immutability-helper";
import UploadFilesService from "@/services/UploadFilesService";
import pLimit from "p-limit";
import SingleSelect from "@/components/Form/SingleSelect";
import {yearLows} from "@/data/years";
import {makesModels} from "@/data/makesModels";

const CreateVehicle = () => {
    const router = useRouter();
    const limit = pLimit(5);

    const schema = yup.object({
        vin: yup.string().required()
            .matches(/^[A-Z0-9]+$/, "Vin must be only letters or digits")
            .min(17, "VIN must be exactly 17 digits")
            .max(17, "VIN must be exactly 17 digits"),
        year: yup.number().required()
            .min(1900, "Year must be greater than 1900")
            .max(2030, "Year must be less than 2030"),
        make: yup.string().required(),
        model: yup.string().required(),
        mileage: yup.number().required(),
        condition: yup.string().required(),
        zip: yup.string().required()
            .matches(/^[0-9]+$/, "Zip must be only digits")
            .min(5, "Zip must be exactly 5 digits")
            .max(5, "Zip must be exactly 5 digits"),
        msrp: yup.number().required(),
        price: yup.number().required(),
        description: yup.string().required()
    });

    const {
        reset,
        handleSubmit,
        register,
        watch,
        formState: { errors },
    } = useForm({resolver: yupResolver(schema), mode: "onSubmit" });
    const make = watch('make');

    const csrf = () => axios.get('/sanctum/csrf-cookie');

    const [isLoading, setIsLoading] = useState(false);
    const [files, setFiles] = useState({});
    const [imageErrors, setImageErrors] = useState([]);

    const saveData = async (data) => {
        setIsLoading(true);
        await csrf();
        try {
            data.images = await uploadFiles();
            if(data.images.length === 0) {
                setImageErrors(['Select at least one image.']);
                setIsLoading(false);
                return;
            }

            await axios
                .post('/api/add-vehicle', data)
                .then(res => res.data)
                .catch((error) => {
                    setIsLoading(false);
                    throw error
                });

            router.push('/dashboard/');
            reset(); // reset form after successful submission
        } catch (e) {
            //TODO: log this error?
            setIsLoading(false);
        }
    };

    const uploadFiles = async (event) => {
        setImageErrors([]);

        Object.keys(files).forEach((fileUuid) => {
            setFiles(prevFiles => update(prevFiles, {
                [fileUuid]: {
                    meta: {
                        progressPercentage: {$set: 0},
                        state: {$set: 'INITIAL'}
                    }
                }
            }));
        })

        //TODO: disable uploading more files

        let promises = Object.keys(files).map((fileUuid) => {
            return limit(() => upload(files[fileUuid], fileUuid));
        });

        return await (async () => {
            return await Promise.all(promises)
                .then((successfulValues) => {
                    return successfulValues;
                })
                .catch((e) => {
                    limit.clearQueue();
                    throw e;
                })
        })();
    }

    const upload = (file, fileUuid) => {
        return UploadFilesService.upload(file.fileData, (event) => {
            const percent = Math.round((100 * event.loaded) / event.total);

            setFiles(prevFiles => update(prevFiles, {
                [fileUuid]: { meta: {
                        progressPercentage: { $set: percent }
                    }
                }
            }));
        }).then((response) => {
            setFiles(prevFiles => update(prevFiles, {
                [fileUuid]: { meta: {
                        uploadedUrl: {$set: response.data}
                    }
                }
            }));
            return response.data;
        }).catch((error) => {
            setFiles(prevFiles => update(prevFiles, {
                [fileUuid]: { meta: {
                        state: {$set: 'ERROR'}
                    }
                }
            }));

            setImageErrors(prevImageErrors =>
                [ ...prevImageErrors, "Could not upload the file: " + file.fileData.name + '. Remove it and retry.'])
            throw error;
        });
    }

    return (
        <AppLayout>
            <Grid container justifyContent="center">
                <Grid item xs={5}>

                    <Paper elevation={0} sx={{px: 4, pb: 4, pt: 1, mt: 2}}>

                        {/* Session Status */}
                        <AuthSessionStatus className="mb-4" />

                        <Typography variant={'h4'} fontWeight={'bold'} sx={{mt: 3}}>List a Vehicle</Typography>
                        <Typography variant={'subtitle1'} color="gray" sx={{mb: 3}}>List a vehicle in our inventory. All vehicles will be reviewed by our team to ensure a great experience for our customers.</Typography>

                        <form onSubmit={handleSubmit(saveData)}>
                            <TextField {...register("vin")} variant="outlined" label="VIN" error={!!errors?.vin} helperText={errors?.['vin']?.message} fullWidth />

                            <SingleSelect id={'year'} label={'Year'} defaultValue={''} errors={errors} register={register} sx={{mt: 3}}>
                                {yearLows.map(function(year) {
                                    return <MenuItem value={year} key={year}>{year}</MenuItem>
                                })}
                            </SingleSelect>

                            <SingleSelect id={'make'} label={'Make'} defaultValue={''} errors={errors} register={register} sx={{mt: 3}}>
                                {Object.keys(makesModels).map(function(make) {
                                    return <MenuItem value={make} key={make}>{make}</MenuItem>
                                })}
                            </SingleSelect>

                            <SingleSelect id={'model'} label={'Model'} defaultValue={''} errors={errors} register={register} sx={{mt: 3}}>
                                {makesModels[make] && Object.keys(makesModels[make]).map(function(model) {
                                    return <MenuItem value={makesModels[make][model]} key={makesModels[make][model]}>{makesModels[make][model]}</MenuItem>
                                })}
                            </SingleSelect>

                            <TextField {...register("mileage")} variant="outlined" label="Mileage" error={!!errors?.mileage} fullWidth sx={{mt: 3}} type={'number'} />

                            <TextField {...register("condition")} variant="outlined" label="Condition" error={!!errors?.condition} fullWidth sx={{mt: 3}} />

                            <TextField {...register("zip")} variant="outlined" label="Zip" error={!!errors?.zip} fullWidth sx={{mt: 3}} type={'number'} />

                            <TextField {...register("msrp")} variant="outlined" label="MSRP" error={!!errors?.msrp} fullWidth sx={{mt: 3}} type={'number'} />

                            <TextField {...register("price")} variant="outlined" label="Sale Price" error={!!errors?.price} fullWidth sx={{mt: 3}} type={'number'} />

                            <TextField {...register("description")} variant="outlined" label="Description" error={!!errors?.description} fullWidth sx={{mt: 3}} rows={7} multiline={true} />

                            <DropZone files={files} setFiles={setFiles} imageErrors={imageErrors} isLoading={isLoading}/>

                            <LoadingButton type="submit" variant="contained" sx={{mt: 3}} fullWidth size={'large'} loading={isLoading}>Submit for Review</LoadingButton>
                            {isLoading && <Typography textAlign={'center'} variant={'subtitle2'} color={'gray'}>Submitting...this may take a moment</Typography> }

                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </AppLayout>
    )
}

export default CreateVehicle
