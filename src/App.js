import React from 'react';
import './App.css';
import {BrowserRouter,Route, Switch} from 'react-router-dom';
import Context from './assets/js/context';
import Login from './component/main/Login';
import Si from './component/main/Si';
import Host from './assets/js/Host';
import { ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './assets/css/test1.css';
import Home from './component/main/Home';
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();
class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      ms: [],
      data1: [],
      Dash:[],
      check:'',
      che:'login',
      new: '',
      inprogress:'',
      closed:'',
      approved:'',
      rejected:'',
      archived:'',
      noti:'',
    };
  }

componentDidMount(){
  if (cookies.get("token")) {
    
 
  const jwt=cookies.get("token");
  var headers = {
    jwt:jwt,
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  };


  axios({
    url: Host + `/notifications`,
    method: "GET",
    headers: headers,
  })
    .then(res => {
     
this.setState({noti:res.data.data.length})
    

    })
setInterval(() => {
  axios({
    url: Host + `/notifications`,
    method: "GET",
    headers: headers,
  })
    .then(res => {
      if (res.data.data.length > this.state.noti) {
        toast.warning("New Notifications")
      }
this.setState({noti:res.data.data.length})
   


    })
}, 10000);





   axios({
    url: Host + `users/users`,
    method: "GET",
   
    headers: headers,
})
.then(res => {
  if (res.data.status===false) {        
    cookies.remove("token");
    window.location.href = "/"
  } else {
  cookies.set("userslength",res.data.data.length)
  this.setState({data:res.data.data})

  }
})

axios({
  url: Host + `departments/departments`,
  method: "GET",
  headers: headers,  
})
.then(res => {
  cookies.set("deplength",res.data.data.length)

})
axios({
  url: Host + `tasks/tasks?params={"from_date":0,"to_date":0}`,
  method: "GET",
  headers: headers,

})

  .then(response => {
    // console.log(response.data);
    cookies.set("tasks",response.data.data.length)
    let data = response.data.data
       
    let newdata = data.filter(f =>
      f.status === 'new'
    )
    this.setState({
      new: newdata.length
    })
  
    let assignedata = data.filter(f =>
      f.status === "archived")
    this.setState({
      archived: assignedata.length
    })
    let inprogressdata = data.filter(f =>
      f.status === "in progress")
    this.setState({
      inprogress: inprogressdata.length
    })
    let closeddata = data.filter(f =>
      f.status === "closed")
    this.setState({
      closed: closeddata.length
    })
    let approveddata= data.filter(f =>
      f.status==="approved")
      this.setState({approved:approveddata.length})

      let rejecteddata= data.filter(f =>
        f.status==="rejected")
        this.setState({rejected:rejecteddata.length})

  })
  .catch(function (error) {

  });


  }}

// this.makeRequest(`tasks/tasks`,`GET`,response=>{
//   cookies.set("tasks",response.data.data.length)
// })
// } }

// makeRequest(endPoint,method,callback) {
//   const jwt=cookies.get("token");
//   var headers = {
//     jwt:jwt,
//     'Access-Control-Allow-Origin': '*',
//     'Content-Type': 'application/json',
//   };
//   axios({
//     url: Host + endPoint,
//     method: method,
//     headers: headers,
//   })
//     .then(response => {
//       callback(response)
//     })
//     .catch(function (error) {
     
//     });
// }



render() {
  return (
    <BrowserRouter >
             <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />
    <Context.Provider value={{
           value: this.state,
           action: {
           }}} >
  <Switch> 
   <Route  exact path ='/' component={Login} />
   <Route path ='/Home' component={Home}   />
   <Route path ='/Users' component={Si} />
   <Route path ='/Dashboard' component={Si} />
   <Route path ='/Tasks' component={Si} />
   <Route path ='/Notifications' component={Si} />
   <Route path ='/Department' component={Si} />
   </Switch> 
</Context.Provider>
    </BrowserRouter>
  );
}}

export default App;
