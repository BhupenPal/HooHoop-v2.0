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
    color:"#999999",
    fontWeight:"500"
  },
  row:{
     // display:"block",
      backgroundColor:"#fff",
      borderRadius:"0.5rem !important",
      margin:"1rem",
      ['& td:first-child']:{
        borderRadius:"0.5rem 0 0 0.5rem !important",

      },

      ['& td:last-child']:{
        borderRadius:"0 0.5rem 0.5rem 0 !important",

      }
  },

  cell:{
    border:"none",
    padding:"0.8rem"      
  }

});

export default function CustomTable({header,rows}) {
  const classes = useStyles();

  return (
    <TableContainer className={classes.tableContainer} component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead >
          <TableRow>
            {header.map(({title}) => <TableCell className={`${classes.cell} ${classes.header}`}>{title}</TableCell>)} 
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
