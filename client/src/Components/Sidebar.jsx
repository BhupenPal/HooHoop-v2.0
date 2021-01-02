import React, { Fragment } from "react"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import { makeStyles } from "@material-ui/core/styles"
import { Link, useHistory } from "react-router-dom"
import ProfileIcon from "../assets/img/sidebarIcons/profile.svg"
import MyFavourites from "../assets/img/sidebarIcons/favourites.svg"
import MyListing from "../assets/img/sidebarIcons/listing.svg"
import AllListing from "../assets/img/sidebarIcons/all_listing.svg"
import UserManagement from "../assets/img/sidebarIcons/user_management.svg"
import MyClientManagement from "../assets/img/sidebarIcons/my_client_management.svg"
import AllClientManagement from "../assets/img/sidebarIcons/all_client_management.svg"
import SellIcon from "../assets/img/sidebarIcons/money.svg"
import BuyCar from "../assets/img/sidebarIcons/car.svg"

import YourPayments from "../assets/img/sidebarIcons/your_payments.svg"
import Logout from "../assets/img/sidebarIcons/logout.svg"
import "../assets/css/dashboard.scss"
import { useEffect } from "react"
import { Box } from "@material-ui/core"
import { useDispatch, useSelector } from "react-redux"
import OutsideAlerter from "../Hooks/OutsideAlerter.js"
import { logoutUser } from "../redux/actions/authActions"
import { useState } from "react"
import useWindowDimensions from "../Hooks/WindowDimensions"
import { hideSideBar, showSideBar } from "../redux/actions/sideBarActions"

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
	drawer: {
		width: "17rem",
		backgroundColor: "#fff",
		minHeight: "80vh",
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
	hideDrawer: {
		display: "none",
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
		minHeight: "calc( 100vh - 7rem)",
		overflow: "auto",
	},
	fullHeight: {
		flex: 1,
		backgroundColor: "#F4F6F8",
		height: "100%",
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
}))

const getNavs = (isAdmin) => ({
	Profile: {
		route: "/user/dashboard",
		component: ProfileIcon,
	},
	"My Favorites": {
		route: "/user/my-favourites",
		component: MyFavourites,
	},
	"My Listing": {
		route: "/user/my-listing",
		component: MyListing,
	},
	"All Listing": isAdmin
		? {
			route: "/user/all-listing",
			component: AllListing,
		}
		: null,
	"User Management": isAdmin
		? {
			route: "/user/user-management",
			component: UserManagement,
		}
		: null,
	"My Client Management": {
		route: "/user/my-client-management",
		component: MyClientManagement,
	},
	"All Client Management": isAdmin
		? {
			route: "/user/all-client-management",
			component: AllClientManagement,
		}
		: null,
	"Your Payments": {
		route: "/user/your-payments",
		component: YourPayments,
	}
})

