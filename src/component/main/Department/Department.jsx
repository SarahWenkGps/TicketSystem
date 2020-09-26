import React from "react";
import axios from "axios";
import Component from "@reactions/component";
import { Pane, Dialog } from "evergreen-ui";
import Cookies from "universal-cookie";
import Host from "../../../assets/js/Host";
import { toast } from "react-toastify";
import Lottie from "lottie-react-web";
import Context from "../../../assets/js/context";
import MaterialDatatable from "material-datatable";
import { Redirect } from "react-router-dom";
import loading from '../../../assets/js/loading.json';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import EditDep from "./EditDep";
const cookies = new Cookies();


class Departmant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verified: "",
      data: [],
      data5: [],
      uss: [],
      check: "",
      watt:"yes",
      dept: [],
      dapts: [],
      spin: false,
      dpartmentdata:'',
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
        MuiTableCell:{
          head:{

            color: '#2e6b95',
            fontSize:'15px',
            fontWeight:'700'

          },
          root:{
            textAlign:'center' ,
         
           }
      },
     
      }
    });

 
    componentDidMount() {
    
      if (cookies.get("token")) {
        this.setState({ check: "login"})
      }
      const jwt=cookies.get("token");
     
       var headers = {
        jwt:jwt,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      };
    
       axios({
        url: Host + `departments/departments`,
        method: "GET",
        headers: headers,  
    })
      .then(res => {
        if (res.data.status===false) {        
          cookies.remove("token");
          window.location.href = "/"
        } else {
        this.setState({ watt: "no" });
        let arr = [];
        for (let index = 0; index < res.data.data.length; index++) {
          let obj = {
            hash:[index +1],
            Department: res.data.data[index].name,
    
            edit: (
           <EditDep  ids={res.data.data[index].dep_id} onProfileDelete={ () => this.componentDidMount() } 
           department={res.data.data[index].name} 
           />
            ),
            delete:(  <i
              className="far fa-trash-alt"
              id="del"
              onClick={() => {
                // this.delete(res.data.data[index].dep_id);
                if(window.confirm('Delete the Department?')){this.delete(res.data.data[index].dep_id)};
              }}
            ></i>),
            log:(  <div className='dep_icons'  > <div className='iconUserDialog' onClick={()=>{window.open(`https://www.iraq-gis.com/`+`LogTable?id=${res.data.data[index].dep_id}&name=${"department"}`,'_blank')}}   >   <img src={require('../../../assets/img/log.png')} alt='img' style={{height:25}} /></div></div> )
          };
          arr.push(obj);
          // console.log('data11',this.state.arr);
        }
        this.setState({
          dpartmentdata: arr
        });
      
      }
      })
      .catch(err => {
        toast.error("Network Error")
  
      });
  }



 
  delete(id) {
  
    var headers = {
      "Content-Type": "application/json",
      jwt: cookies.get("token")
    };
    axios({
      url: Host + `departments/department/${id}`,
      method: "DELETE",
      headers: headers
    })
      .then(response => {
        if (response.data.status===false) {
          toast.error(response.data.data.text)
         
      }
      else if (response.data.status===true) {
          this.componentDidMount();
     toast.success("deleted successfully")
      }
      })
      .catch(err => {
        toast.error("Network Error")
        
      });
  }

  render() {
   
    const columns = [
      { name: " # ", field: "hash" },
      { name: " Department ", field: "Department" },
      { name: "Edit", field: "edit" },
      { name: "Delete", field: "delete" },
      {name:"Log", field:"log",  options: {
        width: 200,
    },}
    
    ];
  

    const options = {
      selectableRows: false,
      print: false,
      responsive: "scroll",
      rowCursorHand: false,
      sort: false,
      filter: false,
       rowsPerPageOptions:[5,10,50,100],
      download:false,
   
    };

    return (
      <Context.Consumer>
        {ctx => {
         if (this.state.check === "notlogin") {
          return <Redirect to="/"></Redirect>;
        } else
        if (
          this.state.check==="login" && this.state.watt==="no"
            
          ) {
            return (
              <div id="main_sec">
                <div id="main_row">
                  <div style={{ width: 150 }}>
                    <Component initialState={{ isShown: false,spin:false,Department:'' }}>
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
                             if (state.Department.length <3) {
                               toast.warning('department mast be more than 3 char')
                             }
                             else{
                              setState({ spin: true });
                               
    var headers = {
      Accept: "application/json",
      jwt: cookies.get("token")
    };
 
    axios({
      url: Host + `departments/department`,
      method: "POST",
      headers: headers,
      data:{
        dep_name:state.Department
      }
    })
      .then(response => {
        if (response.data.status===false) {
          toast.error(response.data.data.text)
          setState({ spin: false })
      }
      else if (response.data.status===true) {
        toast.success("Department added successfully");
        setState({ spin: false,Department:"" , isShown: false}); 
        this.componentDidMount();
      }
      })
      .catch(err => {
        toast.error("Network Error")
        setState({ spin: false });
      });
                            }}}
                          >
                            <div>
                              <div id="new_itemnav"> Create New Department </div>
                              <div className="mod1">
                                <div id='dailog' style={{marginTop:15}} >
                                  <div id='dialog_title'>
                                  Department </div>
                                  <div style={{ width: "80%",textAlign: "center"}}>
                                    <input type="text" id="field2" placeholder="Department"
                                      value={state.Department}
                                      onChange={e =>{
                                        setState({ Department: e.target.value})
                                      
                                      }}/>
                                  </div>
                                </div>

                               
                                   {state.spin ? (
                                         <div style={{ width: "100%",position: "absolute"}}>
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
                    data={this.state.dpartmentdata}
                    columns={columns}
                    options={options}
                  />
                </MuiThemeProvider>

              
              </div>
            );
          } else if (this.state.check === "" || this.state.watt==="yes" ) {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
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

export default Departmant;

