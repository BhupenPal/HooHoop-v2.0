import React, { useEffect } from "react";
import { withStyles, Paper, Grid, Typography } from "@material-ui/core";
import styles from '../../assets/material/FooterPages';
import classNames from 'classnames'


const CancellationPolicy = (props) => {
    const { classes } = props;
    useEffect(() => {
        document.documentElement.scrollTop = 0;
    },[])
    return (
        <Grid container component='main' xs={12} className={classNames(classes.root, classes.marginBT90)}>
            <Grid item xs={12}>
                <Typography variant='h1'>
                    Cancellation Policy
                </Typography>
                <Typography variant="h3" className={classes.updateNotice}>Last Updated on 19 January 2020</Typography>
                <Typography>
                    HooHoop requires advance notice if you need to cancel or amend your Pre-Purchase Inspection booking. Cancellations made before 4pm on the Business Day prior to the Pre-Purchase Assessment booking will receive a full refund less our $10 admin fee. There will be no refund should a cancellation occur after 4pm on the business day prior, or if the vehicle is not brought to the booked site.
                </Typography>
                <br/>
                <Typography>
                    To cancel your booking (before 4pm on the Business Day prior) and arrange your refund, please email us at info@hoohoop.co.nz (or call us on 0211143347). To amend your booking to a different time at the same testing station, liaise directly with the HooHoop branch where the Pre-Purchase Assessment is booked.
                </Typography>
                <br/>
                <Typography>
                    A Business Day refers to Monday to Friday and does not include Saturday, Sunday and Public holidays. HooHoop reserves the right to change or move your booking due to any unforeseen circumstances.
                </Typography>
            </Grid>
        </Grid>
    )
};

export default withStyles(styles, { withTheme: true })(CancellationPolicy);