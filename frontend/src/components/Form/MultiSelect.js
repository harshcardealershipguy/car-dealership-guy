import {Checkbox, ListItemText, MenuItem, Select} from "@mui/material";
import {Controller} from "react-hook-form";

const MultiSelect = ({ name, control, options }) => (

    <Controller
        control={control}
        name={name}
        defaultValue={[]}
        render={({field: {onChange, value}}) => {
            return (
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
            );
        }}
    />
)

export default MultiSelect
