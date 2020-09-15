const Background = require('../img/LoginRegister/bg1.png')

export default theme => ({
    heading: {
        fontSize: "2.25rem",
        fontWeight: 600,
        margin: theme.spacing(4, 0, 2, 0)
    },
    image: {
        backgroundImage: `url(${Background.default})`,
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
        margin: theme.spacing(3, 0, 2, 0),
    },
    active: {

        height: 40,
        margin: theme.spacing(3, 0, 2, 0),
        background: 'linear-gradient(201.33deg, #E85513 1.75%, #FABF01 97.05%)',
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