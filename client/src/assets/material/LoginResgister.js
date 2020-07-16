export default theme => ({
    heading: {
        fontSize: "2.25rem",
        fontWeight: 600,
        margin: theme.spacing(4, 0, 2, 0)
    },
    image: {
        backgroundImage: "url(https://source.unsplash.com/random)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center"
    },
    form: {
        width: "100%",
        marginTop: theme.spacing(1)
    },
    submit: {
        height: 40,
        margin: theme.spacing(3, 0, 2, 0)
    },
    tabs: {
        borderBottom: "1px solid #DDDDDD",
        margin: theme.spacing(4, 0, 2, 0)
    },
    split: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    close: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    social: {
        height: 45,
        width: "100%",
        margin: theme.spacing(3, 0, 2, 0)
    },
    controller: {
        margin: theme.spacing(2, 0, 1, 0)
    }
});