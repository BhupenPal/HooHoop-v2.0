import { makeStyles } from '@material-ui/core'
import React from 'react'

const useStyle = makeStyles(theme => ({
	root: {
		maxWidth: '8rem'
	},
	icon: {
		backgroundColor: '#EEF4FF',
		padding: '1rem',
		borderRadius: '200rem',
		height: '4rem',
		width: '4rem',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		margin: '0 auto'
	},
	iconText: {
		padding: '0',
		fontSize: '0.9rem'
	},
	title: {
		padding: '1rem 0 0.5rem 0',
		fontSize: 12,
		color: '#333333'
	}
}))

const RoundedIcon = ({ icon, title, content }) => {
	const classes = useStyle()
	return (
		<div className={classes.root}>
			<div className={classes.icon}>
				<img src={icon} alt='icon' />
			</div>
			<div className={classes.title}>{title}</div>
			<p className={classes.iconText}>{content}</p>
		</div>
	)
}

export default RoundedIcon
