import { BorderBottom } from "@material-ui/icons";

export default CarPage => ({
    pageDefault: {
      //  minHeight: "100vh",
        backgroundColor:"#F4F6F8",
        padding:"2rem 10%"
    },
    boxContainer:{
        backgroundColor:"#fff",
        width:"-webkit-fill-available",
        padding:"1rem",
        margin:"1rem",
        height:"fit-content"
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
    },
    details:{
        display:"grid",
        gridTemplateColumns:"1fr 1fr",
        gridGap:"0 1rem",
        padding:"1rem 0",
        overflow:"hidden"
    },
    detailsHeader:{
        padding:"0 1rem",
        cursor:"pointer"
    },
    detail:{
        borderBottom:"1px solid #DDDDDD",
        display:"flex",
        justifyContent:"space-between",
        padding:"1rem"
    },
    detailHead:{
        color:"#666666"
    },
    feedback:{
        width:"100%",
    },
    options:{
        border: "1px solid #708DC7",
        color:"#708DC7",
        padding:"0.5rem 1rem",
        borderRadius:"5px",
        marginTop:"1rem"
    }
})