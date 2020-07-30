export default BuyCar => ({
    pageDefault: {
        minHeight: "100vh",
    },
    root: {
        minWidth: "345px",
        borderRadius: 8,
        margin: BuyCar.spacing(4,4,4,4),
        height: "max-content"
    },
    media: {
        height: 0,
        paddingTop: '50%', // 16:9
    },
    iconCirclePrimary: {
        backgroundColor: "#EEF4FF",
        color: "#708DC7",
        width: BuyCar.spacing(6),
        height: BuyCar.spacing(6),
        margin: BuyCar.spacing(0,2,2,2),
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
    }
})