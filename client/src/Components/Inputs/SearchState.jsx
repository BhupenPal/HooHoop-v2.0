import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import React from 'react'
import { states } from '../../assets/data/carTypes'

function SearchState({ label, width, handleChange,value }) {
	return (
		<FormControl style={{ width, margin: '0 auto' }}>
			<InputLabel id='search-state-label'>{label}</InputLabel>
			<Select
				id='search-state'
				value={value}
				onChange={handleChange}
				label={label}
			>
				{states.map(state => (
					<MenuItem value={state}>{state}</MenuItem>
				))}
			</Select>
		</FormControl>
	)
}

export default SearchState