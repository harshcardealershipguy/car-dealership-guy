import {FormControl, FormHelperText, InputLabel, Select} from "@mui/material";

const SingleSelect = ({ id, label, defaultValue, errors, register, children }) => (

    <FormControl sx={{mt: 3}} fullWidth error={errors?.[id]}>
        <InputLabel id={id + '_label'}>{label}</InputLabel>
        <Select labelId={id + '_label'} label={label} {...register(id)} id={id} defaultValue={defaultValue}>
            {children}
        </Select>
        {errors?.[id] && <FormHelperText>{errors?.[id].message}</FormHelperText>}
    </FormControl>
)

export default SingleSelect
