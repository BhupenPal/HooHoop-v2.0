import { Dialog, makeStyles } from '@material-ui/core';
import React from 'react';
import { useState } from 'react';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles(theme => (
    {
        editIcon:{
            padding:"1rem",
            cursor:"pointer"
          }
    }
))
function ProfileEditModal({user}) {
    console.log(user)
    const classes = useStyles();
    const [visible,setVisible] = useState(false);

    const showModal = () => {
        setVisible(true);
    }
    const hideModal = () => {
        setVisible(false);
    }
    return (
        <>
        <span onClick={showModal} className={classes.editIcon}><EditIcon/></span>
        <Dialog
        onClose={hideModal}
        aria-labelledby="simple-dialog-title"
        open={visible}
        >
            Hello
        </Dialog>
        </>
    );
}

export default ProfileEditModal;