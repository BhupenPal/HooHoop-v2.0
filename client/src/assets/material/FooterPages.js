export default (theme) => ({
  //Common
  marginBT90: {
    padding:"5rem 10%",
  },
  leftMargin: {
    marginLeft: "2%",
  },
  updateNotice: {
    color: "#E85513",
    marginBottom: 30,
    fontWeight: 500,
  },
  pointSeprator: {
    marginBottom: 10,
    marginTop: 30,
  },

  //About us
  root: {
    margin: "0 auto",
    display: "flex",
    justifyContent: "center",
    background: "unset",
    backgroundColor:"#F4F6F8",
  },
  unsetBg: {
    background: "#F4F6F8 !important",
  },
  circle: {
    backgroundColor: "#FFFFFF",
    border: "2px solid black",
    height: 140,
    overflow:"hidden",
    width: 140,
    backgroundSize:"cover",
    borderRadius: 7000,
    marginTop: 65,
    marginBottom: 18,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  compText: {
    width: 180,
  },
  allCen: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  whoImage: {
    width: "80%",
    height: 300,
    margin: "0 auto",
    borderRadius: 10,
  },
  whoText: {
    width: "80%",
    fontSize: 18,
    marginTop: "5vh",
    fontWeight: 600,
    margin: "auto",
    color: "#666666",
  },

  //FAQ
  faqIntro: {
    height: 375,
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    //backgroundColor: '#EEEEEE',
    background: "url('src/assets/img/FooterPages/faq_bg.svg')",
    backgroundSize: "cover",
    backgroundPositionY: "65%",
    position: "relative",
    color: "#ffffff",
  },
  contactIntro: {
    height: 375,
    backgroundColor: "#2D282B",
    background: "url('src/assets/img/FooterPages/contact.png')",
    backgroundSize: "50% 100%",
    backgroundPosition: "right",
    backgroundRepeat: "no-repeat",
    color: "#ffffff",
    padding: "0 10%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    [theme.breakpoints.down('md')]: {
        backgroundSize: "100% 100%",
        height: 200,

    }
  },

  contactHeading: {
    fontSize: "3rem",
    padding: "0.5rem 0",
  },
  contactText: {
    display: "flex",
    alignItems: "center",
    padding: "0.5rem 0 0 0",
    color:"#666666",
    ["& .MuiSvgIcon-root"]: {
      marginRight: "0.5rem",
    },
  },
  contactSubHeading:{
    fontSize:"1.2rem",
    fontWeight:"600",
    textTransform:"uppercase",
    color:"#333333"
  },
  contactDetails:{
    marginBottom:"2rem"
  },
  contactForm:{
    backgroundColor:"#fff",
    padding:"4rem",
    borderRadius:"0.5rem",
    [theme.breakpoints.down('md')]: {
      padding:"2rem 1rem 1rem 1rem",

  }
  },
  contactFormHeading:{
    textAlign:"center",
    fontSize:"1.2rem",
    fontWeight:"600",
    color:"#333333",
    marginBottom:"2rem"
  },
  contactContainers:{
    padding:"5rem 2rem",
    [theme.breakpoints.down('md')]: {
      padding:"1rem",

  }

  },
  contactButton:{
    background:"linear-gradient(201.33deg, #E85513 1.75%, #FABF01 97.05%)",
    color:"#fff"
  },
  captchaContainer:{
    display:"flex",
    justifyContent:"center",
    margin:"1rem 0",
    width:"100%"
  },
  faqHeading: {
    fontSize: "4rem",
    fontWeight: "600 !important",
  },
  circleArrow: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    width: 60,
    position: "absolute",
    bottom: "-30px",
    left: "calc(50% - 30px)",
    backgroundColor: "#005195 !important",
    borderRadius: 30,
    cursor: "pointer",
  },
});
