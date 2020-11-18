import React, { Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link, NavLink } from 'react-router-dom'
import { withRouter } from 'react-router'
import Logo from '../assets/img/logo/Logo.png'
import { Box, AppBar, Toolbar, Button, IconButton, Menu, MenuItem } from '@material-ui/core'
import ToggleIcon from '../assets/img/svgs/toggleIcon.svg'
import { useDispatch, useSelector } from 'react-redux'
import { hideSideBar, showSideBar } from '../redux/actions/sideBarActions'
import SearchBox from './Inputs/SearchBox.jsx'
import { logoutUser } from "../redux/actions/authActions"

import PermIdentityIcon from '@material-ui/icons/PermIdentity'

const HeaderStyles = makeStyles(theme => ({
  HeaderStyle: {
    margin: '10px 6%',
    justifyContent: 'space-between',
    fontSize: 13.5,
    fontWeight: 500,
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      margin: '0'
    }
  },
  HeaderLogo: {
    width: 300,
    objectFit: 'contain',
    [theme.breakpoints.down('md')]: {
      width: 150
    }
  },
  OptButton: {
    width: 50,
    height: 30,
    backgroundColor: '#fff',
    color: '#333',
    margin: '0 10px'
  },
  RegisterButton: {
    width: 175,
    height: 30,
    backgroundColor: '#fff',
    color: '#000',
    border: '1px solid #DDDDDD'
  },
  LoginButton: {
    background: 'linear-gradient(201.33deg, #E85513 1.75%, #FABF01 97.05%)',
    color: '#fff',
    width: 100,
    height: 30,
    borderRadius: 5,
    [theme.breakpoints.down('md')]: {
      background: 'none',
      color: '#666666',
      width: 'unset',
      padding: 0
    }
  }
}))

const Header = () => {
  const classes = HeaderStyles()
  const dispatch = useDispatch()
  const sideBar = useSelector(store => store.sideBar)
  const auth = useSelector(store => store.auth)

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSideBarToggle = () => {
    if (sideBar.active) {
      dispatch(hideSideBar())
    } else {
      dispatch(showSideBar())
    }
  }

  const handleLogout = () => {
    dispatch(logoutUser());
    setAnchorEl(null);
  };

  const renderSearchBox = () => {
    return (
      window.location.pathname === '/' ||
      window.location.pathname === '/sell-car' ||
      window.location.pathname === '/login' ||
      window.location.pathname.includes("/register") ||
      window.location.pathname.includes(500) ||
      window.location.pathname.includes(400)
    )
      ?
      null
      :
      <SearchBox label='' placeholder='Search Car' />
  }

  const renderAuthButtons = () => {
    if (!auth.isAuthenticated) {
      return (
        <Fragment>
          <Box
            display={{ xs: 'none', md: 'inline' }}
            style={{ marginRight: 20 }}
          >
            <NavLink to='/register'>
              <Button
                color='inherit'
                className={classes.RegisterButton}
              >
                Create Account
							</Button>
            </NavLink>
          </Box>
          <Box display={{ xs: 'inline' }}>
            <NavLink to='/login'>
              <Button
                color='inherit'
                className={classes.LoginButton}
              >
                Sign In
							</Button>
            </NavLink>
          </Box>
        </Fragment>
      )
    } else {
      return (
        <Box display={{ md: 'block' }}>
          <IconButton color='inherit' className={classes.OptButton} style={{ width: 50, height: 50 }} onClick={handleClick}>
            <PermIdentityIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            getContentAnchorEl={null}
            style={{ marginTop: 18 }}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "center" }}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <NavLink to='/user/dashboard' style={{ color: 'inherit' }}>
                My Account
              </NavLink>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <NavLink to='/user/my-favourites' style={{ color: 'inherit' }}>
                Wishlist
              </NavLink>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              Logout
            </MenuItem>
          </Menu>
        </Box>
      )
    }
  }

  const renderSideBarToggler = () => {
    if (auth.isAuthenticated) {
      return (
        <Box
          display={{ xs: 'block', md: 'none' }}
          onClick={handleSideBarToggle}
        >
          <img src={ToggleIcon} alt='' />
        </Box>
      )
    }
  }

  return (
    <AppBar
      position='static'
      style={{
        backgroundColor: '#fff',
        position: 'relative',
        zIndex: 200
      }}
    >
      <Toolbar className={classes.HeaderStyle}>
        <Box
          display={{ sm: 'block', md: 'flex' }}
          style={{ width: '100%' }}
          justifyContent='space-between'
        >
          <Box
            display={{ xs: 'flex' }}
            alignItems='center'
            justifyContent='center'
          >
            {renderSideBarToggler()}
            <Box display={{ xs: 'block' }} flex={1}>
              <Link to='/'>
                <img
                  src={Logo}
                  alt='Hoohoop Logo'
                  className={classes.HeaderLogo}
                />
              </Link>
            </Box>
          </Box>
          <Box
            display={{ xs: 'block', md: 'flex' }}
            className='header-options'
          >
            <Box
              display={{ md: 'block' }}
              style={{ flex: 1, margin: '0 10%' }}
            >
              {renderSearchBox()}
            </Box>
            <Box
              display={{ xs: 'flex' }}
              style={{ padding: '1rem 0' }}
              justifyContent='center'
              className='flex-jc-al-center'
            >
              <Box display={{ md: 'block' }}>
                <NavLink to='/'>
                  <Button
                    color='inherit'
                    className={classes.OptButton}
                  >
                    Home
									</Button>
                </NavLink>
              </Box>
              <Box display={{ md: 'block' }}>
                <NavLink to='/buy-car'>
                  <Button
                    color='inherit'
                    className={classes.OptButton}
                  >
                    Buy
									</Button>
                </NavLink>
              </Box>
              <Box display={{ md: 'block' }}>
                <NavLink to='/sell-car'>
                  <Button
                    color='inherit'
                    className={classes.OptButton}
                  >
                    Sell
									</Button>
                </NavLink>
              </Box>
              {renderAuthButtons()}
            </Box>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default withRouter(Header)
