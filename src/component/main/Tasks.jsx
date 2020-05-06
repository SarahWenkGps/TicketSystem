import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import loading from '../../assets/js/loading.json';
import axios from "axios";
import {SelectMenu,Button} from 'evergreen-ui';
import Component from "@reactions/component";
import Cookies from "universal-cookie";
import Lottie from 'lottie-react-web';
import Host from "../../assets/js/Host";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NewTask from '../common/NewTask';
import { Redirect } from "react-router-dom";
import Tasknwe1 from '../common/Tasknwe1';
const cookies = new Cookies();
class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      tasks: [],
      users: [],
      new: [],
      assigned: [],
      inprogress:[],
      closed:[],
      approved:[],
      rejected:[],
      statuses:[],
      archived:[],
      afterfilter:'',
    }
  }

  componentDidMount() {
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
      url: Host + `tasks/tasks`,
      method: "GET",
      headers: headers,

    })

      .then(response => {
        // console.log('tok',response.data);
        if (response.data.status===false) {        
          cookies.remove("token");
          window.location.href = "/"
        } else {
          
      
        this.setState({ tasks: response.data.data })

        let data = response.data.data
        let newdata = data.filter(f =>
          f.status === "new"
        )
        this.setState({
          new: newdata
        })
        let assignedata = data.filter(f =>
          f.status === "archived")
        this.setState({
          archived: assignedata
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
        let approveddata= data.filter(f =>
          f.status==="approved")
          this.setState({approved:approveddata})

          let rejecteddata= data.filter(f =>
            f.status==="rejected")
            this.setState({rejected:rejecteddata})

          }

      })
      .catch(function (error) {
        // console.log('error',error);
      });

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
        // console.log("error:", err);
      });
  }


  render() {
    return (
      <div >

     

          <div id="apfot" ref={this.myRef}  >


            <div style={{
              display: 'flex', flexDirection: 'column', justifyContent: 'center'
              , width: '100%'
            }}>





              <Tabs defaultActiveKey="New" style={{ display: 'flex', width: '85%', justifyContent: 'space-between' }}  >
                <Tab eventKey="New" title="New" style={{ marginTop: 20 }} >

               

                  <NewTask onProfileDelete={() => this.componentDidMount()} users={this.state.users}  key={1} />
                  {this.state.new.map((item, i) => (
                      
                    <div key={i}>
                      <Tasknwe1 name={item.task_title} time={item.dead_time} desc={item.description}
                        created_at={item.created_at} id={item.task_id} users={this.state.users}  assigners={item.assigners}
                        onProfileDelete={() => this.componentDidMount()} status={item.status} allstatus={this.state.statuses} 
                        />
                    </div>
                  
                  ))}


                </Tab>
               
                <Tab eventKey="In progress" title=" In progress">
                {this.state.inprogress.map((item, i) => (
                    <div key={i}  >
                      <Tasknwe1 name={item.task_title} time={item.dead_time} desc={item.description}
                        created_at={item.created_at} id={item.task_id} users={this.state.users}  assigners={item.assigners}
                        onProfileDelete={() => this.componentDidMount()} status={item.status} allstatus={this.state.statuses}  />
                    </div>
                  ))}
                </Tab>
                <Tab eventKey="Closed" title=" Closed">
                {this.state.closed.map((item, i) => (
                       <React.StrictMode key={i}   >
                    <div  >
                      <Tasknwe1 name={item.task_title} time={item.dead_time} desc={item.description}
                        created_at={item.created_at} id={item.task_id} users={this.state.users}  assigners={item.assigners}
                        onProfileDelete={() => this.componentDidMount()} status={item.status} allstatus={this.state.statuses}  />
                    </div>
                    </React.StrictMode>
                  ))}
                </Tab>
                <Tab eventKey="Approved" title=" Approved">
                {this.state.approved.map((item, i) => (
                       <React.StrictMode key={i}   >
                    <div  >
                      <Tasknwe1 name={item.task_title} time={item.dead_time} desc={item.description}
                        created_at={item.created_at} id={item.task_id} users={this.state.users}  assigners={item.assigners}
                        onProfileDelete={() => this.componentDidMount()} status={item.status} allstatus={this.state.statuses}  />
                    </div>
                    </React.StrictMode>
                  ))}
                </Tab>
                <Tab eventKey="reject" title="Rejected" >
                {this.state.rejected.map((item, i) => (
                       <React.StrictMode key={i}   >
                    <div  >
                      <Tasknwe1 name={item.task_title} time={item.dead_time} desc={item.description}
                        created_at={item.created_at} id={item.task_id} users={this.state.users}  assigners={item.assigners}
                        onProfileDelete={() => this.componentDidMount()} status={item.status} allstatus={this.state.statuses}  />
                    </div>
                    </React.StrictMode>
                  ))}
                </Tab>
                <Tab eventKey="Archived" title="Archived">
                  {this.state.archived.map((item, i) => (
                    <div key={i}  >
                      <Tasknwe1 name={item.task_title} time={item.dead_time} desc={item.description}
                        created_at={item.created_at} id={item.task_id} users={this.state.users}  assigners={item.assigners}
                        onProfileDelete={() => this.componentDidMount()} status={item.status} allstatus={this.state.statuses}  />
                    </div>
                  ))}
                </Tab>

              </Tabs>










            </div>

          </div>
        </div>

    
    );
  }
}

export default Tasks;
