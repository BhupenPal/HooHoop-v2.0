import React from "react";
import { withStyles, Grid, Typography, Divider } from "@material-ui/core";
import styles from '../../assets/material/FooterPages';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const FAQ = (props) => {
    const { classes } = props;
    return (
        <Grid container component='main' className={classes.root}>
            <Grid item xs={12} className={classes.faqIntro} >
                <Typography variant='h2' className={classes.faqHeading}  align='center'>We are here to help you</Typography>
                <Typography align='center'>Browse through the most frequently asked questions</Typography>
                <div className={classes.circleArrow}>
                    <KeyboardArrowDownIcon />
                </div>
            </Grid>
            <Grid item xs={12} sm={8} className={classes.marginBT90}>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.heading}>What is hoohoop?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            In a nutshell, Hoohoop is an online marketplace purpose designed for Kiwi’s to make the selling and buying process of cars more simplistic and transparent, therefore giving you the confidence you deserve with your asset and investment!
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Divider />
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography className={classes.heading}>How are we different than other players in the New Zealand Market?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Our passion for creating an honest platform with 100% transparency to efficiently buy and sell vehicles is what differentiates us from others. By providing our 360 virtual tour, you are able to get a great feel for the vehicle. The clarity and different angles you can access allows you to check for any internal or external damage, there is nowhere to hide! 
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Divider />
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3a-content"
                        id="panel3a-header"
                    >
                        <Typography className={classes.heading}>How easy it is to list my car with HooHoop?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                        Easily done! Simply head along to the ‘Sell Your Car’ section of our website and complete the following steps below: 
                        <ul>
                          <li>Enter your vehicle number plate</li>
                          <li>Fill in all the details regarding your vehicle from our user friendly form.</li>
                          <li>At the bottom of the form, request a 360 virtual service</li>
                          <li>Your car will be listed once the virtual experience has been created.</li>
                        </ul>
                        <span>NB: There is a small fee associated with the listing of your vehicle.</span>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Divider />
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel4a-content"
                        id="panel4a-header"
                    >
                        <Typography className={classes.heading}>Is it mandatory to request the 360 virtual experience to be created for your vehicle?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Yes and there is a couple of main reasons for this. We only list vehicles that have this completed because we are about promoting authenticity and confidence to the potential buyer, but this also increases the chance of a purchase for the seller. It is important that the customer gets to have a ‘real life’ experience and that the seller gets their vehicle promoted to a high standard. 
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Divider />
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel5a-content"
                        id="panel5a-header"
                    >
                        <Typography className={classes.heading}>How are we different than other players in the New Zealand Market?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Our passion for creating an honest platform with 100% transparency to efficiently buy and sell vehicles is what differentiates us from others. By providing our 360 virtual tour, you are able to get a great feel for the vehicle. The clarity and different angles you can access allows you to check for any internal or external damage, there is nowhere to hide!
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Divider />
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel6a-content"
                        id="panel6a-header"
                    >
                        <Typography className={classes.heading}>What types of cars can be listed on HooHoop.co.nz?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            There are no restrictions regarding listing any sort of cars, in which are available in New Zealand. You can even list: Hatchback, Sedan, MPV, SUV, Crossover, Coupe, and even convertibles on the website. 
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Divider />
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel7a-content"
                        id="panel7a-header"
                    >
                        <Typography className={classes.heading}>How to make an online payment; do you save our credit/debit card details?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            You can pay online using any credit/debit, visa or master-card. Internet banking is also available if this suits your needs. We do not save any information about your card; and all the information processed is fully encrypted.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Divider />
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel8a-content"
                        id="panel8a-header"
                    >
                        <Typography className={classes.heading}>What if I want to know more about the car?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            We request and ask the seller when they are going through the process of uploading the details to provide a holistic overview of what the buyer would be looking to see, so when complete these details are available in the public domain. If you need additional details; you can make a query from the car description page directly to the car owner to seek clarification if required.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Divider />
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel9a-content"
                        id="panel9a-header"
                    >
                        <Typography className={classes.heading}>Can I take a test drive of the car?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Why not? Seeing is believing! We encourage you to take a test drive by requesting for a test drive directly from the website. You can determine a convenient schedule that works for both parties to take the car for a spin!
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Divider />
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel10a-content"
                        id="panel10a-header"
                    >
                        <Typography className={classes.heading}>What is your selling plan refund policy?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            For refund policy please visit <a href="/privacy-policy">Privacy Policy</a>.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Divider />
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel11a-content"
                        id="panel11a-header"
                    >
                        <Typography className={classes.heading}>How do I get in touch with HooHoop?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            You can call us on <a href="tel:021-114-3347">(021) 114-3347</a> or email us at <a href="mailto:info@hoohoop.co.nz" target="__blank">info@hoohoop.co.nz</a>
                            <br/>
                            Alternatively, you can contact us through private message on our HooHoop Facebook Page.
                            <br/>
                            or, just simply send us your query through our <a href="/contact-us">Contact Us</a> page.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </Grid>
        </Grid>
    )
};

export default withStyles(styles, { withTheme: true })(FAQ);