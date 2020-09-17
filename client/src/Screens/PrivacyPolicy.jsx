import React from "react";
import { withStyles, Paper, Grid, Typography } from "@material-ui/core";
import styles from '../assets/material/FooterPages';

const PrivacyPolicy = (props) => {
    const { classes } = props;
    return (
        <Paper>
            <Grid container component="main" justify="center" style={{background:"#F4F6F8"}} className={classes.marginBT90}>
                <Grid item xs={11} sm={10}>
                    <Typography variant="h3">Privacy Policy</Typography>
                    <Typography variant="h4" className={classes.updateNotice}>Last Updated on 19 January 2020</Typography>
                    <Typography>
                        Welcome to www.HooHoop.co.nz (“Website”) and/or HooHoop
                        (“Application”), owned and operated by HooHoop Ltd, having its
                        registered office at 150 Rocking Horse Road, South Shore,
                        Christchurch 8062. We facilitate buying and selling of cars without
                        any hassle. In this terms of use (“Terms of Use”), the Application
                        and the Website are collectively called the “Portal”. Reference to
                        “you” in this Terms of Use refers to the users of the Portal,
                        whether or not you access the services or consummate a transaction
                        on the Portal.
                  </Typography>
                </Grid>
                <Grid item xs={11} sm={10}>
                    <Typography variant="h3" className={classes.pointSeprator}>Users Information and Privacy</Typography>
                    <Typography className={classes.leftMargin}>
                        HooHoop is committed to protecting all the information you share
                        with us. We ensure the privacy of all our users. We follow stringent
                        procedures to help protect the confidentiality, security, and
                        integrity of data stored on our systems. Only those employees who
                        need access to your information in order to perform their duties are
                        allowed such access. Any employee who violates our privacy and/or
                        security policies is subject to disciplinary action, including
                        possible termination and civil and/or criminal prosecution. <br />
                        HooHoop keeps track of your information to offer you the best
                        possible transactional experience. Before completing your
                        transaction, we also ask you for your name, address, phone number
                        and e-mail. This information may be disclosed to specific members of
                        our staff and to select third parties involved in the completion of
                        your transaction and delivery of your order. We or our associate
                        companies may also use your email address to notify you about new
                        services or special promotional programs, or send you offers or
                        information if you have opted-in. Emails are sent only to HooHoop
                        members who have chosen to receive them (opted-in) or who have
                        transacted on our Portal. At any time, you can notify us that you
                        wish to stop receiving these emails. In addition, we keep a record
                        of your transaction(s) and we may also ask you for information
                        regarding your personal preferences and demographics to help us
                        better meet your needs. <br />
                        To remove your profile so that others cannot view it, contact our
                        customer support team at info@HooHoop.co.nz.
                    </Typography>
                </Grid>
                <Grid item xs={11} sm={10}>
                    <Typography variant="h3" className={classes.pointSeprator}>Service Providers</Typography>
                    <Typography className={classes.leftMargin}>
                        HooHoop may use various outside agencies (third party service
                        providers) to make our portal operate. For example, we may use third
                        parties to host our portal, operate various features made available
                        on our portal, send emails, analyse data, provide search results and
                        links, and assist in fulfilling your orders. Some of these third
                        parties may need access to your information in order to make the
                        services provided through our portal work. HooHoop may also share
                        such information with business partners, service vendors, authorized
                        third-party agents or contractors in order to provide a requested
                        service or transaction, including processing orders, processing
                        credit card or debit card or bank transactions or providing customer
                        support. Information will only be disclosed to these service
                        providers on a need-to-know basis, and they will only be permitted
                        to use such information for the purpose of providing the particular
                        services provided by such entities in connection with our portal.
                    </Typography>
                </Grid>
                <Grid item xs={11} sm={10}>
                    <Typography variant="h3" className={classes.pointSeprator}>Exceptions</Typography>
                    <Typography className={classes.leftMargin}>
                        HooHoop may be forced to disclose information in order to comply
                        with a subpoena, court order, administrative or governmental order,
                        or any other requirement of law, or when HooHoop, in its sole
                        discretion, deems it necessary in order to protect our rights or the
                        rights of others, to prevent harm to persons or property, to fight
                        fraud and credit risk, or to enforce or apply our portal terms of
                        use. Personally identifiable information may be transferred as an
                        asset in connection with a merger or sale (including any transfers
                        made as part of an insolvency or bankruptcy proceeding) involving
                        all or part of our business or as part of a corporate
                        reorganization, stock sale, or other change in control.
                    </Typography>
                </Grid>
                <Grid item xs={11} sm={10}>
                    <Typography variant="h3" className={classes.pointSeprator}>General Terms</Typography>
                    <Typography className={classes.leftMargin}>
                        The accuracy and confidentiality of your account information is your
                        responsibility. You are responsible for maintaining the secrecy and
                        accuracy of your password, email address, and other account
                        information (if any provided) at all times. We recommend a strong
                        password that you do not use with other services. We are not
                        responsible for personal data transmitted to a third party as a
                        result of an incorrect email address. Third-Party Websites: Our
                        Portal may contain links to other websites. When you click on one of
                        these links, you are navigating to another website. We do not accept
                        liability for misuse of any information by any website controller to
                        which we may link. We also do not have any responsibility of
                        liability for the content on websites that use www.HooHoop.co.nz
                        search functionality. We encourage you to read the privacy
                        statements of these websites, which may differ from ours.
                    </Typography>
                </Grid>
                <Grid item xs={11} sm={10}>
                    <Typography variant="h3" className={classes.pointSeprator}>Sale/Merger</Typography>
                    <Typography className={classes.leftMargin}>
                        Information about our Users and our Portal is a business asset of
                        www.HooHoop.co.nz. Consequently, information about our Users,
                        including personal information, will be disclosed as part of any
                        merger or acquisition, creation of a separate business to provide
                        the Portal, our Services or fulfill products, sale or pledge of
                        company assets as well as in the event of an insolvency, bankruptcy
                        or receivership in which personal information would be transferred
                        as one of the business assets of the company.
                    </Typography>
                </Grid>
                <Grid item xs={11} sm={10}>
                    <Typography variant="h3" className={classes.pointSeprator}>Security</Typography>
                    <Typography className={classes.leftMargin}>
                        We use commercially reasonable security measures to protect the
                        loss, misuse, and alteration of the information under our control.
                        However, we cannot absolutely guarantee the protection of any
                        information shared with us. The use of the Portal will be at user’s
                        risk and the Company does not assume any liability for any
                        disclosure of information due to errors in transmission. The Company
                        has taken reasonable security measures as required by the
                        Information Technology (Reasonable Security Practices and Procedures
                        and Sensitive Personal Data or Information) Rules, 2011 DISCLOSURE
                        OF YOUR INFORMATION TO THIRD PARTIES: Due to the existing regulatory
                        environment, We cannot ensure that all of your Personal Information
                        shall never be disclosed in ways other than those described in this
                        Privacy Policy. For example, but without limiting and foregoing to,
                        we may be forced to disclose Your Personal Information to the
                        government, law enforcement agencies or other Third Parties. Under
                        certain circumstances, Third Parties may unlawfully intercept or
                        access transmission or private communications, or abuse or misuse
                        Your Personal Information that they may collect from our
                        Application. Therefore, although we use industry standard practices
                        to protect your privacy, we do not promise, and you should not
                        expect, that your personally identifiable information or private
                        communications would always remain private.
                    </Typography>
                </Grid>
                <Grid item xs={11} sm={10}>
                    <Typography variant="h3" className={classes.pointSeprator}>Cookies</Typography>
                    <Typography className={classes.leftMargin}>
                        Like many other transactional websites, we use “cookies” to improve
                        your shopping experience and to save your time. Cookies are little
                        tags that we place onto your computer. We assign a cookie to your
                        computer when you first visit us in order to enable us to recognize
                        you each time you return. Through cookies we can customize our
                        website to your individual preferences in order to create a more
                        personalized, convenient shopping experience. Please note that the
                        cookies we use for our Website or Application or e-mail campaigns do
                        not store personally identifiable information about you or your
                        finances. The user provide disclaimer of liability to the Company
                        for the use of cookies or any other feature by a third party who
                        advertises on our website as the Company does not control use of
                        cookies or other features by such third parties.
                  </Typography>
                </Grid>
                <Grid item xs={11} sm={10}>
                    <Typography variant="h3" className={classes.pointSeprator}>Grievance Redressal</Typography>
                    <Typography className={classes.leftMargin}>
                        If you have any questions about this Privacy Policy, please feel free 
                        to contact the Company through our Website or write to us at 
                        info@HooHoop.co.nz. In accordance with Information Technology Act —– and 
                        rules made there under, the name and contact details of the Grievance 
                        Officer to address any discrepancies and grievances with respect to 
                        processing of information are provided below:
                  </Typography>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default withStyles(styles, { withTheme: true })(PrivacyPolicy);
