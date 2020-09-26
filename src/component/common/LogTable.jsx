import React from 'react';
import MaterialDatatable from "material-datatable";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import moment from 'moment';
import RangePicker from "react-range-picker";
import axios from "axios";
import Cookies from "universal-cookie";
import Host from "../../assets/js/Host";
import Lottie from "lottie-react-web";
import loading from '../../assets/js/loading.json';
const cookies = new Cookies();
class DashTable extends React.Component {
    constructor(props) {
        super(props);
        this.wrapper = React.createRef();
        this.state = {
            logData: [],
            check: '',
            date: [],
            date1: moment(moment().format('L')).format("X") * 1000,
            date2: 0,
            watt: '',
            spin: true,
            name:''
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
                        fontSize: '15px',
                        fontWeight: '700'
                    },
                    root: {
                        textAlign: 'center',
                    }
                },

            }
        });


    componentDidMount() {
        var headers = {
            jwt: cookies.get("token"),
        };
        const urlParams = new URLSearchParams(window.location.search);
        const myParam = urlParams.get('id');
        const name = urlParams.get('name');
        this.setState({name:name})
        if (urlParams.get('name')==="department") {
            axios({
                url: Host + `logs/department/${myParam}`,
                method: "GET",
                headers: headers,
    
            })
                .then(response => {
                    this.setState({ watt: "no" });
                    this.setState({ spin: false })
                    //   if (response.data.status === false) {
                    //     cookies.remove("token");
                    //     window.location.href = "/"
                    //   } else {
                        let arr=[];
                        for (let index = 0; index < response.data.data.length; index++) {
                            const obj ={
                                log_type:  response.data.data[index].log_type,
                                action_by_user: response.data.data[index].action_by_user,
                                affected_user: response.data.data[index].affected_user,
                                note: response.data.data[index].note,
                                created_at:(moment(response.data.data[index].created_at).format('lll') ),
                            }
                            arr.push(obj)
                        }
                    this.setState({ logData: arr })
                  
    
                    //   }
                })
        }
    
        if (urlParams.get('name')==="type") {
            axios({
                url: Host + `logs/task_type/${myParam}`,
                method: "GET",
                headers: headers,
    
            })
                .then(response => {
                    this.setState({ watt: "no" });
                    this.setState({ spin: false })
                    //   if (response.data.status === false) {
                    //     cookies.remove("token");
                    //     window.location.href = "/"
                    //   } else {
                        let arr=[];
                        for (let index = 0; index < response.data.data.length; index++) {
                            const obj ={
                                log_type:  response.data.data[index].log_type,
                                action_by_user: response.data.data[index].action_by_user,
                                affected_user: response.data.data[index].affected_user,
                                note: response.data.data[index].note,
                                created_at:(moment(response.data.data[index].created_at).format('lll') ),
                            }
                            arr.push(obj)
                        }
                    this.setState({ logData: arr })
                  
    
                    //   }
                })
        }
    
        if (urlParams.get('name')==="user") {
        
          axios({
            url: Host + `logs/user/${myParam}?params={"from_date":${this.state.date1},"to_date":${this.state.date2}}`,
            method: "GET",
            headers: headers,

             })
            .then(response => {
                this.setState({ watt: "no" });
                this.setState({ spin: false })
                //   if (response.data.status === false) {
                //     cookies.remove("token");
                //     window.location.href = "/"
                //   } else {
                    let arr=[];
                    for (let index = 0; index < response.data.data.length; index++) {
                        const obj ={
                            log_type: (response.data.data[index].log_type!== null && response.data.data[index].log_type.includes("task") ?(  <div  onClick={()=>{
                                {window.open(`https://www.iraq-gis.com/`+`NoteTask?id=${response.data.data[index].task_id}`,'_blank')} }}   > 
                                 {response.data.data[index].log_type} </div> ):(response.data.data[index].log_type)
                            ) ,
                            action_by_user: (response.data.data[index].log_type!== null && response.data.data[index].log_type.includes("task") ?(  <div  onClick={()=>{
                                {window.open(`https://www.iraq-gis.com/`+`NoteTask?id=${response.data.data[index].task_id}`,'_blank')} }}   > 
                                 {response.data.data[index].action_by_user} </div> ):(response.data.data[index].action_by_user)
                            ) ,
                            affected_user: (response.data.data[index].log_type!== null && response.data.data[index].log_type.includes("task") ?(  <div  onClick={()=>{
                                {window.open(`https://www.iraq-gis.com/`+`NoteTask?id=${response.data.data[index].task_id}`,'_blank')} }}   > 
                                 {response.data.data[index].affected_user} </div> ):(response.data.data[index].affected_user)
                            ),
                            note:(response.data.data[index].log_type!== null && response.data.data[index].log_type.includes("task") ?(  <div  onClick={()=>{
                                {window.open(`https://www.iraq-gis.com/`+`NoteTask?id=${response.data.data[index].task_id}`,'_blank')} }}   > 
                                 {response.data.data[index].note} </div> ):(response.data.data[index].note)
                            ) ,
                            created_at:(response.data.data[index].log_type!== null && response.data.data[index].log_type.includes("task") ?(  <div  onClick={()=>{
                                {window.open(`https://www.iraq-gis.com/`+`NoteTask?id=${response.data.data[index].task_id}`,'_blank')} }}   > 
                                 {(moment(response.data.data[index].created_at).format('lll') )} </div> ):((moment(response.data.data[index].created_at).format('lll') ))
                            ),
                        }
                        arr.push(obj)
                    }
                this.setState({ logData: arr })
               

                //   }
            })
        }

        if (urlParams.get('name')==="Task") {
        
            axios({
              url: Host + `logs/task/${myParam}?params={"from_date":${this.state.date1},"to_date":${this.state.date2}}`,
              method: "GET",
              headers: headers,
  
               })
              .then(response => {
                  this.setState({ watt: "no" });
                  this.setState({ spin: false })
                  //   if (response.data.status === false) {
                  //     cookies.remove("token");
                  //     window.location.href = "/"
                  //   } else {
                      let arr=[];
                      for (let index = 0; index < response.data.data.length; index++) {
                          const obj ={
                              log_type:  response.data.data[index].log_type,
                              action_by_user: response.data.data[index].action_by_user,
                              affected_user: response.data.data[index].affected_user,
                              note: response.data.data[index].note,
                              created_at:(moment(response.data.data[index].created_at).format('lll') ),
                          }
                          arr.push(obj)
                      }
                  this.setState({ logData: arr })
                 
  
                  //   }
              })
          }


    }







    allTime() {
        var x = document.getElementById("date_btn");
        x.style.backgroundColor = "#fff";
        x.style.color = "#828282";
        var b = document.getElementById("date_btn2");
        b.style.backgroundColor = "#fff";
        b.style.color = "#828282";
        var n = document.getElementById("date_btn3");
        n.style.backgroundColor = "#fff";
        n.style.color = "#828282";
        var y = document.getElementById("date_btn1");
        y.style.backgroundColor = "rgb(106, 170, 104)";
        y.style.color = "#fff";
      }
    
      today() {
        var x = document.getElementById("date_btn1");
        x.style.backgroundColor = "#fff";
        x.style.color = "#828282";
        var s = document.getElementById("date_btn3");
        s.style.backgroundColor = "#fff";
        s.style.color = "#828282";
        var t = document.getElementById("date_btn2");
        t.style.backgroundColor = "#fff";
        t.style.color = "#828282";
        var y = document.getElementById("date_btn");
        y.style.backgroundColor = "rgb(106, 170, 104)";
        y.style.color = "#fff";
      }
      yesterday() {
        var x = document.getElementById("date_btn1");
        x.style.backgroundColor = "#fff";
        x.style.color = "#828282";
        var s = document.getElementById("date_btn3");
        s.style.backgroundColor = "#fff";
        s.style.color = "#828282";
        var t = document.getElementById("date_btn");
        t.style.backgroundColor = "#fff";
        t.style.color = "#828282";
        var y = document.getElementById("date_btn2");
        y.style.backgroundColor = "rgb(106, 170, 104)";
        y.style.color = "#fff";
      }
      Week() {
        var x = document.getElementById("date_btn1");
        x.style.backgroundColor = "#fff";
        x.style.color = "#828282";
        var t = document.getElementById("date_btn");
        t.style.backgroundColor = "#fff";
        t.style.color = "#828282";
        var d = document.getElementById("date_btn2");
        d.style.backgroundColor = "#fff";
        d.style.color = "#828282";
        var y = document.getElementById("date_btn3");
        y.style.backgroundColor = "rgb(106, 170, 104)";
        y.style.color = "#fff";
      }
      onDateChanges = (date, date2) => {
        this.setState({ date1: moment(date).format("X") * 1000, date2: moment(date2).format("X") * 1000 })
        var x = document.getElementById("date_btn");
        x.style.backgroundColor = "#fff";
        x.style.color = "#828282";
        var x = document.getElementById("date_btn1");
        x.style.backgroundColor = "#fff";
        x.style.color = "#828282";
        var s = document.getElementById("date_btn2");
        s.style.backgroundColor = "#fff";
        s.style.color = "#828282";
        var c = document.getElementById("date_btn3");
        c.style.backgroundColor = "#fff";
        c.style.color = "#828282";
      }

    render() {

        const columns = [
            //   { name: " # ", field: "hash" },
            { name: "Log Type", field: "log_type" ,  options: { width: 200 }   },
            { name: " Created At  ", field:"created_at",  options: { width: 200 }},
            { name: " Action By User  ", field: "action_by_user" ,  options: { width: 200 }},
            { name: " Affected User  ", field: "affected_user",  options: { width: 200 } },
            { name: " Note  ", field: "note" ,  options: { Width: 900 , headerNoWrap: true,}},
        ];

        const options = {
            selectableRows: false,
            print: false,
            responsive: "scroll",
            rowCursorHand: true,
            sort: false,
            filter: false,
            rowsPerPageOptions: [50,100,200,500,1000],
            download: true,
            rowHover: true,
            border: true
        };

        return (
            <div style={{ width: '100%' }} >
            
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '5%', alignItems: 'center' }}  >
                    <RangePicker onDateSelected={this.onDateChanges}
                        selectTime={true}
                        onClose={() => {
                            this.componentDidMount();
                        }} />
                 
                 <div onClick={() => {
                            this.setState({ date1: 0, date2: 0 })
                            setTimeout(() => {
                              this.componentDidMount();
                              this.allTime();
                            }, 200);
                          }} id="date_btn1" > All Time </div>
                         
                         <div onClick={() => {
                            this.setState({ date1: moment(moment().format('L')).subtract(7, 'day').format("X")* 1000, date2: 0 })
                            setTimeout(() => {
                              this.componentDidMount();
                              this.Week();
                            }, 200);
                            console.log(moment().subtract(7, 'day'));
                            
                          }} id="date_btn3" > Week  </div>
                         
                          <div onClick={() => {
                            this.setState({ date1: moment(moment().format('L')).subtract(1, 'day').format("X")* 1000, date2: moment(moment().format('L')).format("X") * 1000 })
                            setTimeout(() => {
                              this.componentDidMount();
                              this.yesterday();
                            }, 200);
                          }} id="date_btn2" > Yesterday  </div>
                          
                          <div onClick={() => {
                            this.setState({ date1: moment(moment().format('L')).format("X") * 1000, date2: 0 })
                            setTimeout(() => {
                              this.componentDidMount();
                              this.today();
                            }, 200);
                          }} id="date_btn" > Today  </div>

                </div>
                {this.state.spin===true?(      
                          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }} >
             <Lottie
               options={{
                 animationData: loading
               }}
               width={300}
               height={300}
             />
           </div>):(<div>

            {this.state.name==="user"||this.state.name==="department" || this.state.name==="type" || this.state.name==="Task"?( 
                <MuiThemeProvider theme={this.getMuiTheme()}>
                    <MaterialDatatable data={this.state.logData} columns={columns} options={options} />
                </MuiThemeProvider>):(null)}
           </div>)}
    
              
            </div>
       
        );
    }
}

export default DashTable;
