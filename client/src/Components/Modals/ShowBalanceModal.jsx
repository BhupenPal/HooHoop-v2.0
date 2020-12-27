import { Box, Button, Dialog, DialogContent, DialogTitle, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, withStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import FetchProfile from '../../services/profile';
import PaypalPaymentButton from '../Buttons/PaypalPaymentButton.jsx';

const listingAmount = 50;


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);
const useStyles = makeStyles({
  table: {
    minWidth: 300,
  },
});
function ShowBalanceModal({open,setModal,listCar}) {
  const [credits,setCredits] = useState(0);
  const classes = useStyles();
  const handleClose = () => {
    setModal(false);
  }
  const setBalance = async () => {
    const user =  await FetchProfile();
    setCredits(user.Credits);
  }
  const onSuccess = () => {
    listCar()
  }
  const renderButton = () => {
    if(credits >= listingAmount){
      return (<Button onClick={listCar}>Add Car</Button>)
    }else{
return (<>
      <p>Add {listingAmount - credits} to proceed</p>
      <PaypalPaymentButton
          toPay={listingAmount - credits}
          onSuccess={onSuccess}
          transactionError={console.log}
          transactionCancelled={handleClose}
        />
        </>)
    }
  }
  useEffect(() => {
    if(open){
      setBalance();
    }
  }, [open])
  return (  
  <Dialog
    onClose={handleClose}
    aria-labelledby="simple-dialog-title"
    open={open}
  >
    <DialogTitle id="simple-dialog-title">Balance</DialogTitle>
    <DialogContent>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Current Balance</StyledTableCell>
            <StyledTableCell align="center">Charge For Posting</StyledTableCell>
            <StyledTableCell align="center">Balance Left</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <StyledTableRow key={0}>
              {/* <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell> */}
              <StyledTableCell align="center">{credits}</StyledTableCell>
              <StyledTableCell align="center">{listingAmount}</StyledTableCell>
              <StyledTableCell align="center">{credits - listingAmount}</StyledTableCell>
            </StyledTableRow>
        </TableBody>
      </Table>
      <Box mt={2} style={{display:"flex",alignItems:"center", flexDirection:"column"}}>
        {renderButton()}
      </Box>
    </TableContainer>
    </DialogContent>
  </Dialog>
  );
}

export default ShowBalanceModal;