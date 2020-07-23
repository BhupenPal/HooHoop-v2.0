export default theme => ({

    //Common
    marginBT90: {
        marginTop: "90px !important",
        marginBottom: "90px !important"
    },
    updateNotice: {
        color: '#828282',
        marginBottom: 30,
        fontWeight: 500
    },
    pointSeprator: {
        marginBottom: 10,
        marginTop: 30
    },

    //About us
    root: {
        margin: "0 auto",
        display: "flex",
        justifyContent: "center",
    },
    circle: {
        backgroundColor: '#C4C4C4', 
        height: 140,
        width: 140,
        borderRadius: 70,
        marginTop: 65,
        marginBottom: 18
    },
    compText: {
        width: 180
    },
    allCen: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    whoImage: {
        width: '80%',
        height: 300,
        margin: '0 auto',
        borderRadius: 10,
        backgroundColor: '#C4C4C4'
    },
    whoText: {
        width: '80%',
        fontSize: 18,
        marginTop: '5vh',
        fontWeight: 600,
        margin: 'auto'
    },

    //FAQ
    faqIntro: {
        height: 375,
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#EEEEEE',
        position: 'relative'
    },
    circleArrow: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        width: 60,
        position: 'absolute',
        bottom: '-30px',
        left: 'calc(50% - 30px)',
        backgroundColor: '#C4C4C4',
        borderRadius: 30,
        cursor: 'pointer'
    }
});
