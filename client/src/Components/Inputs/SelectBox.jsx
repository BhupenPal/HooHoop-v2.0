import React from 'react';
import {
    InputLabel,
    MenuItem,
    FormControl,
    Select
} from '@material-ui/core'
import { withStyles } from "@material-ui/core/styles";
import styles from '../../assets/material/SellForm'


const selectBox = (props) => {
    const {classes} = props;
    const {data,required,Label,handleChange,name,value,error} = props;

    return(
    <FormControl size="medium" variant="outlined" required={required} className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">{Label}</InputLabel>
        <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={value ? value : ''}
        name={name}
        error={error}
        onChange={handleChange}
        label={Label}
        >
        {/* <MenuItem value="">
            <em>None</em>
        </MenuItem> */}
        {
            data.map((val,index) => (<MenuItem key={index} value={val}>{val}</MenuItem>))
        }
        {/* <MenuItem value={props.data}>{props.data}</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem> */}
        </Select>
    </FormControl>
    );
}

export default withStyles(styles, {withTheme: true})(selectBox);