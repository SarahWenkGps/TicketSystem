import React from 'react';
import {  Row, Col } from 'react-bootstrap';
import Component from "@reactions/component";
import { Checkbox, SelectMenu, Button } from 'evergreen-ui';
import loading from '../../../assets/js/loading.json';
import axios from "axios";
import Cookies from "universal-cookie";
import Lottie from 'lottie-react-web';
import Host from '../../../assets/js/Host';
import NewTask from './NewTask';
import { Redirect } from "react-router-dom";
import Tasknwe1 from './Tasknwe1';
import RangePicker from "react-range-picker";
import moment from 'moment';
import Task_noti from './Task_noti';
import { toast } from "react-toastify";
import Context from "../../../assets/js/context";
import DetialsCustomer from '../CustomersCare/DetialsCustomer';
import { ChromePicker } from 'react-color'
import Axios from 'axios';
const cookies = new Cookies();

class Detials_TaskEdit extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      tasks: [],
      tasks1: [],
      users: [],
      new: [],
      assigned: [],
      inprogress: [],
      closed: [],
      approved: [],
      rejected: [],
      statuses: [],
      archived: [],
      afterfilter: '',
      search: [],
      date: [],
      date1: moment(moment().format('L')).format("X") * 1000,
      date2: 0,
      check: "",
      watt: "yes",
      all: [],
      wait: true,
      range: [],
      //  day : moment().format('L'),
      allday: '',
      spin: false,
      commentLenght: [],
      noti: [],
      status1: 'new',
      checked: true,
      status2: 'in progress',
      checked2: true,
      status3: 'closed',
      checked3: true,
      status4: 'approved',
      checked4: true,
      status5: 'rejected',
      checked5: true,
      status6: 'archived',
      checked6: true,
      selected_AssignFrom: '',
      selected_AssignTo: '',
      selected_taskType: '',
      type: [],
      Geofences:[],
      force:0
    }
    this.filterRef = React.createRef();
  }



  handleClearAllClick = () => {
    this.filterRef.current.clearAll();
  }
  componentDidMount() {
    this.setState({ spin: true })
    if (cookies.get("token")) {
      this.setState({ check: "login" })
    }
    var headers = {
      jwt: cookies.get("token"),
    };
  
    axios({
      url: Host + `tasks/statuses`,
      method: "GET",
      headers: headers,

    })
      .then(res => {
        let arr = [];
        for (let index = 0; index < res.data.data.length; index++) {
          let obj = {
            label: res.data.data[index].status_name,
            value: res.data.data[index].status_id,
          }
          arr.push(obj);
        }
        this.setState({
          statuses: arr
        });
      })

    axios({
      url: Host + `users/users`,
      method: "GET",
      headers: headers,
    })
      .then(res => {
        let arr = [];
        for (let index = 0; index < res.data.data.length; index++) {

          let obj = {
            label: res.data.data[index].name,
            value: res.data.data[index].user_id,
          }
          arr.push(obj);
        }
        this.setState({
          users: arr
        });
      })
      .catch(err => {            
      });

    
     this.getGeofences();
    


    axios({
      url: Host + `task_types`,
      method: "GET",
      headers: headers,
    })
      .then(res => {
        if (res.data.status === false) {
          cookies.remove("token");
          window.location.href = "/"
        } else {
          let arr = [];
          for (let index = 0; index < res.data.data.length; index++) {
            let obj = {
              label: res.data.data[index].name,
              value: res.data.data[index].task_type_id,
            }
            arr.push(obj)
          }
          this.setState({ type: arr })
        }
      })

    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('id');
    axios({
      url: Host + `tasks/task/${myParam}?params={"from_date":0,"to_date":0}`,
      method: "GET",
      headers: headers,
    })
  
      .then(res => {
        console.log(res.data.data);
      
        this.setState({ noti: res.data.data,watt:'no',check:"login" })


      })


  }


  RefreshGeofences(){
    this.setState({force:1})
    setTimeout(() => {
      this.getGeofences();
    }, 200);
  }
  getGeofences() {
    var headers = {
      jwt: cookies.get("token"),
    };
    
    axios({
      url: Host + `tasks/task_geofences?params={"force":${this.state.force}}`,
      method: "GET",
      headers: headers,

    })
      .then(res => {
        this.setState({ Geofences: res.data.data.data })
      })
      .catch(err => {

      })
  }


  render() {
   


    return (
      <Context.Consumer>
        {ctx => {
          if (this.state.check === "notlogin") {
            return <Redirect to="/"></Redirect>;
          } else
            if (
              this.state.check === "login" && this.state.watt === "no"

            ) {
              return (
                <div >

                            
                  <div id="apfot" ref={this.myRef}  >
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center',
                     width: '100%',alignItems:'center' }}>
                    
            


                    
                    
                      <Row style={{ width: '80%', display: 'flex' }}   >
                        {this.state.noti.length > 0 ? (
                          <Col md={12} style={{ marginTop: 40 }}   >

                           {this.state.noti[0].task_title !== "null" ?(
                            <Task_noti id='nnn' name={this.state.noti[0].task_title} time={this.state.noti[0].dead_time} desc={this.state.noti[0].description} id={this.state.noti[0].task_id}
                              users={this.state.users} assigners={this.state.noti[0].assigners} onRefTask={() => this.componentDidMount()}
                              status={this.state.noti[0].status} allstatus={this.state.statuses} createdby={this.state.noti[0].issuer_user.name}
                              created_at={this.state.noti[0].created_at} assigned={this.state.noti[0].assigners.map((p, i) => (p.user_id))}
                              comments_count={this.state.noti[0].comments_count}  type={this.state.type} task_type={this.state.noti[0].task_type} monitor={this.state.noti[0].monitor}
                               files={this.state.noti[0].files} priority={this.state.noti[0].priority} geofences={this.state.noti[0].geofences}
                               Geofences={this.state.Geofences} weight={this.state.noti[0].weight} onRefreshGeo={() => this.RefreshGeofences()}  
                               />
                               ):(

                                <DetialsCustomer id='nnn' name={this.state.noti[0].task_title} time={this.state.noti[0].dead_time} desc={this.state.noti[0].description} id={this.state.noti[0].task_id}
                                users={this.state.users} assigners={this.state.noti[0].assigners} onRefTask={() => this.componentDidMount()}
                                status={this.state.noti[0].status} allstatus={this.state.statuses} createdby={this.state.noti[0].issuer_user.name}
                                created_at={this.state.noti[0].created_at} assigned={this.state.noti[0].assigners.map((p, i) => (p.user_id))}
                                comments_count={this.state.noti[0].comments_count}  type={this.state.type} task_type={this.state.noti[0].task_type} monitor={this.state.noti[0].monitor}
                                 files={this.state.noti[0].files} priority={this.state.noti[0].priority} geofences={this.state.noti[0].geofences}
                                 Geofences={this.state.Geofences} weight={this.state.noti[0].weight} onRefreshGeo={() => this.RefreshGeofences()}  
                                 customer={this.state.noti[0].customer} />
                               )}
                          </Col>
                        ) : (null)}

                  

                      </Row>
                    </div>
                  </div>
                </div>
              );
            } else if (this.state.check === "" || this.state.watt === "yes") {
              return (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }} >
                  <Lottie
                    options={{
                      animationData: loading
                    }}
                    width={300}
                    height={300}
                  />
                </div>
              );
            }
        }}
      </Context.Consumer>
    );
  }
}

export default Detials_TaskEdit;
