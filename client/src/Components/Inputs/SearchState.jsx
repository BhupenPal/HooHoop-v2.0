import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { states } from '../../assets/data/carTypes'

function SearchState({ label, width, handleChange,value }) {
	// const [state, setState] = useState()
	// const history = useHistory()
// 	const handleChange = e => {
// 		setState(e.target.value)
// 		history.push(`/buy-car?search=${e.target.value}`)
//   }
  
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