import React from 'react'
import ErrorPic from '../../assets/img/Error Pages/ErrorBrokenLink.png'
import { Typography, Button } from '@material-ui/core'

const ErrorBrokenLink = () => {
    return (
        <div className='flex-col-jc-al-center'>
            <img src={ErrorPic} alt="Broken Link Error Illustration" />
            <div>
                <Typography >Error 404! Not Found!</Typography>
                <Typography >Something went wrong, we are working on it</Typography>
                <Button>Home</Button>
            </div>
        </div>
    )
}

export default ErrorBrokenLink
