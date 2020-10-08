import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Route,
  Switch,
  Link,
  useRouteMatch,
  useHistory,
} from "react-router-dom";
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
import Dashboard from "../Screens/Dashboard.jsx";
import MyListingScreen from "../Screens/MyListing.jsx";
import AllListingScreen from "../Screens/AllListings.jsx";
import UserManagementScreen from "../Screens/UserManagements.jsx";
import MyClientManagementScreen from "../Screens/MyClientManagement.jsx";
import AllClientManagementScreen from "../Screens/AllClientsManagement.jsx";
import "../assets/css/dashboard.scss";
import { useEffect } from "react";
import { Box } from "@material-ui/core";
import { useSelector } from "react-redux";
import OutsideAlerter from "./OutsideAlerter.jsx";


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    // [theme.breakpoints.up('sm')]: {
    //   width: drawerWidth,
    //   flexShrink: 0,
    // },
    width: "17rem",
    backgroundColor: "#fff",
    minHeight: "80vh",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.15)",
    marginTop: -2,
    [theme.breakpoints.down("md")]: {
      position: "fixed",
      height: "100vh",
      width: "70vw",

      top: 0,
      left: 0,
      zIndex: 9999,
      transform: "translateX(-100%)",
      transition: "transform 0.2s",
    },
  },
  listItem: {
    color: "#707D85",
  },
  text: {
    fontSize: "14px !important",
  },
  gap: {
    height: "3rem",
  },
  content: {
    flex: 1,
    backgroundColor: "#F4F6F8",
    height: "calc( 100vh - 7rem)",
    overflow: "auto",
  },
  active: {
    color: "#E85513 !important",
    background: "rgba(232, 85, 19, 0.05)",
    borderLeft: "5px solid #E85513",
    fill: "#E85513",
  },
  activeSideBar: {
    transform: "translateX(0%)",
  },
}));

const Navs = {
  Profile: {
    route: "/user/dashboard",
    component: Profile,
  },
  "My Favorites": {
    route: "/user/my-favourites",
    component: MyFavourites,
  },
  "My Listing": {
    route: "/user/my-listing",
    component: MyListing,
  },
  "All Listing": {
    route: "/user/all-listing",
    component: AllListing,
  },
  "User Management": {
    route: "/user/user-management",
    component: UserManagement,
  },
  "My Client Management": {
    route: "/user/my-client-management",
    component: MyClientManagement,
  },
  "All Client Management": {
    route: "/user/all-client-management",
    component: AllClientManagement,
  },
  "My Offers": {
    route: "/user/my-offers",
    component: MyOffers,
  },
  "No Deal Customers": {
    route: "/user/my-deal-customer",
    component: NoDealCustomers,
  },
  "Your Payments": {
    route: "/user/your-payments",
    component: YourPayments,
  },
  Logout: {
    route: "/",
    component: Logout,
  },
};
function SideBar(props) {
  const classes = useStyles();
  const history = useHistory();
  const sideBar = useSelector((store) => store.sideBar);

  // useEffect(() => {

  // })
  console.log(history);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isActive = (route) => {
    return history.location.pathname === route;
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const drawer = () => (
    <div>
      <List>
        <div className={classes.gap} />

        {Object.keys(Navs).map((text, index) => (
          <Link to={Navs[text].route}>
            <ListItem
              button
              key={index}
              className={
                isActive(Navs[text].route) ? classes.active : classes.listItem
              }
            >
              <ListItemIcon>
                <img src={Navs[text].component} height="20rem" alt="nav item" />
              </ListItemIcon>
              <ListItemText
                primary={<span className={classes.text}>{text}</span>}
              />
            </ListItem>
          </Link>
        ))}

        <Box display={{ sm: "block", md: "none" }}>
          <Link to={"/sell-car"}>
            <ListItem
              button
              key={Object.keys(Navs).length}
              className={classes.listItem}
            >
              <ListItemIcon>
                {/* <img src={} height="20rem" alt="nav item" /> */}
              </ListItemIcon>
              <ListItemText
                primary={<span className={classes.text}>{"Sell Car"}</span>}
              />
            </ListItem>
          </Link>
        </Box>
        <Box display={{ sm: "block", md: "none" }}>
          <Link to={"/buy-car"}>
            <ListItem
              button
              key={Object.keys(Navs).length + 1}
              className={classes.listItem}
            >
              <ListItemIcon>
                {/* <img src={} height="20rem" alt="nav item" /> */}
              </ListItemIcon>
              <ListItemText
                primary={<span className={classes.text}>{"Buy Car"}</span>}
              />
            </ListItem>
          </Link>
        </Box>
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <OutsideAlerter isActive={sideBar.active}>
        <Box
          className={`${classes.drawer} ${
            sideBar.active ? classes.activeSideBar : null
          }`}
        >
          {drawer()}
        </Box>
      </OutsideAlerter>
      <div className={classes.content}>
        {/* {props.children} */}
        <Switch>
          <Route path="/user/dashboard" component={Dashboard} />
          <Route path="/user/my-listing" component={MyListingScreen} />
          <Route path="/user/all-listing" component={AllListingScreen} />
          <Route
            path="/user/user-management"
            component={UserManagementScreen}
          />
          <Route
            path="/user/my-client-management"
            component={MyClientManagementScreen}
          />
          <Route
            path="/user/all-client-management"
            component={AllClientManagementScreen}
          />
        </Switch>
      </div>
    </div>
  );
}

export default SideBar;
