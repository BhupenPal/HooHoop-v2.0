import { FormControl, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core'
import React from 'react'
import { states } from '../../assets/data/carTypes'

const useStyles = makeStyles(theme => ({
	input: {
    width: '100%',
    background: 'rgba(255,255,255,1)',
		borderRadius: 5,
	// 	border:"1px solid #000",
		
  },	
}))
function SearchState({ label, width, handleChange,value, margin }) {
	const classes = useStyles();
	return (
		<FormControl style={{ width, margin: margin || '0 auto' }}>
			<InputLabel id='search-state-label'>{label}</InputLabel>
			<Select
				id='search-state'
				value={value}
				onChange={handleChange}
				label={label}
				className={classes.input}
				// style={{
				// 	border:"1px solid #000",
				// 	borderRadius: 5
				// }}
			>
				{states.map(state => (
					<MenuItem value={state}>{state}</MenuItem>
				))}
			</Select>
		</FormControl>
	)
}

export default SearchState