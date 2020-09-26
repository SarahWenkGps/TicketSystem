import React from "react";
import axios from "axios";
import {DropdownButton,Dropdown,ButtonGroup} from 'react-bootstrap';
import { MDBPopover, MDBPopoverBody, MDBBtn, MDBContainer } from "mdbreact";
import Component from "@reactions/component";
import { Pane, Dialog, Spinner ,Menu,Popover,Position,toaster} from "evergreen-ui";
import Cookies from "universal-cookie";
import Host from "../../../assets/js/Host";
import { toast } from "react-toastify";
import Lottie from "lottie-react-web";
import Context from "../../../assets/js/context";
import MaterialDatatable from "material-datatable";
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";
import Select from "react-select";
import { Redirect } from "react-router-dom";
import Changwpass from './Changepass';
import AdminTable from './AdminTable.jsx';
import UserTable from './UserTable';
import EditUser from './EditUser';
import loading from '../../../assets/js/loading.json';
import Permitions from './Permitions';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import moment from 'moment';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Popper from '@material-ui/core/Popper';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';

const cookies = new Cookies();

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: '1px dotted pink',
    color: state.isSelected ? 'red' : 'blue',

  }),
  control: () => ({
    // none of react-select's styles are passed to <Control />
    width: '100%',
    border: '1px solid #ababab',
    borderRadius: 5,
    padding: 0,
    display: 'flex'
  }),
  container: () => ({

    width: '80%',
    position: 'relative',
    boxSizing: 'border-box',
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  }
}
class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verified: "",
      data: [],
      Usersdata: [],
      Admindata:[],
      Users: [],
      check: "",
      watt: "yes",
      email: '',
      name: '',
      username: '',
      password: '',
      spin: false,
      dapts: [],
      dep_nm: '',
      roles:[],
      con_password:'',
      TelePhone:'',
      phone:'',
      Birthdate:'',
      anchorEl:null,
      open:'',
      isVisible:false
    };

  }

  getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        MuiPaper: {
          elevation4: {
            width: "90%"
          }
        },
        MuiTableCell: {
          head: {
            color: '#2e6b95',
            fontSize: '15px',
            fontWeight: '700'
          },
          root: {
            textAlign: 'center'
          }
        },
      }
    });

