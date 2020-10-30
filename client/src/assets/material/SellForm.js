export default (SellForm) => ({
  pageDefault: {
    minHeight: "100vh",
  },
  APIGrid: {
    // height: "40rem",
    position: "relative",
    backgroundColor: "#000000",
    display: "flex",
    "&:*": {
      zIndex: 1,
    },
  },
  backgroundImg: {
    position: "absolute",
    objectFit: "contain",
    objectPosition: "center",
    height: "100%",
    width: "80vw",
    zIndex: 0,
    left: 0,
    right: 0,
    margin: "0 auto",
    [SellForm.breakpoints.down("md")]: {
      width: "90vw",
    },
  },
  ApiEncloser: {
    margin: "0 auto",
    padding: SellForm.spacing(4, 0, 4, 0),
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  ContainerType_one: {
    backgroundColor: "#ffffffe5",
    borderRadius: "5px",
    height: "max-content",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: SellForm.spacing(2, 3, 2, 3),
    margin: SellForm.spacing(3, 0, 0, 0),
    width: "100%",
    zIndex: "1",
  },
  Horizontal: {
    width: "8rem",
    height: "0.01rem",
    border: "none",
    backgroundColor: "#000000",
    margin: SellForm.spacing(0, 1, 0, 1),
  },
  FormGrid: {
    margin: SellForm.spacing(15, 0, 15, 0),
  },
  FromFetch: {
    margin: SellForm.spacing(8, 0, 8, 0),
  },
  LoginButton: {
    background: "linear-gradient(201.33deg, #E85513 1.75%, #FABF01 97.05%)",
    color: "#fff",
    borderRadius: 5,
    padding: SellForm.spacing(1.2, 10, 1.2, 10),
    width: "max-content",
    fontSize: "1rem",
    margin: "4rem 0 0 0",
    transition: "0.2s",
    "&:active": {
      transform: "scale(0.95)",
    },
    "&:disabled":{
      background: "#eee",

    }
  },
});