const breakpoint = 960
function SideBar(props) {
	const classes = useStyles()
	const history = useHistory()
	const sideBar = useSelector((store) => store.sideBar)
	const { width } = useWindowDimensions()
	const { user, isAuthenticated } = useSelector((store) => store.auth)
	const dispatch = useDispatch()
	const [Navs, setNavs] = useState(getNavs(user && user.Role === "admin"))

	useEffect(() => {
		setNavs(getNavs(user && user.Role === "admin"))
	}, [user])

	// useEffect(() => {
	//   console.log(width, sideBar)
	//   if (width > 600) {
	//     dispatch(hideSideBar())
	//   }
	// }, [width])

	useEffect(() => {
		if (!history.location.pathname.includes("/user/") && width > breakpoint) {
			dispatch(hideSideBar())
		} else if (history.location.pathname.includes("/user/") && width > breakpoint) {
			dispatch(showSideBar())
		} else if (width <= breakpoint) {
			dispatch(hideSideBar())
		}
	}, [])

	useEffect(() => {
		return history.listen((location) => {

			if (!history.location.pathname.includes("/user/") && width > breakpoint) {
				dispatch(hideSideBar())
			} else if (history.location.pathname.includes("/user/") && width > breakpoint) {
				dispatch(showSideBar())
			} else if (width <= breakpoint) {
				dispatch(hideSideBar())
			}
		})
	}, [history])

	const isActive = (route) => {
		return history.location.pathname === route
	}

	const handleLogout = () => {
		dispatch(logoutUser())
		history.push(`/login?redirect=${history.location.pathname}`)
	}

	const renderLogoutButton = () => {
		if (isAuthenticated) {
			return (

				<Box display={{ sm: "none" }}>
					<ListItem
						button
						key={Object.keys(Navs).length}
						className={classes.listItem}
						onClick={handleLogout}
					>
						<ListItemIcon>
							<img src={Logout} height="20rem" alt="nav item" />
						</ListItemIcon>
						<ListItemText
							primary={<span className={classes.text}>{"Logout"}</span>}
						/>
					</ListItem>
				</Box>
			)
		} else {
			return (

				<Box>
					<ListItem
						button
						key={Object.keys(Navs).length}
						className={classes.listItem}
						onClick={() => history.push(`/login`)}
					>
						<ListItemIcon>
							<img src={Logout} height="20rem" alt="nav item" />

							{/* <img src={} height="20rem" alt="nav item" /> */}
						</ListItemIcon>
						<ListItemText
							primary={<span className={classes.text}>{"Sign In"}</span>}
						/>
					</ListItem>
				</Box>
			)
		}
	}

	const drawer = () => (
		<div>
			<List>
				<div className={classes.gap} />

				<Box display={{ sm: "block", md: "none" }}>
					<Link to={"/buy-car"}>
						<ListItem
							button
							key={Object.keys(Navs).length + 1}
							className={classes.listItem}
						>
							<ListItemIcon>
								<img src={BuyCar} height="20rem" alt="nav item" />
							</ListItemIcon>
							<ListItemText
								primary={<span className={classes.text}>{"Buy Car"}</span>}
							/>
						</ListItem>
					</Link>
				</Box>
				<Box display={{ sm: "block", md: "none" }}>
					<Link to={"/sell-car"}>
						<ListItem
							button
							key={Object.keys(Navs).length}
							className={classes.listItem}
						>
							<ListItemIcon>
								<img src={SellIcon} height="20rem" alt="nav item" />
							</ListItemIcon>
							<ListItemText
								primary={<span className={classes.text}>{"Sell Car"}</span>}
							/>
						</ListItem>
					</Link>
				</Box>
				{Object.keys(Navs).reduce((arr, text, index) => {
					if (!Navs[text] || !isAuthenticated) {
						return arr
					}
					arr.push(
						<Link to={Navs[text].route} key={arr.length}>
							<ListItem
								button
								key={index}
								className={
									isActive(Navs[text].route) ? classes.active : classes.listItem
								}
							>
								<ListItemIcon>
									<img
										src={Navs[text].component}
										height="20rem"
										alt="nav item"
									/>
								</ListItemIcon>
								<ListItemText
									primary={<span className={classes.text}>{text}</span>}
								/>
							</ListItem>
						</Link>
					)
					return arr
				}, [])}
				{renderLogoutButton()}
			</List>
		</div>
	)

	const shouldHideSideBar = () => {
		if (!history.location.pathname.includes("/user/") && width > breakpoint) {
			return true
		}
		return false
	}

	return (
		<div className={`${classes.root}`}>
			<OutsideAlerter isActive={sideBar.active}>
				<Box
					className={`${!shouldHideSideBar() ? classes.drawer : classes.hideDrawer
						} ${sideBar.active ? classes.activeSideBar : null}`}
				>
					{drawer()}
				</Box>
			</OutsideAlerter>
			<div className={`${shouldHideSideBar() ? classes.fullHeight : classes.content} `}>{props.children}</div>
		</div>
	)
}

export default SideBar