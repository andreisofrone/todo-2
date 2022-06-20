import React from "react";
import Pagination from "@mui/material/Pagination";
import { v4 as generateUid } from "uuid";
import { Grid, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export default props => {
	const { elPerPages, gotoPage, totalPages, currentPage, entriesPerPage, setEntriesPerPage } = props;
	return (
		<div>
			<Grid container alignItems="center" justify="center" direction="row">
				<Grid item xs={2} alignContent="flex-end"></Grid>
				<Grid item xs={8} alignContent="flex-end">
					<Grid container alignItems="right" justify="center">
						<Grid item>
							<Pagination variant="outlined" shape="rounded" onChange={gotoPage} count={totalPages} page={currentPage} />
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={2}>
					<Grid container alignItems="right" justify="center">
						<Grid item>
							<FormControl>
								<InputLabel id="elements-per-page">Show</InputLabel>
								<Select key={entriesPerPage} labelId="show_id" defaultValue={entriesPerPage} onChange={setEntriesPerPage} label="Show" margin="dense">
									{elPerPages.map(el => (
										<MenuItem
											key={generateUid()} //not a good practice to have this generator but.. it's just a demo here
											value={el}>{`${el} entries`}</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</div>
	);
};
