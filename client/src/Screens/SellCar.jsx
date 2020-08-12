import React from "react";
import { withStyles, Paper, Grid, Typography, Card, CardContent } from "@material-ui/core";
import styles from '../assets/material/FooterPages';
import classNames from 'classnames'

const SellCar = (props) => {
    const { classes } = props;
    return (
        <Grid item container component='main' xs={10} className={classNames(classes.root, classes.marginBT90)}>
            <Grid item xs={12}>
                <Typography variant="h3">Why Hoohoop?</Typography>
            </Grid>
            <Grid item container>
                <Grid item xs={6} md={3}>
                    <Card className={classes.root}>
                        <CardContent className={classes.allCen}>
                            <div className={classes.circle}></div>
                            <Typography align='center' variant='h4'>Trust</Typography>
                            <Typography align='center' variant='h6' className={classes.compText}>
                                Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6} md={3}>
                    <Card className={classes.root}>
                        <CardContent className={classes.allCen}>
                            <div className={classes.circle}></div>
                            <Typography align='center' variant='h4'>360 View</Typography>
                            <Typography align='center' variant='h6' className={classes.compText}>
                                Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6} md={3}>
                    <Card className={classes.root}>
                        <CardContent className={classes.allCen}>
                            <div className={classes.circle}></div>
                            <Typography align='center' variant='h4'>Save Money</Typography>
                            <Typography align='center' variant='h6' className={classes.compText}>
                                Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6} md={3}>
                    <Card className={classes.root}>
                        <CardContent className={classes.allCen}>
                            <div className={classes.circle}></div>
                            <Typography align='center' variant='h4'>Save Time</Typography>
                            <Typography align='center' variant='h6' className={classes.compText}>
                                Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            
            <Typography variant="h3" align='center' style={{ margin: '65px 0 100px 0' }}>
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
                    <div className={classes.whoImage}>

                    </div>
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
                                Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis
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
                                Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis
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
                                Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default withStyles(styles, { withTheme: true })(SellCar);
