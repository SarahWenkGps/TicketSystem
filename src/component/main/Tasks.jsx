import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import loading from '../../assets/js/loading.json';
import axios from "axios";
import Component from "@reactions/component";
import Cookies from "universal-cookie";
import Lottie from 'lottie-react-web';
import Host from "../../assets/js/Host";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NewTask from '../common/NewTask';
import Tasknwe1 from '../common/Tasknwe1';
const cookies = new Cookies();
class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      users:[]
    }
  }

  componentDidMount() {
    var headers = {
      jwt: cookies.get("token")
    };
    axios({
      url: Host + `tasks/tasks`,
      method: "GET",
      headers: headers,

    })

      .then(response => {
        console.log(response.data);
        this.setState({ tasks: response.data.data })

      })
      .catch(function (error) {

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
            value:res.data.data[index].user_id,
          }
          arr.push(obj);
        }
        this.setState({
          users: arr
        });
       
        })

        .catch(err => {
          console.log("error:", err);
        });
  }


  render() {
    return (
      <div >

        <div>

          <div id="apfot">


            <div style={{
              display: 'flex', flexDirection: 'column', justifyContent: 'center'
              , width: '100%'
            }}>





              <Tabs defaultActiveKey="New" style={{ display: 'flex', width: '85%', justifyContent: 'space-between' }}  >
                <Tab eventKey="New" title="New" style={{ marginTop: 20 }} >




                  <NewTask onProfileDelete={() => this.componentDidMount()} users={this.state.users}  />
                  {this.state.tasks.map((item, i) => (
                    <div key={i}  >
                      <Tasknwe1 name={item.name} time={item.dead_time} desc={item.description}
                        created_at={item.created_at} id={item.task_id} users={this.state.users} />
                    </div>
                  ))}


                </Tab>
                <Tab eventKey="Asigned" title=" Asigned">
                  <h1>Asigned</h1>
                </Tab>
                <Tab eventKey="In progress" title=" In progress">
                  <h1>In progress</h1>
                </Tab>
                <Tab eventKey="Closed" title=" Closed">
                  <h1>Closed</h1>
                </Tab>
                <Tab eventKey="Approved" title=" Approved">
                  <h1>Approved</h1>
                </Tab>
                <Tab eventKey="reject" title="Rejected" >

                  <h1>ddddddddddd</h1>



                </Tab>
              </Tabs>










            </div>

          </div>
        </div>

      </div>
    );
  }
}

export default Tasks;
