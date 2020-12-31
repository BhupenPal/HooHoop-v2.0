import React, { useEffect } from 'react';
import CustomTable from '../../Components/Table.jsx';
import { FetchTransactions } from '../../services/transactions.js';

function Payments(props) {

  const header = [
    {
      title:"S. no.",
      key:""
    },
    {
      title:"Date",
      key:""
    },
    {
      title:"Status",
      key:""
    },
    {
      title:"Amount",
      key:""
    },
  ]
  useEffect(() => {
    FetchTransactions()
    .then((data) => {
      console.log(data)
    })
  }, [])
  return (
    
    <div className={"dashboard"}>
    <div className={"dashboard__header"}>
      <h2 className={"dashboard__heading"}>Your Payments</h2>
      <p className={"dashboard__heading"}>{"0"} Total</p>
      
    </div>
    <CustomTable header={header} rows={[]} />
    
    </div>
  );
}

export default Payments;