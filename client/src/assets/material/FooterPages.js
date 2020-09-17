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
        background:'unset'
    },
    circle: {
        backgroundColor: '#FFFFFF', 
        border: "2px solid black",
        height: 140,
        width: 140,
        borderRadius: 7000,
        marginTop: 65,
        marginBottom: 18,
        display:"flex",
        justifyContent:'center',
        alignItems:'center',

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
    },
    whoText: {
        width: '80%',
        fontSize: 18,
        marginTop: '5vh',
        fontWeight: 600,
        margin: 'auto',
        color:"#666666"
    },

    //FAQ
    faqIntro: {
        height: 375,
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
        //backgroundColor: '#EEEEEE',
        background:"url('src/assets/img/FooterPages/faq_bg.svg')",
        backgroundSize:'cover',
        backgroundPositionY: "65%",
        position: 'relative',
        color:"#ffffff"
    },
    faqHeading: {
        fontSize:"4rem"
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
        backgroundColor: '#005195 !important',
        borderRadius: 30,
        cursor: 'pointer'
    }
});
