import React from 'react';
import MaterialDatatable from "material-datatable";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import moment from 'moment';

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
        { name: "All Tasks  ", field: "alltasks" },
        { name: "New", field: "new" },
        { name: "In Progress", field: "inprogress" },
        { name: "Closed", field: "closed" },
        { name: "Approved  ", field: "approved" },
        { name: "Rejected  ", field: "rejected" },
        { name: "Archived", field: "archived" },
      ];
  
      const options = {
        selectableRows: false,
        print: false,
        responsive: "scroll",
        rowCursorHand: false,
        sort: true,
        filter: false,
         rowsPerPageOptions:[5,10,50,100],
        download:false,
  
      };
    
  return (
  <div style={{width:'100%'}} >
 <MuiThemeProvider theme={this.getMuiTheme()}>
        <MaterialDatatable title={`RECENT ACTIVITIES ${this.props.date1!=0 ?(moment(this.props.date1).format("L")):('')} - ${this.props.date2!=0 ?(  moment(this.props.date2).format("L")):('')}`} data={this.props.data} columns={columns} options={options} />
      </MuiThemeProvider>
  </div>
  );
}}

export default DashTable;
