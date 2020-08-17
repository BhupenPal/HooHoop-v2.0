export default BuyCar => ({
    pageDefault: {
        minHeight: "100vh",
    },
    rootCard: {
        minWidth: "345px",
        borderRadius: 8,
        margin: BuyCar.spacing(4,4,4,4),
        height: "max-content"
    },
    media: {
        height: 0,
        paddingTop: '50%', // 16:9
    },
    cardContent:{
        padding: "0.5rem 1rem 1rem 1rem"
    },
    LocationIcon:{
        padding: "0rem"
    },
    iconCirclePrimary: {
        backgroundColor: "#EEF4FF",
        color: "#708DC7",
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
        fontWeight: 900
    },
    typoSmall: {
        fontSize: "0.8rem"
    },
    favoriteIcon: {
        backgroundColor: "transparent",
        border: "1px solid #E85513",
        marginLeft: "2rem",
        '&:hover': {
            backgroundColor: '#E8551310'
        }
    },
    heartIcon: {
        color: "#E85513",
    },
    viewDetails:{
        borderRadius: 8
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
        maxHeight: "15rem",
        minHeight: "15rem"
    },
})