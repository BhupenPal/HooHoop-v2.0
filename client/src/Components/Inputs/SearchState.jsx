import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { states } from '../../assets/data/carTypes'

function SearchState({ label, width, handleChange }) {
	const [state, setState] = useState()
	const history = useHistory()
// 	const handleChange = e => {
// 		setState(e.target.value)
// 		history.push(`/buy-car?search=${e.target.value}`)
//   }
  
	return (
		<FormControl style={{ width, margin: '0 auto' }}>
			<InputLabel id='demo-simple-select-label'>{label}</InputLabel>
			<Select
				labelId='demo-simple-select-label'
				id='demo-simple-select'
				value={state}
				onChange={handleChange}
			>
				{states.map(state => (
					<MenuItem value={state}>{state}</MenuItem>
				))}
			</Select>
		</FormControl>
	)
}

export default SearchState