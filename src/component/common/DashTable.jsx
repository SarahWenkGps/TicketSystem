import React from 'react';
import MaterialDatatable from "material-datatable";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';


class DashTable extends React.Component{

    
    getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        MuiPaper: {
          elevation4: {
            width: "100%"
          }
        }
      }
    });
render() {

    const columns = [
    
        { name: " Name  ", field: "name" },
        { name: " Username ", field: "username" },
        { name: " Department ", field: "depa" },
        
      
      ];
  
      const options = {
        selectableRows: false,
        print: false,
        responsive: "scroll",
        rowCursorHand: false,
        sort: false,
        filter: false,
         rowsPerPageOptions:[5,10,50,100],
        download:false,
  
      };
      const data = [
        {name: "Name 1", username: "Title 1", depa: "Location 1"},
        {name: "Name 2", username: "Title 2", depa: "Location 2"},
    ];  
  return (
  <div style={{width:'100%'}} >
 <MuiThemeProvider theme={this.getMuiTheme()}>
        <MaterialDatatable title={"RECENT ACTIVITIES"} data={data} columns={columns} options={options} />
      </MuiThemeProvider>
  </div>
  );
}}

export default DashTable;
