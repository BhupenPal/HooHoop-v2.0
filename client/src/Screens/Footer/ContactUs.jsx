import React, { useEffect } from "react";
import {
  withStyles,
  Grid,
  Typography,
  TextField,
  Button,
  Box,
} from "@material-ui/core";
import styles from "../../assets/material/FooterPages";
import PhoneRoundedIcon from "@material-ui/icons/PhoneRounded";
import LanguageIcon from "@material-ui/icons/Language";
import MailOutlineRoundedIcon from "@material-ui/icons/MailOutlineRounded";
import Recaptcha from "react-recaptcha";
import Banner from "../../assets/img/FooterPages/contact_info.png";

const ContactUS = (props) => {
  const { classes } = props;
  useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, []);
  return (
    <Grid item container component="main" xs={12} className={classes.root}>
      <Grid item xs={12} className={`${classes.contactIntro}`}>
        <Typography variant="h1" className={`${classes.contactHeading}`} align="left">
          Contact Us
        </Typography>
        <Typography style={{fontSize:"1.4rem"}} align="left">
          Reach out to us for further queries
        </Typography>
      </Grid>
      <Grid item container xs={12} md={10} className={classes.root}>
        <Grid item container xs={12} md={6} className={classes.contactContainers}>
          <Grid item xs={12} >
            <img src={Banner} width={"100%"} alt="banner"/>
          </Grid>
          <Grid item xs={12} md={6} className={classes.contactDetails}>
            <Typography className={classes.contactSubHeading}>ADDRESS</Typography>
            <Typography className={classes.contactText}>
              Christchurch Central, Christchurch 8011, New Zealand
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} className={classes.contactDetails}>
            <Typography className={classes.contactSubHeading}>PHONE</Typography>
            <Typography className={classes.contactText}>
              
              <PhoneRoundedIcon /> (642) 111 43347
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} className={classes.contactDetails}>
            <Typography className={classes.contactSubHeading}>Online Services</Typography>
            <Typography className={classes.contactText}>
              <LanguageIcon /> www.hoohoop.co.nz
            </Typography>
            <Typography className={classes.contactText}>
              <MailOutlineRoundedIcon /> contact@hoohoop.co.nz
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} className={classes.contactContainers}>
          <Box  className={classes.contactForm}>
          <Typography className={classes.contactFormHeading}>Send Us a Message</Typography>
          <form>
            <TextField
              label="Full Name"
              required
              name="FullName"
            />
            <TextField label="Your Email" required name="Email" />
            <TextField label="Subject" required name="Subject" />
            <TextField
              label="Your Message"
              required
              name="Msg"
              rows={4}
              multiline={true}
            />
            <div className={classes.captchaContainer}>
            <Recaptcha
              sitekey={process.env.CAPTCHA_KEY_V2}
              render="invisible"
              type="reCAPTCHA v2"
            />
            </div>
            <Button type="submit" className={classes.contactButton}>
              Submit
            </Button>
          </form>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles, { withTheme: true })(ContactUS);
