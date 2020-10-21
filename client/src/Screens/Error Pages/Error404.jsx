import React from 'react'
import ErrorPic from '../../assets/img/Error Pages/Error404.png'
import { Typography, Button } from '@material-ui/core'

function Error404() {
    return (
        <div className='flex-col-jc-al-center'>
            <img src={ErrorPic} alt="Error 404 Illustration"/>
            <div>
                <Typography >Error 404! Not Found!</Typography>
                <Typography >Something went wrong, we are working on it</Typography>
                <Button>Home</Button>
            </div>
        </div>
    )
}

export default Error404
