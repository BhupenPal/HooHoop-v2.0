import { Button, makeStyles, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
    AdImage: {
        width: '100%',
        height: "100%",
        color:"#fff",
        padding: "5%",
        postion: 'absolute',
        background:"url(/src/assets/img/Home/Advetisement.png)",
        backgroundSize: 'cover',
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"start",
        [theme.breakpoints.down('md')]: {
            height: "100%",
        }
    },
    AdContent:{
        lineHeight:'1.4em',

    },
    AdButton: {
        background: 'linear-gradient(201.33deg, #E85513 1.75%, #FABF01 97.05%)',
        width:'auto',
        margin:"1rem 0",
        padding: "0.5rem 2rem"
    }

}))

function Ad(props) {
    const classes = useStyles();
  return (
    <div className={classes.AdImage}>
      <Typography variant="h2" className={classes.AdContent}>
        Want to get your car listed <br/> at lowest prices?
      </Typography>
      <Button type="submit" color="primary" className={classes.AdButton}>
        Get Started Now
      </Button>
    </div>
  );
}

export default Ad;
