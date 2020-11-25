import React from "react";
import { withStyles, Grid, Typography, TextField, Button } from "@material-ui/core";
import styles from '../../assets/material/FooterPages';
import PhoneRoundedIcon from '@material-ui/icons/PhoneRounded';
import LanguageIcon from '@material-ui/icons/Language';
import MailOutlineRoundedIcon from '@material-ui/icons/MailOutlineRounded';

const ContactUS = (props) => {
    const { classes } = props;
    useEffect(() => {
        document.documentElement.scrollTop = 0;
    },[])
    return (
        <Grid container component='main' xs={12} className={classes.root}>
            <Grid item xs={12} className={classes.faqIntro}>
                <Typography variant='h1' align='center'>Contact Us</Typography>
                <Typography align='center'>Reach out to us for further queries</Typography>
            </Grid>
            <Grid container xs={10} spacing={10} className={classes.root}>
                <Grid item container xs={6}>
                    <Grid xs={12}></Grid>
                    <Grid xs={6}>
                        <Typography>ADDRESS</Typography>
                        <Typography>Christchurch Central, Christchurch 8011, New Zealand</Typography>
                    </Grid>
                    <Grid xs={6}>
                        <Typography>PHONE</Typography>
                        <Typography> <PhoneRoundedIcon /> (642) 111 43347</Typography>
                    </Grid>
                    <Grid xs={6}>
                        <Typography>Online Services</Typography>
                        <Typography><LanguageIcon /> www.hoohoop.co.nz</Typography>
                        <Typography><MailOutlineRoundedIcon /> contact@hoohoop.co.nz</Typography>
                    </Grid>
                </Grid>
                <Grid item xs={4}>
                    <Typography>Send us a message</Typography>
                    <form>
                        <TextField
                            InputLabelProps={{ required: false }}
                            label="Full Name"
                            required
                            name="FullName"
                        />
                        <TextField
                            label="Your Email"
                            required
                            name="Email"
                        />
                        <TextField
                            label="Subject"
                            required
                            name="Subject"
                        />
                        <TextField
                            label="Your Message"
                            margin="normal"
                            required
                            name="Msg"
                            rows={4}
                            multiline={true}
                        />
                        <Button
                            type="submit"
                            color="primary"
                        >
                            Login
                        </Button>
                    </form>
                </Grid>
            </Grid>
        </Grid>
    )
};

export default withStyles(styles, { withTheme: true })(ContactUS);