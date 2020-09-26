import React from 'react';
import Table from "./Table.jsx";

function TestDrives({testDriveUsers,header}) {
  
      const makeData = (rows) => {
        return rows.map((row, index) => ({
          sno: index + 1,
          Date: row.Date,
          FullName: row.FullName,
          Email: row.Email,
          Phone: row.Phone,
          MakeModel:row.MakeModel,
          VINum:row.VINum,
          AuthorName:row.Author ? row.Author?.FirstName + " " + row.Author?.LastName : "Not Available",
          //manage: renderOptions(index),
        }));
      };
    
    return (
        <div>
            <Table header={header} rows={makeData(testDriveUsers)} />
        </div>
    );
}

export default TestDrives;