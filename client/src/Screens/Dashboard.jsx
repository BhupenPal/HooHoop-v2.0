// Dependencies
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { makeStyles, Typography, Avatar, Grid } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'

// Services and Actions
import { logoutUser } from '../actions/authActions'
import FetchProfile from '../services/profile'

const DashboardStyles = makeStyles(theme => ({
  userDetails: {
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.25)',
    padding: '2rem',
    borderRadius: 5,
    boxSizing: 'border-box',
    backgroundColor: '#fff'
  },
  userImage: {
    height: '7.5rem',
    width: '7.5rem',
    borderRadius: 10,
    margin: '1rem'
  },
  user: {
    display: 'flex'
  },
  userInfo: {
    paddingTop: '1.5rem'
  },
  userContacts: {
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column'
    }
  },
  userContact: {
    flex: 1,
    padding: '1rem 2rem'
  },
  contactHeading: {
    marginBottom: '1rem',
    position: 'relative',
    '&::before': {
      position: 'absolute',
      top: '100%',
      left: 6,
      content: "''",
      backgroundColor: '#000',
      height: '0.2rem',
      width: '3rem'
    }
  },
  dob: {
    fontSize: '0.9rem',
    marginTop: '0.2rem'
  },
  otherOptions: {
    width: '82%',
    margin: '2rem auto',
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column'
    }
  },
  walletCard: {
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.25)',
    width: '48%',
    margin: '1rem',
    padding: '2rem',
    backgroundColor: '#fff',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      margin: '1rem 0'
    }
  },
  walletCredits: {
    display: 'flex',
    justifyContent: 'center',
    padding: '2rem 0'
  },
  sign: {
    fontWeight: 500
  },
  amount: {
    fontSize: '4rem',
    margin: 0,
    fontWeight: 500,
    padding: '0 0.5rem',
    lineHeight: '4rem'
  },
  walletActions: {
    textAlign: 'center'
  },
  walletButton: {
    margin: '0 1rem',
    backgroundColor: '#fff',
    color: '#708DC7',
    border: '1px solid #708DC7',
    padding: '0.2rem 1rem',
    borderRadius: '0.5rem'
  },
  buttonPrimary: {
    background: 'linear-gradient(201.33deg, #E85513 1.75%, #FABF01 97.05%)',
    margin: '0 1rem',
    color: '#fff',
    border: 'none',
    padding: '0.2rem 2rem',
    borderRadius: '0.5rem'
  }
}))

const Dashboard = () => {
  const classes = DashboardStyles()

  const [profile, setProfile] = useState(null)

  useEffect(() => {
    FetchProfile()
      .then(profile => {
        setProfile(profile)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  const DisplayPicHandle = () => {
    return profile.pic
      ?
      (
        <img className={classes.userImage} src={`/assets/users/${_id}/profile.jpg`} alt="User Image" />
      )
      :
      (
        <Avatar variant='rounded' className={classes.userImage}>
          {profile.FirstName[0]}
          {profile.LastName[0]}
        </Avatar>
      )
  }

  if (!profile) {
    return (
      <Grid container alignItems='center' justify="center" style={{ minHeight: '85%' }}>
        <Grid item container xs={10} className={classes.userDetails}>
          <Grid item xs={12} className={classes.user}>
            <Skeleton variant='rect' className={classes.userImage} />
            <div className={classes.userInfo}>
              <Skeleton width={150} height={26} />
              <p className={classes.dob}>
                <Skeleton width={100} height={26} />
              </p>
            </div>
          </Grid>
          <Grid item xs={12} className={classes.userContacts}>
            <div className={classes.userContact}>
              <Skeleton width={150} height={26} />
              <div>
                <Skeleton width={300} height={26} />
              </div>
            </div>
            <div className={classes.userContact}>
              <Skeleton width={150} height={26} />
              <div>
                <Skeleton width={300} height={26} />
              </div>
            </div>
            <div className={classes.userContact}>
              <Skeleton width={150} height={26} />
              <div>
                <Skeleton width={300} height={26} />
              </div>
            </div>
          </Grid>
        </Grid>
        <Grid item container xs={10} justify='space-between'>
          <Grid item xs={5} className={classes.userDetails}>
            <Typography variant='h4'>
              Your HoopHoop Wallet
						</Typography>
            <div className={classes.walletCredits}>
              <div className={classes.sign}>$</div>
              <div className={classes.amount}>
                100
                </div>
            </div>
            <div className={classes.walletActions}>
              <button className={classes.walletButton}>
                Add money
							</button>
              <button className={classes.buttonPrimary}>
                Sell Car
							</button>
            </div>
          </Grid>
          <Grid item xs={6} className={classes.userDetails}>
            Transactions
          </Grid>
        </Grid>
      </Grid>
    )
  }

  return (
    <Grid container alignItems='center' justify="center" style={{ minHeight: '85%' }}>
        <Grid item container xs={10} className={classes.userDetails}>
          <Grid item xs={12} className={classes.user}>
            <div>
              {
                DisplayPicHandle()
              }
            </div>
            <div className={classes.userInfo}>
              <h2>{`${profile.FirstName} ${profile.LastName}`}</h2>
              <p className={classes.dob}>
                <span style={{ color: 'rgba(0,0,0,0.6)' }}>
                  Born on : &nbsp;
                </span>
                {profile.DOB ? profile.DOB : 'N/A'}
              </p>
            </div>
          </Grid>
          <Grid item xs={12} className={classes.userContacts}>
            <div className={classes.userContact}>
              <Typography variant='h4' className={classes.contactHeading}>
                Address
							</Typography>
              <div>
                {profile.Address ? profile.Address : 'N/A'}
              </div>
            </div>
            <div className={classes.userContact}>
              <Typography variant='h4' className={classes.contactHeading}>
                Email Address
							</Typography>
              <div>
                <p>{profile.Email}</p>
              </div>
            </div>
            <div className={classes.userContact}>
              <Typography variant='h4' className={classes.contactHeading}>
                Phone Number
							</Typography>
              <div>
                <p>{profile.Phone}</p>
              </div>
            </div>
          </Grid>
        </Grid>
        <Grid item container xs={10} justify='space-between'>
          <Grid item xs={5} className={classes.userDetails}>
            <Typography variant='h4'>
              Your HoopHoop Wallet
						</Typography>
            <div className={classes.walletCredits}>
              <div className={classes.sign}>$</div>
              <div className={classes.amount}>
                {profile.Credits}
              </div>
            </div>
            <div className={classes.walletActions}>
              <button className={classes.walletButton}>
                Add money
							</button>
              <button className={classes.buttonPrimary}>
                Sell Car
							</button>
            </div>
          </Grid>
          <Grid item xs={6} className={classes.userDetails}>
            Transactions
          </Grid>
        </Grid>
    </Grid>
  )
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { logoutUser })(Dashboard)