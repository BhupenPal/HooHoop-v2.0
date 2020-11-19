import { Dialog } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SignIn from '../../Screens/Main/SignIn.jsx';
import {closeLoginModel} from "../../redux/actions/loginModelActions";

function LoginModel() {
    const {active} = useSelector(state => state.loginModel);
    const dispatch = useDispatch();
    const handleClose = () => {
        console.log("closeme")
        dispatch(closeLoginModel());
    }

    return (
        <Dialog
            onClose={handleClose}
            aria-labelledby="login-model"
            open={active}
        >
            <SignIn inDialog={true} closeDialog={handleClose}/>
        </Dialog>
    );
}

export default LoginModel;