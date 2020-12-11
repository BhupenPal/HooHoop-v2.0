import React, { useEffect } from "react";
import { withStyles, Paper, Grid, Typography, Card, CardContent } from "@material-ui/core";
import styles from '../../assets/material/FooterPages';
import classNames from 'classnames'
import trust from "../../assets/img/svgs/trust.svg";
import view360 from "../../assets/img/svgs/360.svg";
import timer from "../../assets/img/svgs/timer.svg";
import money from "../../assets/img/svgs/money.svg";
import aboutImg from "../../assets/img/FooterPages/about_us.jpeg";
const AboutUs = (props) => {
    const { classes } = props;
    useEffect(() => {
        document.documentElement.scrollTop = 0;
    },[])
    return (
        <Grid item container component='main' xs={12} className={classNames(classes.root, classes.marginBT90)}>
            <Grid item xs={12}>
                <Typography variant="h3">Why Hoohoop?</Typography>
            </Grid>
            <Grid item container>
                <Grid item xs={6} md={3}>
                    <Card className={classes.root}>
                        <CardContent className={classes.allCen}>
                            <div className={classes.circle}>
                                <img src={trust} alt="Trust" />
                            </div>
                            <Typography align='center' variant='h4'>Trust</Typography>
                            <Typography align='center' variant='h6' className={classes.compText}>
                                Our platforms designed to bring an authentic experience to you, the customer. You stay in control throughout.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6} md={3}>
                    <Card className={classes.root}>
                        <CardContent className={classes.allCen}>
                            <div className={classes.circle}>
                                <img src={view360} alt="360 view" />
                            </div>
                            <Typography align='center' variant='h4'>360 View</Typography>
                            <Typography align='center' variant='h6' className={classes.compText}>
                                Our latest technology leaves no angle unturned and gives clear, concise and a quality viewing experience online.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6} md={3}>
                    <Card className={classes.root}>
                        <CardContent className={classes.allCen}>
                            <div className={classes.circle}>
                            <img src={money} alt="Save Money" />

                            </div>
                            <Typography align='center' variant='h4'>Save Money</Typography>
                            <Typography align='center' variant='h6' className={classes.compText}>
                                Our online negotiator robot is formulated to give you the best deal possible. No pressure from salesman!
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6} md={3}>
                    <Card className={classes.root}>
                        <CardContent className={classes.allCen}>
                            <div className={classes.circle}>
                            <img src={timer} alt="Save Time" />

                            </div>
                            <Typography align='center' variant='h4'>Save Time</Typography>
                            <Typography align='center' variant='h6' className={classes.compText}>
                               Our virtual experience gives you the closest online experience to reality. Browse comfortably from your own home.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            
            <Typography variant="h3" align='center' style={{ margin: '65px 0 100px 0',color:"#E85513" }}>
                We dont sell vehicles here at Hoohoop, we promote stress free, joyful trading
            </Typography>

            <Grid item container>
                <Grid item xs={12} md={6}>
                    <Typography variant='h3'>Who are we?</Typography>
                    <Typography className={classes.whoText}>
                        HooHoop is not the seller of the vehicle, but instead is the ‘middle man’ to help support both potential buyer and sellers. You can look at us as the building the trust in the relationship! HooHoop is the first company in NZ to offer this 360 virtual experience and by doing so saves plenty of time, so you can browse in front of your screen at home without any external pressure.
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <img src={aboutImg} className={classes.whoImage}/>
                </Grid>
            </Grid>
            <Grid item xs={12} style={{ marginTop: 90 }}>
                <Typography variant="h3" align="left">Meet our team</Typography>
            </Grid>
            <Grid item container xs={12}>
                <Grid item xs={6} sm={4}>
                    <Card className={classes.root}>
                        <CardContent className={classes.allCen}>
                            <div className={classes.circle}></div>
                            <Typography align='center' variant='h4'>Mana</Typography>
                            <Typography align='center'>CEO, Founder</Typography>
                            <Typography align='center' variant='h6' className={classes.compText}>
                                Mana is passionate in this field and is driven to help clients achieve the outcomes they desire.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6} sm={4}>
                    <Card className={classes.root}>
                        <CardContent className={classes.allCen}>
                            <div className={classes.circle}></div>
                            <Typography align='center' variant='h4'>Leighton</Typography>
                            <Typography align='center'>Head of Marketing</Typography>
                            <Typography align='center' variant='h6' className={classes.compText}>
                            Leighton brings experience in a social media capacity having been part of the success to Canterbury Weather Updates.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Card className={classes.root}>
                        <CardContent className={classes.allCen}>
                            <div className={classes.circle}></div>
                            <Typography align='center' variant='h4'>Paul Skene</Typography>
                            <Typography align='center'>Head of Marketing</Typography>
                            <Typography align='center' variant='h6' className={classes.compText}>
                            Paul brings in-depth knowledge and experience as the current owner of all Pit Stop branches in Christchurch.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default withStyles(styles, { withTheme: true })(AboutUs);
