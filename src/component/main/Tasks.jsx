import React from 'react';
import { Tab, Tabs ,Row,Col} from 'react-bootstrap';
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
import { filterData, SearchType } from 'filter-data';
import { useTheme, fade, makeStyles } from '@material-ui/core/styles';
import RangePicker from "react-range-picker";
import moment from 'moment';
import Context from "../../assets/js/context";
import {extendMoment} from 'moment-range';
const cookies = new Cookies();

class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      tasks: [],
      tasks1: [],
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
     search:[],
     date:[],
     date1:[],
     date2:[],
     check: "",
     watt: "yes",
    all:[],
    wait:true,
    range:[],
     start : moment("2018-10-14", 'YYYY-MM-DD'),
    end : moment("2018-10-20", 'YYYY-MM-DD'),
    
    }
    this.filterRef = React.createRef();
  }

 
 
  handleClearAllClick = () => {
    this.filterRef.current.clearAll();
  }
  componentDidMount() {
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
      url: Host + `tasks/tasks`,
      method: "GET",
      headers: headers,
      data:{
        from_date:" 2020-05-06",
        to_date: ""
     
    }
    })
 
   
      .then(response => {
        this.setState({ watt: "no" });
        if (response.data.status===false) {        
          cookies.remove("token");
          window.location.href = "/"
        } else {
        
      
        this.setState({ tasks: response.data.data })

        let data = response.data.data
       
        let newdata = data.filter(f =>
          f.status === 'new'
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
  handleInput =(e) =>{
    console.log(e.target.value);
    this.setState({search:e.target.value})
  }

 
   onDateChanges = (date, date2) => {
   console.log(" date is ",  moment(date).format("YYYY-MM-DD"), moment(date2).format("YYYY-MM-DD"));
   this.setState({date1:moment(date).format("YYYY-MM-DD"),date2:moment(date2).format("YYYY-MM-DD")})}
  render() {
    let filter =this.state.tasks.filter((dog) => {
     
      return ( ( dog.task_title.includes(this.state.search) || dog.status.includes(this.state.search) ) && ( dog.dead_time.includes(this.state.date1) || dog.dead_time.includes(this.state.date2) ))
     
    })

    let filter2 =this.state.new.filter((dog) => {
     
      return ( ( dog.task_title.includes(this.state.search) || dog.status.includes(this.state.search) ) && ( dog.dead_time.includes(this.state.date1) || dog.dead_time.includes(this.state.date2) ))
     
    })
    let filter3 =this.state.inprogress.filter((dog) => {
     
      return ( ( dog.task_title.includes(this.state.search) || dog.status.includes(this.state.search) ) && ( dog.dead_time.includes(this.state.date1) || dog.dead_time.includes(this.state.date2) ))
     
    })
    let filter4 =this.state.closed.filter((dog) => {
     
      return ( ( dog.task_title.includes(this.state.search) || dog.status.includes(this.state.search) ) && ( dog.dead_time.includes(this.state.date1) || dog.dead_time.includes(this.state.date2) ))
     
    })
    let filter5 =this.state.approved.filter((dog) => {
     
      return ( ( dog.task_title.includes(this.state.search) || dog.status.includes(this.state.search) ) && ( dog.dead_time.includes(this.state.date1) || dog.dead_time.includes(this.state.date2) ))
     
    })
    let filter6 =this.state.rejected.filter((dog) => {
     
      return ( ( dog.task_title.includes(this.state.search) || dog.status.includes(this.state.search) ) && ( dog.dead_time.includes(this.state.date1) || dog.dead_time.includes(this.state.date2) ))
     
    })
    let filter7 =this.state.archived.filter((dog) => {
     
      return ( ( dog.task_title.includes(this.state.search) || dog.status.includes(this.state.search) ) && ( dog.dead_time.includes(this.state.date1) || dog.dead_time.includes(this.state.date2) ))
     
    })
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


            <div style={{
              display: 'flex', flexDirection: 'column', justifyContent: 'center'
              , width: '100%'
            }}>


<div id='searchdiv' >
<input type='text'  onChange={this.handleInput} placeholder='Search' id='search' />
<RangePicker onDateSelected={this.onDateChanges}   />
</div>
              <Tabs defaultActiveKey="All Tasks" style={{ display: 'flex', width: '85%', justifyContent: 'space-between' }}  >
                <Tab eventKey="All Tasks" title="All Tasks" style={{ marginTop: 20 }} >

    
    

                 
                 <NewTask onProfileDelete={() => this.componentDidMount()} users={this.state.users}  key={1} />
               
              
                 <Row style={{width:'100%',display:'flex'}}   >
                
                      {filter.map((item, i) => (
                         <Col md={6} key={i}  >
                     
                        <Tasknwe1  name={item.task_title} time={item.dead_time} desc={item.description}
                          created_at={item.created_at} id={item.task_id} users={this.state.users}  assigners={item.assigners}
                          onProfileDelete={() => this.componentDidMount()} status={item.status} allstatus={this.state.statuses} 
                       createdby={item.issuer_user.name}    />
                 
                 </Col>   
                    ))}
         
</Row>

                </Tab>
               
                <Tab eventKey="new" title="New">
              
                <Row style={{width:'100%',display:'flex'}}   >
                {filter2.map((item, i) => (
                    
                       <Col md={6} key={i}  >
                      <Tasknwe1 name={item.task_title} time={item.dead_time} desc={item.description}
                        created_at={item.created_at} id={item.task_id} users={this.state.users}  assigners={item.assigners}
                        onProfileDelete={() => this.componentDidMount()} status={item.status} allstatus={this.state.statuses} 
                        createdby={item.issuer_user.name}  />
                  </Col>
                  ))}
                  </Row>
                </Tab>
                <Tab eventKey="In progress" title=" In progress">
              
              <Row style={{width:'100%',display:'flex'}}   >
              {filter3.map((item, i) => (
                  
                     <Col md={6} key={i}  >
                    <Tasknwe1 name={item.task_title} time={item.dead_time} desc={item.description}
                      created_at={item.created_at} id={item.task_id} users={this.state.users}  assigners={item.assigners}
                      onProfileDelete={() => this.componentDidMount()} status={item.status} allstatus={this.state.statuses} 
                      createdby={item.issuer_user.name}  />
                </Col>
                ))}
                </Row>
              </Tab>
                <Tab eventKey="Closed" title=" Closed">
                <Row style={{width:'100%',display:'flex'}}   >
                {filter4.map((item, i) => (
                  <Col md={6} key={i}  >
                    
                      <Tasknwe1 name={item.task_title} time={item.dead_time} desc={item.description}
                        created_at={item.created_at} id={item.task_id} users={this.state.users}  assigners={item.assigners}
                        onProfileDelete={() => this.componentDidMount()} status={item.status} allstatus={this.state.statuses} 
                        createdby={item.issuer_user.name}  />
                  </Col>
                  ))}
                    </Row>
                </Tab>
                <Tab eventKey="Approved" title=" Approved">
                <Row style={{width:'100%',display:'flex'}}   >
                {filter5.map((item, i) => (
                     <Col md={6} key={i}  >
                      <Tasknwe1 name={item.task_title} time={item.dead_time} desc={item.description}
                        created_at={item.created_at} id={item.task_id} users={this.state.users}  assigners={item.assigners}
                        onProfileDelete={() => this.componentDidMount()} status={item.status} allstatus={this.state.statuses} 
                        createdby={item.issuer_user.name}  />
                     </Col>
                  ))}
                   </Row>
                </Tab>
                <Tab eventKey="reject" title="Rejected" >
                <Row style={{width:'100%',display:'flex'}}   >
                {filter6.map((item, i) => (
                      <Col md={6} key={i}  >
                      <Tasknwe1 name={item.task_title} time={item.dead_time} desc={item.description}
                        created_at={item.created_at} id={item.task_id} users={this.state.users}  assigners={item.assigners}
                        onProfileDelete={() => this.componentDidMount()} status={item.status} allstatus={this.state.statuses}
                        createdby={item.issuer_user.name} />
                      </Col>
                  ))}
                  </Row>
                </Tab>
                <Tab eventKey="Archived" title="Archived">
                <Row style={{width:'100%',display:'flex'}}   >
                  {filter7.map((item, i) => (
                 <Col md={6} key={i}  >
                      <Tasknwe1 name={item.task_title} time={item.dead_time} desc={item.description}
                        created_at={item.created_at} id={item.task_id} users={this.state.users}  assigners={item.assigners}
                        onProfileDelete={() => this.componentDidMount()} status={item.status} allstatus={this.state.statuses} 
                        createdby={item.issuer_user.name}  />
                   </Col>
                  ))}
                     </Row>
                </Tab>

              </Tabs>










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

export default Tasks;
