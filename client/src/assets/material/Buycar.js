export default BuyCar => ({
    pageDefault: {
        minHeight: "100vh",
        padding:"0 5%",
        backgroundColor:"#F4F6F8",
        [BuyCar.breakpoints.down('md')]: {
            padding:"0",

        }
    },
    cardContainer:{
        display:"flex",
        minWidth:320,
    },
    rootCard: {
        width: "320px",
        height:"auto",
        borderRadius: 5,
        margin: BuyCar.spacing(2,2,2,2),
        backgroundColor:"#fff",
        display:"flex",
        flexDirection:"column",
        [BuyCar.breakpoints.down('md')]: {
            width: "100%",
        }

    },

    media: {
        height: 0,
        paddingTop: '50%', // 16:9
    },
    cardTitle:{
        fontWeight: 600,
        fontSize: 18,
        letterSpacing:"1px"
        //lineHeight: 24
    },
    cardSubTitle:{
        fontWeight: 500,
        fontSize: 14,
    },
    cardContent:{
        flex:1,
        padding: "1rem",
        display:"flex",
        flexDirection:"column"
    },
    LocationIcon:{
        padding: "0rem"
    },
    cardAmount:{
        flex:1
    },
    cardLocation:{
        textAlign:"right",
        fontWeight:"500 !important",
        fontSize:16
    },
    iconCirclePrimary: {
        backgroundColor: "#F5F5F5",
        color: "#333333",
        width: BuyCar.spacing(6),
        height: BuyCar.spacing(6),
        margin: BuyCar.spacing(0,2,0.5,2),
        cursor: "Pointer"
    },
    iconSpacing: {
        height: BuyCar.spacing(3.5),
        width: BuyCar.spacing(3.5)
    },
    typoBold: {
        fontWeight: 900,
        flex:1,
    },
    typoSmall: {
        fontSize: "0.8rem",
        textAlign: 'center'
    },
    
    viewDetails:{
        borderRadius: 8,
        display:"block"
    },
    gButton:{
        background: 'linear-gradient(201.33deg, #E85513 1.75%, #FABF01 97.05%)',
        color: '#fff',
        height: 30,
        borderRadius: 5,
        padding: "1.5rem 4rem",
        width: "max-content",
        margin: '1rem 0',
        fontSize: "1.2rem",
        fontWeight: "bold",
    },
    textField: {
        width: '90%',
        borderRadius: "5px"
      },
    marginInput: {
        margin: BuyCar.spacing(4, 0, 1, 0),
    },
    inputLabel: {
        transform: "translate(14px, 15px)"
    },
    rootfilter:{
        width: "100%",
        backgroundColor: "#fff"
    },
    expandedFilter:{
       // maxHeight: "15rem",
        minHeight: "15rem",
        overflow: "auto"
    },
})