import React from 'react';
import MaterialDatatable from "material-datatable";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';


class DashTable extends React.Component{
  constructor(props) {
    super(props);
    this.wrapper = React.createRef();
    this.state = {
      Usersdata:[],
      check: '',

    };
  }
    
    getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        MuiPaper: {
          elevation4: {
            width: "100%"
          }
        },
        MuiTableCell: {
          head: {

            color: '#2e6b95',
            fontSize:'15px',
            fontWeight:'700' 
          },
          root: {
            textAlign: 'center'
          }
        },
     
      }
    });
render() {

    const columns = [
      { name: " # ", field: "hash" },
        { name: " Name  ", field: "name" },
        { name: " Tasks  ", field: "tasks" },
        
      
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
    
  return (
  <div style={{width:'100%'}} >
 <MuiThemeProvider theme={this.getMuiTheme()}>
        <MaterialDatatable title={"RECENT ACTIVITIES"} data={this.props.data} columns={columns} options={options} />
      </MuiThemeProvider>
  </div>
  );
}}

export default DashTable;
