export default theme => ({
    SliderDiv: {
        minHeight: '20vh',
        position: 'relative'
    },
    SliderImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        objectFit: 'cover',
        zIndex: -10
    },
    SliderContent: {
        color: '#fff',
        margin: '10%'
    },
    SliderHighlight: {
        color: '#EC7E35 !important'
    },
    SliderText: {
        fontSize: '3rem',
        fontWeight: '900',
        [theme.breakpoints.down('md')]: {
            fontSize: '2rem'
        }
    },
    SliderInput: {
        background: 'rgba(255,255,255,1)',
        color: '#000',
        borderRadius: 5,
        width: '30%',
        margin: '1rem 0 0.2rem 0',
        [theme.breakpoints.down('md')]: {
            width: '80%',
        }
    },
    AdvanceSearchLink: {
        color: '#fff',
        borderBottom: '2px solid #fff'
    },
    AdImage: {
        width: '100%',
        height: 350,
        color: '#fff',
        padding: '5% 10%',
        postion: 'absolute',
        background: 'url(src/assets/img/Home/Advetisement.png)',
        backgroundSize: 'cover',
        [theme.breakpoints.down('md')]: {
            height: '100%'
        }
    },
    AdContent: {
        lineHeight: '1.4em'
    },
    AdButton: {
        background: 'linear-gradient(201.33deg, #E85513 1.75%, #FABF01 97.05%)',
        width: 'auto',
        margin: '1rem 0',
        padding: '0.5rem 2rem'
    }
})