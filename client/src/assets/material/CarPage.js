import { BorderBottom } from "@material-ui/icons";

export default theme =>({
    pageDefault: {
      //  minHeight: "100vh",
        backgroundColor:"#F4F6F8",
        padding:"2rem 10%",
        [theme.breakpoints.down('md')]: {
            padding:"0rem",
        //    margin:"1rem 0",
          }
    },
    sliderImages: { 
      //  height: "90px", 
        width: "10rem", 
        height: "calc(10rem / 16 * 9)", 
        margin: "0 auto",
        borderRadius:5 ,
        boxShadow:"none",
        transition:"box-shadow 0.2s",
        overflow:"hidden",
        cursor:"pointer",
        boxShadow:"2px 5px 1rem rgba(0,0,0,0.2)",

            "&:hover":{
            },
            [theme.breakpoints.down('md')]: {
            width:"8rem"  ,
            height: "calc(8rem / 16 * 9)", 

            }
      },
    boxContainer:{
        backgroundColor:"#fff",
        width:"-webkit-fill-available",
        padding:"1rem",
        margin:"1rem",
        height:"fit-content",
        borderRadius:"5px",
        overflow:"hidden",
        [theme.breakpoints.down('md')]: {
            padding:"1rem",
            margin:"1rem 0",
          }
    },
    aboutIconsContainer:{
        display:"grid",
        gridTemplateColumns:"repeat(4,1fr)",
        justifyContent:"center",
        display:"flex",
        justifyContent:"space-between",
        textAlign:"center",
        margin:"2rem 0 1rem 0",
        
    },
    iconsContainer:{
        display:"grid",
        gridTemplateColumns:"repeat(6,1fr)",
        
        justifyContent:"center",
        textAlign:"center",
        margin:"1rem 0",
        [theme.breakpoints.down('md')]: {
            gridTemplateColumns:"repeat(3,1fr)",
            gridGap:"2rem 0.5rem"
          }
    },
    icon: {
        backgroundColor:"#EEF4FF",
        padding:"1rem",
        borderRadius:"200rem",
        height:"4rem",
        width:"4rem",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        margin:"0 auto"
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

    price:{
        display:"flex",
        alignItems:"center",
        justifyContent:"space-between",
       // paddingRight:"1rem"
    },
    boxText:{
        fontSize:"1.4rem",
        paddingTop:"1rem",
        //margin:"0 1rem"
    },
    sellerDetail:{
        display:"flex",
        width:"100%",
        justifyContent:"space-between",
        fontSize:"1rem",
        margin:"0 0 1rem 0"
    },
    topSpecs:{
        padding:"3rem",
        [theme.breakpoints.down('md')]: {
            padding:"1rem",
        
          }
    },
    border:{
        borderBottom:"1px solid #DDDDDD",
    },
    details:{
        display:"grid",
        gridTemplateColumns:"1fr 1fr",
        gridGap:"0 1rem",
        padding:"1rem",
        overflow:"hidden"
    },
    detailsHeader:{
        padding:"0 1rem",
        cursor:"pointer",
        display: "flex",
        alignItems: "center",
        
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
    detailsContainer:{
        borderTop:"1px solid #DDDDDD",
        margin: "-1rem 1rem",
        [theme.breakpoints.down('md')]: {
            margin: "-1rem 0rem"
        
          }
    },
    description:{
        
        padding:"2rem",
        fontSize:"1rem"
    },
    imagesContainer:{
        padding:"1rem",
        [theme.breakpoints.down('md')]: {
            padding:"0rem",
        
          }
    },
    sellerCard:{
        backgroundColor:"#fff",

        //padding:"1rem",
        margin:"1rem",
        height:"fit-content",
        
        [theme.breakpoints.down('md')]: {
             //padding:"1rem",
             margin:"1rem 0",
          },
        ['&:before']:{
            opacity:0
        }
    },

    sellerHeader:{
        width:"100%",
        fontSize:"1.4rem",
        fontWeight:500,
    },
    buttons360:{
        marginTop:"-4rem",
        position:"absolute",
        display:"flex"
    },
    button360:{
        backgroundColor:"#fff",
        border:"none",
        borderRadius:"10rem",
       height:"3rem",
       width:"3rem",
       display:"flex",
       alignItems:"center",
       justifyContent:"center",
       marginLeft:"1rem",
       cursor:"pointer"
    }
})