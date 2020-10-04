import { BorderBottom } from "@material-ui/icons";

export default CarPage => ({
    pageDefault: {
      //  minHeight: "100vh",
        backgroundColor:"#F4F6F8",
        padding:"2rem 10%"
    },
    boxContainer:{
        backgroundColor:"#fff",
        width:"100%",
        padding:"1rem",
        margin:"1rem"
    },
    iconsContainer:{
        display:"flex",
        justifyContent:"space-between",
        textAlign:"center",
        margin:"1rem 0"
    },
    icon: {
        backgroundColor:"#EEF4FF",
        padding:"1rem",
        borderRadius:"200rem",
        height:"4rem",
        width:"4rem",
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    },
    iconText: {
        padding:"1rem 0",
        fontSize:"0.9rem"
    },
    boxHeader:{
        fontSize:"1.4rem",
        paddingBottom:"1rem",
        borderBottom:"1px solid #DDDDDD",
        fontWeight:600,
    },
    boxText:{

        fontSize:"1.4rem",
        paddingTop:"1rem",
    },
    sellerDetail:{
        display:"flex",
        justifyContent:"space-between",
        fontSize:"1rem"
    },
    topSpecs:{
        padding:"3rem",
    },
    border:{
        borderBottom:"1px solid #DDDDDD",
    }
})