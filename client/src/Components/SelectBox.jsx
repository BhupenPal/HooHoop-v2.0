import React from 'react';
import {
    InputLabel,
    MenuItem,
    FormControl,
    Select
} from '@material-ui/core'
import { withStyles } from "@material-ui/core/styles";
import styles from '../assets/material/SellForm'


const selectBox = (props) => {
    const {classes} = props;
    const [age, setAge] = React.useState('');
      
    const handleChange = (event) => {
      setAge(event.target.value);
    };

    return(
    <FormControl size="medium" variant="outlined" required={props.required} className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">{props.Label}</InputLabel>
        <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={props.data}
        onChange={handleChange}
        label={props.Label}
        >
        <MenuItem value="">
            <em>None</em>
        </MenuItem>
        <MenuItem value={props.data}>{props.data}</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
        </Select>
    </FormControl>
    );
}

export default withStyles(styles, {withTheme: true})(selectBox);