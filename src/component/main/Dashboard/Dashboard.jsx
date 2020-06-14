import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import GroupIcon from '@material-ui/icons/Group';
import { Redirect } from 'react-router-dom';
import Lottie from 'lottie-react-web';
import ReactMinimalPieChart from 'react-minimal-pie-chart';
import Context from '../../../assets/js/context';
import Cookies from "universal-cookie";
import DashTable from './DashTable';
import loading from '../../../assets/js/loading.json';
import Host from "../../../assets/js/Host";
import axios from "axios";
import DashboardIcon from '@material-ui/icons/Dashboard';
import AssignmentIcon from '@material-ui/icons/Assignment';
import RangePicker from "react-range-picker";
import moment from 'moment';
import FilterListIcon from '@material-ui/icons/FilterList';
import { toast } from "react-toastify";
const cookies = new Cookies();
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.wrapper = React.createRef();
    this.state = {
      Usersdata: [],
      check: '',
      spin: true,
      data: [],
      new: [],
      inprogress: [],
      closed: [],
      approved: [],
      rejected: [],
      statuses: [],
      archived: [],
      new1: [],
      alldata:[],
      inprogress1: [],
      closed1: [],
      approved1: [],
      rejected1: [],
      statuses1: [],
      archived1: [],
      date1 :moment(moment().format('L')).format("X") * 1000 ,
      date2 :0,
      filter:''
    };
  }
  onDateChanges = (date, date2) => {
    this.setState({date1:moment(date).format("X") * 1000,date2:moment(date2).format("X") * 1000})
    var x = document.getElementById("date_btn");
    x.style.backgroundColor = "#fff";
    x.style.color="#828282";
    var x2 = document.getElementById("date_btn1");
    x2.style.backgroundColor = "#fff";
    x2.style.color="#828282";
  }
 
 
    allTime(){
      var x = document.getElementById("date_btn");
      x.style.backgroundColor = "#fff";
      x.style.color="#828282";
      var y = document.getElementById("date_btn1");
      y.style.backgroundColor = "rgb(106, 170, 104)";
      y.style.color="#fff";
    }

    today(){
      var x = document.getElementById("date_btn1");
      x.style.backgroundColor = "#fff";
      x.style.color="#828282";
      var y = document.getElementById("date_btn");
      y.style.backgroundColor = "rgb(106, 170, 104)";
      y.style.color="#fff";
    }

    componentDidMount() {
    var headers = {
      jwt: cookies.get("token"),

    };
    if (cookies.get("token")) {
      this.setState({ check: 'login' })

    }
    else {
      this.setState({ check: 'notlogin' })
    }

    axios({
      url: Host + `tasks/tasks?params={"from_date":${this.state.date1},"to_date":${this.state.date2}}`,
      method: "GET",
      headers: headers,
    
    })
    
      .then(response => {
        // console.log(response.data);
       this.setState({data1:response.data.data.length})
        let data = response.data.data
     
        let newdata = data.filter(f =>
          f.status === 'new'
        )
        this.setState({
          new1: newdata.length
        })
      
        let archiveddata = data.filter(f =>
          f.status === "archived")
        this.setState({
          archived1: archiveddata.length
        })
        let inprogressdata = data.filter(f =>
          f.status === "in progress")
        this.setState({
          inprogress1: inprogressdata.length
        })
        let closeddata = data.filter(f =>
          f.status === "closed")
        this.setState({
          closed1: closeddata.length
        })
        let approveddata= data.filter(f =>
          f.status==="approved")
          this.setState({approved1:approveddata.length})
    
          let rejecteddata= data.filter(f =>
            f.status==="rejected")
            this.setState({rejected1:rejecteddata.length})
    
      })




    axios({
      url: Host + `users/users`,
      method: "GET",
      headers: headers, 
    })
      .then(res => {
        // console.log(res.data);

        if (res.data.status === false) {
          cookies.remove("token");
          window.location.href = "/"
        } else {


          var arr = [];
          for (let index = 0; index < res.data.data.length; index++) {

            axios({
              url: Host + `tasks/user_tasks/${res.data.data[index].user_id}?params={"from_date":${this.state.date1},"to_date":${this.state.date2}}`,
              method: "GET",
              headers: headers,
            })
              .then(response => {
                // console.log(response.data.data);
                let data = response.data.data.allTasks
                this.setState({
                  alldata: data
                }) 
                let newdata = data.filter(f =>
                  f.status === 'new'
                )
                this.setState({
                  new: newdata
                })

                let archiveddata = data.filter(f =>
                  f.status === "archived")
                this.setState({
                  archived: archiveddata
                })
                let inprogressdata = data.filter(f =>
                  f.status === "in progress")
                this.setState({
                  inprogress: inprogressdata
                })
                let closeddata = data.filter(f =>
                  f.status === "closed")
                this.setState({
                  closed: closeddata
                })
                let approveddata = data.filter(f =>
                  f.status === "approved")
                this.setState({ approved: approveddata })

                let rejecteddata = data.filter(f =>
                  f.status === "rejected")
                this.setState({ rejected: rejecteddata })

                let obj = {
                  hash: [index + 1],
                  name: res.data.data[index].name,
                  alltasks: this.state.alldata.length,
                  issuingTasks:response.data.data.issuingTasks,
                  new: this.state.new.length,
                  inprogress: this.state.inprogress.length,
                  closed: this.state.closed.length,
                  approved: this.state.approved.length,
                  rejected: this.state.rejected.length,
                  archived: this.state.archived.length,

                }
                arr.push(obj);

              })
            // console.log('data11',this.state.arr);
          }
          this.setState({
            Usersdata: arr, spin: false
          });

        }
      })
      .catch(err => {
        toast.error("Network Error")
      
      });
  }

  render() {
    return (

      <Context.Consumer>{ctx => {


        if (this.state.check === "notlogin") {
          return (
            <Redirect to="/"></Redirect>
          )
        } else
          if (this.state.check === "login" && cookies.get("userslength")) {
            return (
              <div id='cuthome'  >
                <div id="dash_filter" >
                
                  {this.state.filter==='yes'?(
 <div style={{ display: 'flex' }}  >
                    <RangePicker onDateSelected={this.onDateChanges} 
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
                      this.setState({ date1: moment(moment().format('L')).format("X") * 1000, date2: 0 })
                      setTimeout(() => {
                        this.componentDidMount();
                        this.today();
                      }, 200);
                    }} id="date_btn" > Today  </div>

                  </div> 
                  ):(
                    null
                  )}
                    <FilterListIcon  style={{cursor:'pointer',color:'#2e6b95'}} onClick={()=>{
                    this.setState({filter:'yes'})
                  }} />
                </div>
                <Row id='dash_row' >

                  {(cookies.get("role")) === "Storekeeper" ? (null) : (
                    <div id='col_dash'  >
                      <div className='card'>
                        <div className='round'>
                          <GroupIcon />
                        </div>
                        <div className='card-body'>
                          <div className='numcard' > {cookies.get("userslength")} </div>
                          <div className='m-l-10 '>
                            <p className='mb-0'>Users</p>
                          </div>
                        </div></div>
                    </div>
                  )}


                  <div id='col_dash' >

                    <div className='card'>
                      <div className='round'>
                        <DashboardIcon />

                      </div>
                      <div className='card-body'>
                        <div className='numcard' > {cookies.get("deplength")} </div>
                        <div className='m-l-10 '>
                          <p className='mb-0'> Departments</p>
                        </div>
                      </div>
                    </div>
                  </div>



                  <div id='col_dash'  >
                    <div className='card'>
                      <div className='round'>
                        <AssignmentIcon />

                      </div>
                      <div className='card-body'>
                        <div className='numcard' >
                          {cookies.get("tasks")}
                        </div>
                        <div className='m-l-10 '>
                          <p className='mb-0'>Tasks </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Row>


                <div id='min_circle'>

                  <div id='circle_div'>
                    <div id='left1' >
                      <div style={{ display: 'flex', padding: 5 }} >
                        <div style={{ width: 20, height: 20, marginRight: 10, backgroundColor: 'rgb(86, 178, 191)' }} />
                        <div> New Tasks <span style={{color:'rgb(86, 178, 191)'}} > {this.state.new1}  </span>  </div>
                      </div>
                      <div style={{ display: 'flex', padding: 5 }}>
                        <div style={{ width: 20, height: 20, marginRight: 10, backgroundColor: '#f06105cc' }} />
                        <div> Inprogress Tasks  <span style={{color:'#f06105cc'}} >  {this.state.inprogress1} </span>   </div>
                      </div>
                      <div style={{ display: 'flex', padding: 5 }}>
                        <div style={{ width: 20, height: 20, marginRight: 10, backgroundColor: '#188718b5' }} />
                        <div> Approved Tasks  <span style={{color:'#188718b5'}} >  {this.state.approved1} </span>    </div>
                      </div>

                    </div>
                    <div id='circle1' >
                      <ReactMinimalPieChart
                        animate
                        animationDuration={500}
                        animationEasing="ease-out"                      
                        cx={50}
                        cy={50}
                        data={[
                          {
                            color: 'rgb(86, 178, 191)',
                            title: `${this.state.new1}`,
                            value: this.state.new1
                          },
                          {
                            color: 'rgba(255, 142, 69, 0.94)',
                            title: `${this.state.inprogress1}`,
                            value: this.state.inprogress1
                          },
                          {
                            color: '#188718b5',
                            title: `${this.state.approved1}`,
                            value: this.state.approved1
                          },
                          {
                            color: 'gray',
                            title: this.state.closed1,
                            value: this.state.closed1
                          },
                          {
                            color: 'black',
                            title: this.state.archived1,
                            value: this.state.archived1
                          },
                          {
                            color: '#da251e',
                            title: this.state.rejected1,
                            value: this.state.rejected1
                          }

                        ]}
                        label={false}
                        labelPosition={50}
                        lengthAngle={-360}
                        lineWidth={100}
                        paddingAngle={0}
                        radius={50}
                        rounded={false}

                        startAngle={0}
                        style={{
                          height: '250px', stroke: '#fff',
                        }}
                        viewBoxSize={[
                          100,
                          100
                        ]}
                      />
                    </div>
                    <div id='left1' >
                      <div style={{ display: 'flex', padding: 5 }} >
                        <div style={{ width: 20, height: 20, marginRight: 10, backgroundColor: 'gray' }} />
                        <div> Closed Tasks <span style={{color:'gray'}} > {this.state.closed1}  </span>     </div>
                      </div>
                      <div style={{ display: 'flex', padding: 5 }}>
                        <div style={{ width: 20, height: 20, marginRight: 10, backgroundColor: '#da251e' }} />
                        <div> Rejected Tasks  <span style={{color:'#da251e'}} >  {this.state.rejected1}  </span>    </div>
                      </div>
                      <div style={{ display: 'flex', padding: 5 }}>
                        <div style={{ width: 20, height: 20, marginRight: 10, backgroundColor: 'black' }} />
                        <div> Archived Tasks <span style={{color:'black'}} >{this.state.archived1}   </span>      </div>
                      </div>

                    </div>
                  </div>


                  <div id='circle_div' style={{display:'none'}}  >
                    <div id='left1' style={{ width: '30%' }} >
                      <div style={{ display: 'flex', padding: 5 }} >
                        <div style={{ width: 20, height: 20, marginRight: 10, backgroundColor: '#cd85fe' }} />
                        <div> All Created Tasks  </div>
                      </div>
                    </div>
                    <div id='circle1' style={{ width: '70%' }} >
                      <ReactMinimalPieChart
                        animate={false}
                        animationDuration={500}
                        animationEasing="ease-out"
                        cx={50}
                        cy={50}
                        data={[
                          {
                            color: '#cd85fe',
                            title: 'One',
                            value: cookies.get("tasks")
                          },

                          {
                            color: '#dfe0e042',
                            title: 'Two',
                            value: 100 - cookies.get("tasks")
                          },       
                        ]}

                        label={false}
                        lengthAngle={360}
                        lineWidth={40}
                        paddingAngle={0}
                        radius={50}
                        totalValue={100}
                        rounded={false}
                        startAngle={0}
                        style={{
                          height: '250px', stroke: '#fff',
                        }}
                        viewBoxSize={[
                          100,
                          100
                        ]}
                      />
                    </div>
                  </div>
                </div>

                <div style={{ width: '96.5%' }} ref={this.wrapper} >
                  {this.state.spin === true ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                      <Lottie
                        options={{
                          animationData: loading
                        }}
                        width={300}
                        height={150}
                        position="absolute"
                      />
                    </div>
                  ) : (
                      <DashTable data={this.state.Usersdata} date1={this.state.date1} date2={this.state.date2} />
         
                      // null
                    )}

                </div>


              </div>

            )
          } else if (this.state.check === "" || cookies.get("userslength") === undefined) {
            return (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}  >

                <Lottie
                  options={{
                    animationData: loading,
                  }}
                  width={300}
                  height={300}
                />
              </div>
            )
          }

      }}

      </Context.Consumer>








    );
  }
}

export default Dashboard;