import React from "react";
import axios from "axios";
import Component from "@reactions/component";
import { Pane, Dialog, Spinner } from "evergreen-ui";
import Cookies from "universal-cookie";
import Host from "../../assets/js/Host";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Lottie from "lottie-react-web";
import Context from "../../assets/js/context";
import MaterialDatatable from "material-datatable";
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";
import Select from "react-select";
import { Redirect } from "react-router-dom";
import Changwpass from '../common/Changepass';
import EditUser from '../common/EditUser';
import loading from '../../assets/js/loading.json';
import Permitions from '../common/Permitions';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

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
        // console.log('sss', res.data.data);
      })
      .catch(err => {
        // console.log("error:", err);
      });



    axios({
      url: Host + `roles`,
      method: "GET",
      headers: headers,
    })
      .then(res => {
        // console.log(res.data.data);
        this.setState({ roles: res.data.data })
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
          this.setState({ watt: "no" });
          cookies.set("userslength", res.data.data.length)
      
          let arr = [];
          for (let index = 0; index < res.data.data.length; index++) {
  
            let obj = {
              hash: [index + 1],
              username: res.data.data[index].username,
              name: res.data.data[index].name,
              depa: (res.data.data[index].department.name==="unknown"?(null):(res.data.data[index].department.name)),
              email: res.data.data[index].email,
              Permitions: (<Permitions ids={res.data.data[index].user_id} roles={this.state.roles}  
                 onProfileDelete={() => this.componentDidMount()} />),
              pass: (<Changwpass ids={res.data.data[index].user_id} />),

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
                            url: Host + `users/user/${res.data.data[index].user_id}`,
                            method: "PUT",
                            headers: headers,
                            data: {
                              name: '',
                              email: '',
                              department_id: '',
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
                            .catch(function (error) {
                              setState({ spin: false });

                            });

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
                                url: Host + `users/user/${res.data.data[index].user_id}`,
                                method: "PUT",
                                headers: headers,
                                data: {
                                  name: '',
                                  email: '',
                                  department_id: '',
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
                                .catch(function (error) {
                                  setState({ spin: false });

                                });
                            }}
                          />
                        )
                  }
                </Component>

              ),

              edit: (
                <EditUser ids={res.data.data[index].user_id} onProfileDelete={() => this.componentDidMount()}
                  name={res.data.data[index].name} email={res.data.data[index].email}
                  department={res.data.data[index].department.name} status={res.data.data[index].enabled} data1={this.state.dapts} />
              )
            };
            arr.push(obj);
            // console.log('data11',this.state.arr);
          }
          this.setState({
            Usersdata: arr
          });

        }
      })
      .catch(err => {
        // console.log("error:", err);


      });
  }




  render() {
    const { selectedOption } = this.state;
    const columns = [
      { name: " # ", field: "hash" },
      { name: " Username ", field: "username" },
      { name: " Name  ", field: "name" },
      { name: " Department ", field: "depa" },
      { name: "Email", field: "email" },
      { name: "Permitions", field: "Permitions" },
      { name: " Password", field: "pass" },
      { name: " Status", field: "status" },
      { name: "Edit", field: "edit" },


    ];


    const options = {
      selectableRows: false,
      print: false,
      responsive: "scroll",
      rowCursorHand: false,
      sort: false,
      filter: false,
      rowsPerPageOptions: [5, 10, 50, 100],
      download: false,

    };

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
                                      this.setState({username:"",password:"",dep_nm:"",email:"",name:"",con_password:""})
                                    }
                                  })
                                  .catch(function (error) {
                                    setState({ spin: false })
                                    // console.log(error.data);

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
                                    <div id='dialog_title'>
                                      Name
                                  </div>
                                    <div
                                      style={{
                                        width: "80%",
                                        textAlign: "center"
                                      }}
                                    >
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
                                    <div id='dialog_title' >
                                      Department
                                  </div>

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

                  <MuiThemeProvider theme={this.getMuiTheme()}>
                    <MaterialDatatable
                      data={this.state.Usersdata}
                      columns={columns}
                      options={options}
                    />
                  </MuiThemeProvider>

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

