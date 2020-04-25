import React from 'react';
import './App.css';
import {BrowserRouter,Route, Switch} from 'react-router-dom';
import Context from './assets/js/context';
import Login from './component/main/Login';
import Si from './component/main/Si';
import Host from './assets/js/Host';
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './assets/css/test1.css';
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
    url: Host + `users/users`,
    method: "GET",
   
    headers: headers,
})
.then(res => {
  cookies.set("userslength",res.data.data.length)
  this.setState({data:res.data.data})

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
  url: Host + `tasks/tasks`,
  method: "GET",
  headers: headers,

})

  .then(response => {
    console.log(response.data);
    cookies.set("tasks",response.data.data.length)

  })
  .catch(function (error) {

  });

} }

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
   <Route path ='/Home' component={Si}   />
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