isVisible(){
  this.setState({isVisible:(this.state.isVisible==='flex'?('none'):('flex'))})
  var x = document.getElementById("stst");
  x.style.display = `${this.state.isVisible}`;
 
}
  componentDidMount() {
    if (cookies.get("token")) {
      this.setState({ check: "login" })
    }
    //  const { selectedOption } = this.state;
    const jwt = cookies.get("token");
    var headers = {
      jwt: jwt,
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    };

    axios({
      url: Host + `departments/departments`,
      method: "GET",
      headers: headers,
    })
      .then(res => {
      // console.log('department', res.data.data);
        let arr = [];
        for (let index = 0; index < res.data.data.length; index++) {
          let obj = {
            label: res.data.data[index].name,
            value: res.data.data[index].dep_id,
          }
          arr.push(obj);
        }
        this.setState({
          dapts: arr
        });
        
      })
      .catch(err => {
      
       
      });



    axios({
      url: Host + `roles`,
      method: "GET",
      headers: headers,
    })
      .then(res => {
        // console.log('roles',res.data.data);
        this.setState({ roles: res.data.data })
      })





    axios({
      url: Host + `users/users`,
      method: "GET",

      headers: headers,
    })
      .then(res => {
        console.log('users',res.data.data);       
        if (res.data.status === false) {
          cookies.remove("token");
          window.location.href = "/"
        } else {
          this.setState({ watt: "no" });
          cookies.set("userslength", res.data.data.length)
      
          let arr = []; let arrUser = [];
          for (let index = 0; index < res.data.data.length; index++) {
         if (JSON.parse(localStorage.getItem("roles")).includes(2)) {
           
        
  
            let obj = {
              hash: [index + 1],
              username: res.data.data[index].username,
              name: res.data.data[index].name,
              depa: (res.data.data[index].department.name==="unknown"?(null):(res.data.data[index].department.name)),
              email: res.data.data[index].email,
              ip_phone:res.data.data[index].ip_phone,
              phone:res.data.data[index].phone,
              birthdate:(res.data.data[index].birthdate===null?(null):(moment(res.data.data[index].birthdate).format('L'))),
              last_login:res.data.data[index].last_login===null?(null):( moment(res.data.data[index].last_login).format('lll') ) ,
            

              status: (
                <Component initialState={{ isShown: true, spin: false }}>
                  {({ state, setState }) =>
                    state.spin ? (
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >  <Spinner size={16} /></div>
                    ) : res.data.data[index].enabled === 1 ? (
                      <DoneIcon
                        style={{
                          color: "#5bb061",
                          fontSize: 30,
                          cursor: "pointer"
                        }}
                        onClick={() => {
                          setState({ spin: true });
                          var headers = {
                            jwt: cookies.get("token")
                          };
                          axios({
                            url: Host + `users/user/status/${res.data.data[index].user_id}`,
                            method: "PUT",
                            headers: headers,
                            data: {                            
                              enabled: 0
                            },
                          })
                            .then(response => {
                              // console.log(response.data);
                              if (response.data.status === false) {
                                toast.error(response.data.data.message.text)
                                setState({ spin: false })
                              }
                              else if (response.data.status === true) {
                                toast.success("User Disables successfully");
                                setState({ spin: false });
                                this.componentDidMount();
                              }
                            })                          
                        }}
                      />
                    ) : (
                          <CloseIcon
                            style={{
                              color: "rgb(169, 16, 16)",
                              fontSize: 30,
                              cursor: "pointer"
                            }}
                            onClick={() => {
                              setState({ spin: true });

                              axios({
                                url: Host + `users/user/status/${res.data.data[index].user_id}`,
                                method: "PUT",
                                headers: headers,
                                data: {
                                  enabled: "1"
                                },
                              })
                                .then(response => {
                                  if (response.data.status === false) {
                                    toast.error(response.data.data.message.text)
                                    setState({ spin: false })
                                  }
                                  else if (response.data.status === true) {
                                    toast.success("User enabled successfully");
                                    setState({ spin: false });
                                    this.componentDidMount();
                                  }
                                })                            
                            }}
                          />
                        ) }
                </Component>
              ),

              edit: (                            
                     <div>

    <DropdownButton
        as={ButtonGroup}
        key={'down'}
        id={`dropdown-button-drop-${'down'}`}
        drop={'down'}
        variant="secondary"
        title={` Edit User`}
      >
        <Dropdown.Item eventKey="1" style={{display:'flex',justifyContent:'center'}} >      <EditUser ids={res.data.data[index].user_id} onProfileDelete={() => this.componentDidMount()} 
                 name={res.data.data[index].name} email={res.data.data[index].email}
                department={res.data.data[index].department.name} status={res.data.data[index].enabled} data1={this.state.dapts}
               phone={res.data.data[index].phone}  ip_phone={res.data.data[index].ip_phone}  birthdate={res.data.data[index].birthdate}  /></Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item eventKey="2" style={{display:'flex',justifyContent:'center'}}  >      <Changwpass ids={res.data.data[index].user_id} />  </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item eventKey="3" style={{display:'flex',justifyContent:'center'}}  >  <Permitions ids={res.data.data[index].user_id} roles={this.state.roles}  permitions={res.data.data[index].premissions.map((p,i)=>(
       p.role_id ))}
      onProfileDelete1={() => this.componentDidMount()}/></Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item eventKey="4" style={{display:'flex',justifyContent:'center'}}  >   <div className='iconUserDialog' onClick={()=>{window.open(`https://www.iraq-gis.com/` +`LogTable?id=${res.data.data[index].user_id}&name=${"user"}`, '_blank')}}   > 
                  <img src={require('../../../assets/img/log.png')} alt='img' style={{height:25}} /></div> </Dropdown.Item>
      </DropdownButton>
                    </div>                                                           
                )
            };
            arr.push(obj);
            this.setState({ Admindata: arr });
         }else{
           
            let obj1 = {
              hash: [index + 1],
              username: res.data.data[index].username,
              name: res.data.data[index].name,
              depa: (res.data.data[index].department.name==="unknown"?(null):(res.data.data[index].department.name)),
              email: res.data.data[index].email,
              ip_phone:res.data.data[index].ip_phone,
              phone:res.data.data[index].phone,
              birthdate:(res.data.data[index].birthdate===null?(null):(moment(res.data.data[index].birthdate).format('L'))),
             
          }
          arrUser.push(obj1);
        }
          this.setState({ Usersdata:arrUser});
      } 
        }
      })
      .catch(err => {
        // this.componentDidMount()                 
      });
  }

   handleClick = (event) => {
    // (this.state.anchorEl ? null : event.currentTarget);
    this.setState({open:'open',anchorEl:event.currentTarget})
  };


  render() {
    const { selectedOption } = this.state;

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
                <div id="main_sec">
               
         { JSON.parse(localStorage.getItem("roles")).includes(1)  ? (
                 <div id="main_row">
                 <div style={{ width: 150 }}>
                   <Component initialState={{ isShown: false, spin: false }}>
                     {({ state, setState }) => (
                       <Pane>
                         <Dialog
                           isShown={state.isShown}
                           onCloseComplete={() => setState({ isShown: false })}
                           hasHeader={false}
                           shouldCloseOnOverlayClick={false}
                           confirmLabel="Save"
                           cancelLabel="Cancel"
                           onConfirm={() => {
                             if (this.state.username.length < 3) {
                            return   toast.warning('userename must be more than 3 char')
                             }
                               if (this.state.name.length < 3) {
                                 return  toast.warning('name must be more than 3 char')
                             }
                               if (this.state.password.length < 3) {
                                 return  toast.warning('password must be more than 3 char')
                             }
                             if (this.state.email.length < 5) {
                               return  toast.warning('mail must be more than 5 char')
                           }
                              if (this.state.con_password !== this.state.password) {
                               return   toast.warning('please confirm password')
                           }

                           var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                           if (reg.test(this.state.email) == false) 
                           {
                             return  toast.warning('Invalid Email Address');
                              
                           }
                             setState({ spin: true })



                             const jwt = cookies.get("token");
                             var headers = {
                               'jwt': jwt,
                               'Access-Control-Allow-Origin': '*',
                               'Content-Type': 'application/json',
                             };

                             axios({
                               url: Host + `users/user`,
                               method: "POST",

                               headers: headers,
                               data: {
                                 username: this.state.username,
                                 password: this.state.password,
                                 department_id: this.state.dep_nm,
                                 email: this.state.email,
                                 name: this.state.name,
                                 phone:this.state.phone,
                                 ip_phone:this.state.TelePhone,
                                 birthdate:this.state.Birthdate

                               }
                             })
                               .then(response => {
                                 // console.log(response.data);
                                 if (response.data.status === false) {
                                   toast.error(response.data.data.message.text)
                                   setState({ spin: false })
                                 }
                                 else if (response.data.status === true) {
                                   setState({ isShown: false, spin: false })
                                   this.componentDidMount();
                                   this.setState({username:"",password:"",dep_nm:"",email:"",name:"",con_password:"",phone:"",Birthdate:"",TelePhone:""})
                                 }
                               })
                               .catch(err => {
                                 toast.error("Network Error")
                                 setState({ spin: false });
                               });
                           }}
                         >
                           <div>
                             <div id="new_itemnav"> Create New User </div>
                             <div className="mod1">
                               <div id='dailog' style={{ marginTop: 15 }} >
                                 <div id='dialog_title'>
                                   Username </div>
                                 <div style={{ width: "80%", textAlign: "center" }}>
                                   <input type="text" id="field2" placeholder="Username"
                                     value={this.state.username}
                                     onChange={e => {
                                       this.setState({ username: e.target.value })
                                     
                                     }} />
                                 </div>
                               </div>

                               <div id='dailog'>
                                 <div id='dialog_title'>Name</div>
                                 <div style={{ width: "80%", textAlign: "center" }}>
                                   <input
                                     type="text"
                                     id="field2"
                                     placeholder="Name"
                                     value={this.state.name}
                                     onChange={e => {
                                       this.setState({ name: e.target.value })

                                     }}
                                   />
                                 </div>
                               </div>
                               <div id='dailog' >
                                 <div id='dialog_title' > Password </div>
                                 <div style={{ width: "80%", textAlign: "center" }}>
                                   <input
                                     type="password"
                                     id="field2"
                                     placeholder="******"
                                     value={this.state.password}
                                     onChange={e => {
                                       this.setState({ password: e.target.value }) }}
                                   />
                                 </div>
                               </div>

                               <div id='dailog' >
                                         <div id='dialog_title' >   Confirm  Password  </div>
                                        <div style={{ width: '80%', textAlign: 'center' }} >
                                             <input type='password' id='field2' placeholder=' ****** '
                                                 value={this.state.con_password} onChange={(e) =>
                                                     this.setState({ con_password: e.target.value })} /> </div>
                                     </div>

                               <div id='dailog' >
                                 <div id='dialog_title'> Email </div>
                                 <div style={{ width: "80%", textAlign: "center" }}>
                                   <input type="email" id="field2" placeholder="Email"
                                     value={this.state.email}
                                     onChange={e => {
                                       this.setState({ email: e.target.value })

                                     }} />
                                 </div>
                               </div>

                               <div id='dailog' >
                                 <div id='dialog_title'> Phone </div>
                                 <div style={{ width: "80%", textAlign: "center" }}>
                                   <input type="number" id="field2" placeholder="964**********"
                                     value={this.state.phone}
                                     onChange={e => {
                                       this.setState({ phone: e.target.value })
                                     }} />
                                 </div>
                               </div>

                               <div id='dailog' >
                                 <div id='dialog_title'> Ext. </div>
                                 <div style={{ width: "80%", textAlign: "center" }}>
                                   <input type="number" id="field2" placeholder="***"
                                     value={this.state.TelePhone}
                                     onChange={e => {
                                       this.setState({ TelePhone: e.target.value })
                                     }} />
                                 </div>
                               </div>
                               <div id='dailog' >
                                 <div id='dialog_title'> Birthdate </div>
                                 <div style={{ width: "80%", textAlign: "center" }}>
                                   <input type="date" id="field2" placeholder="Birthdate"
                                     value={this.state.Birthdate}
                                     onChange={e => {
                                       this.setState({ Birthdate: e.target.value })
                                     }} />
                                 </div>
                               </div>

                               <div id='dailog' >
                                 <div id='dialog_title' > Department </div>
                                 <div style={{ width: "80%", textAlign: "center", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                   <Select onChange={e => { this.setState({ dep_nm: e.value }); }}
                                     value={selectedOption}
                                     styles={customStyles}
                                     options={this.state.dapts}
                                   />
                                 </div>
                               </div>
                               {state.spin ? (
                                 <div style={{ width: "100%", position: "absolute" }}>
                                   <Lottie
                                     options={{
                                       animationData: loading
                                     }}
                                     width={300}
                                     height={150}
                                     position="absolute"
                                   />
                                 </div>
                               ) : null}
                             </div>
                           </div>
                         </Dialog>

                         <div
                           onClick={() => setState({ isShown: true })}
                           id="new"
                         >
                           New
                       </div>
                       </Pane>
                     )}
                   </Component>
                 </div>


               </div>             
                ) : (
                  null      
                  )}

                

           
               

                       { JSON.parse(localStorage.getItem("roles")).includes(2)  ? (
                 <AdminTable data={this.state.Admindata}/>   
                              
                ) : (
                  <UserTable data={this.state.Usersdata}/>         
                  )}
               

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

export default Users;

