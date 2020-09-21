import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, useTheme } from '@material-ui/core/styles';

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
  },
  content:{
    flex:1,
    backgroundColor:"#F4F6F8",
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
  const classes = useStyles();
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


  return (
    <div className={classes.root}>
        <div className={classes.drawer}>
            {drawer}
        </div>
        <div className={classes.content}>
        {props.children}
        </div>
    </div>
  );
}

export default SideBar;
