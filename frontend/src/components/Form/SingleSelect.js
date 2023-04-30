import {FormControl, FormHelperText, InputLabel, Select} from "@mui/material";

const SingleSelect = ({ id, label, defaultValue, errors, register, children, fullWidth=true, sx={} }) => (

    <FormControl fullWidth={fullWidth} error={!!errors?.[id]} sx={sx}>
        <InputLabel id={id + '_label'}>{label}</InputLabel>
        <Select labelId={id + '_label'} label={label} {...register(id)} id={id} defaultValue={defaultValue}>
            {children}
        </Select>
        {errors?.[id] && <FormHelperText>{errors?.[id].message}</FormHelperText>}
    </FormControl>
)

export default SingleSelect
