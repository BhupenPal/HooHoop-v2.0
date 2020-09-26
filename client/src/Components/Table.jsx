import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  tableContainer:{
    background:"transparent"
  },
  table: {
    minWidth: 650,

    borderCollapse: "separate",
    borderSpacing: "0 0.5rem",
  },
  header:{

  },
  row:{
      backgroundColor:"#fff",
      borderRadius:5,
      margin:"1rem",
  },
  cell:{
    border:"none"      
  }

});

export default function CustomTable({header,rows}) {
  const classes = useStyles();

  return (
    <TableContainer className={classes.tableContainer} component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead className={classes.header}>
          <TableRow>
            {header.map(({title}) => <TableCell className={classes.cell}>{title}</TableCell>)} 
          </TableRow>
        </TableHead>
        <TableBody>  
          {rows.map((row,index) => (
            <TableRow key={index} className={classes.row}>
                {header.map(({key}) => {
                    return <TableCell align="left" className={classes.cell}>{row[key]}</TableCell>
                })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
