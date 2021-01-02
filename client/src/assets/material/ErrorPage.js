export default ErrorPage => ({
	PageDefault: {
		marginTop: '20px',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'center',
		[ErrorPage.breakpoints.down('md')]: {
			padding: 0,
			marginTop: 0
		}
	},
	ErrImg: {
		width: '45vw',
		[ErrorPage.breakpoints.down('md')]: {
			width: '80vw',
		},
		[ErrorPage.breakpoints.down('sm')]: {
			width: '100vw',
		}
	},
	ErrHead: {
		marginTop: '20px',
		fontSize: '40px'
	},
	ErrDescription: {
		marginTop: '20px',
		fontSize: '22px'
	},
	ErrButtonsDiv: {
		marginTop: '20px',
		display:'flex'
	},
	ErrButton: {
		background: 'linear-gradient(201.33deg, #E85513 1.75%, #FABF01 97.05%)',
		color: '#fff',
		fontSize: '22px',
		borderRadius: 5,
		marginRight: '10px'
	},
	ErrButtonWhite: {
		borderRadius: 5,
		fontSize: '22px',
		backgroundColor: '#fff',
		color: '#000',
		border: '1px solid grey',
		marginLeft: '10px'
	}
})