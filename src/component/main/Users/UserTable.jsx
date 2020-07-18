import React from 'react';
import MaterialDatatable from "material-datatable";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import moment from 'moment';

class UserTable extends React.Component{
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
            textAlign: 'center',
          
          }
        },
     
      }
    });
render() {

    const columns = [
        { name: " # ", field: "hash" },
        { name: " Name  ", field: "name" },
        { name: " Department ", field: "depa" },
        { name: "Email", field: "email" },
        { name: "Ext.", field: "ip_phone" },
        { name: "Phone", field: "phone" },
        { name: "Birthdate", field: "birthdate" },  
      ];
  
      const options = {
        selectableRows: false,
        print: false,
        responsive: "scroll",
        rowCursorHand: false,
        sort: false,
        filter: false,
        rowsPerPageOptions: [ 15, 50, 100],
        download: false,
  
      };
  return (
  <div style={{width:'100%'}} >
  
    <MuiThemeProvider theme={this.getMuiTheme()}>
                    <MaterialDatatable
                      data={this.props.data}
                      columns={columns}
                      options={options}
                    />
                  </MuiThemeProvider>
  </div>
  );
}}

export default UserTable;
