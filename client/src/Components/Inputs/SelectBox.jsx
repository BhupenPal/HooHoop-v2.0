import React from "react"
import { InputLabel, MenuItem, FormControl, Select, TextField } from "@material-ui/core"
import { withStyles } from "@material-ui/core/styles"
import styles from "../../assets/material/SellForm"
import { Autocomplete } from "@material-ui/lab"
import { useState } from "react"

const selectBox = (props) => {
  const { classes } = props
  const { data, required, Label, handleChange, name, value, error, type } = props
  const [current, setCurrent] = useState(value || "")

  if (type === "autocomplete") {
    return (
      <Autocomplete
        id={Label}
        options={data}
        onChange={(e, val) => handleChange(name, val)}
        onInputChange={(e, val) => setCurrent(val)}
        name={name}
        inputValue={current}
        getOptionLabel={(option) => option}
        value={value}
        disableClearable
        renderInput={(params) => (
          <TextField
            {...params}
            label={Label}
            value={value}
            required={required}
            error={error}
            variant="outlined"
          />
        )}
      />
    )
  }

  return (
    <FormControl
      size="medium"
      variant="outlined"
      required={required}
      className={classes.formControl}
    >
      <InputLabel id="demo-simple-select-outlined-label">{Label}</InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={value ? value : ""}
        name={name}
        error={error}
        onChange={handleChange}
        label={Label}
      >
        {data.map((val, index) => (
          <MenuItem key={index} value={val}>
            {val}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default withStyles(styles, { withTheme: true })(selectBox)