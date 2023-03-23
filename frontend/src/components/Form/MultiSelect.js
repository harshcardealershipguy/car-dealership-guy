import {Checkbox, FormControl, InputLabel, ListItemText, MenuItem, Select} from "@mui/material";
import {Controller} from "react-hook-form";

const MultiSelect = ({ name, label, control, options, errors }) => (

    <Controller
        control={control}
        name={name}
        defaultValue={[]}
        render={({field: {onChange, value}}) => {
            return (
                <FormControl fullWidth sx={{mt: 3}} error={errors?.size}>
                    <InputLabel>{label}</InputLabel>
                    <Select
                        style={{ width: "100%" }}
                        multiple
                        value={value}
                        onChange={onChange}
                        renderValue={(selected) => {
                            return (
                                selected?.map((option) => options.find(anOption => anOption.id ===option).name).join(", ") ||
                                "Select some options"
                            );
                        }}
                    >
                        {options.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                                <Checkbox checked={value.find(aValue => aValue === option.id) !== undefined} />
                                <ListItemText primary={option.name} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            );
        }}
    />
)

export default MultiSelect
