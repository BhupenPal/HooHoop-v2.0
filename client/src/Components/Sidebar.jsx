import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import zIndex from '@material-ui/core/styles/zIndex';

import Profile from "../assets/img/sidebarIcons/profile.svg";
import MyFavourites from "../assets/img/sidebarIcons/favourites.svg";
import MyListing from "../assets/img/sidebarIcons/listing.svg";
import AllListing from "../assets/img/sidebarIcons/all_listing.svg";
import UserManagement from "../assets/img/sidebarIcons/user_management.svg";
import MyClientManagement from "../assets/img/sidebarIcons/my_client_management.svg";
import AllClientManagement from "../assets/img/sidebarIcons/all_client_management.svg";
import MyOffers from "../assets/img/sidebarIcons/my_offers.svg";
import NoDealCustomers from "../assets/img/sidebarIcons/no_ideal_customers.svg";
import YourPayments from "../assets/img/sidebarIcons/your_payments.svg";
import Logout from "../assets/img/sidebarIcons/logout.svg";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    
  root: {
    display: 'flex',
  },
  drawer: {
    // [theme.breakpoints.up('sm')]: {
    //   width: drawerWidth,
    //   flexShrink: 0,
    // },
    width:"17rem",
    backgroundColor: "#fff",
    minHeight:"80vh",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.15)",
    marginTop: -2,
  },
  listItem:{
    fontSize:"14px !important",
  },
  gap:{
    height:"3rem"
  }
}));

const Navs = {
    'Profile': Profile,
    'My Favorites': MyFavourites,
    'My Listing' : MyListing,
    'User Management' : UserManagement,
    'My Client Management':MyClientManagement,
    'All Client Management': AllClientManagement,
    'My Offers':MyOffers,
    'No Deal Customers':NoDealCustomers,
    'Your Payments':YourPayments,
    'Logout':Logout
}
function SideBar(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
    
      <List>
        <div className={classes.gap}/>
        {Object.keys(Navs).map((text, index) => (
          <ListItem button key={text} key={index} >
            <ListItemIcon><img src={Navs[text]} height="20rem" alt="nav item"/></ListItemIcon>
            <ListItemText primary={<span className={classes.listItem}>{text}</span>} />
          </ListItem>
        ))}
      </List>
      
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
        <div className={classes.drawer}>
            {drawer}
        </div>
        <div>
        {props.children}
        </div>
    </div>
  );
}

SideBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default SideBar;
