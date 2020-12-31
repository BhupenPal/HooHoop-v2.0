import { FormControl, InputLabel, makeStyles, MenuItem, Select } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(0, 1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: 10,
  },
}));
function SortBy({options, handleChange, sortBy}) {
  const classes = useStyles();

  const renderSelectBox = () => {
    return (
      <FormControl className={classes.formControl}>
      <Select
        labelId="demo-simple-select-required-label"
        id="demo-simple-select-required"
        value={sortBy}
        onChange={handleChange}
        variant="standard"
        className={classes.selectEmpty}
      >
        {/* <MenuItem value="">
          <em>None</em>
        </MenuItem> */}
        {
          options.map((value) => (
            <MenuItem value={value}>{value}</MenuItem>
          ))
        }
      </Select>
    </FormControl>
    )
  }
  return (
    <>
      <div>Sort by : </div>
      <div>{renderSelectBox()}</div>
    </>
  );
}

export default SortBy;
