import React from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

const FormControlSelect = ({ id, value, onChange, menuItems, label }) => {
	return (
		<>
			<FormControl fullWidth>
				<InputLabel id={`${id}-label`}>{label}</InputLabel>
				<Select labelId={`${id}-select-label`} id={`${id}-select`} value={value} label={label} onChange={onChange}>
					{menuItems &&
						menuItems.map(mi => (
							<MenuItem
								key={mi.value} //not a good practice to have only a string as a key but.. for this demo it's faster
								value={mi.value}>
								{mi.name}
							</MenuItem>
						))}
				</Select>
			</FormControl>
		</>
	);
};

export default FormControlSelect;
