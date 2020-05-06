import React from 'react';
import { Pane, Dialog } from 'evergreen-ui';
import Component from '@reactions/component';
import axios from "axios";
import Cookies from "universal-cookie";
import Host from "../../assets/js/Host";
import Lottie from "lottie-react-web";
import Select from "react-select";
import loading from '../../assets/js/loading.json';
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
      padding: 5,
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
class EditUser extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      value: {
       
        verified: "",
        data: [],
        Usersdata:[],
        Users:[],
        check: "login",
        email:'',
        name:'',
        username:'',
        password:'',
        spin: false,

      }
    };
  }







  render() {
    const { selectedOption } = this.state;
    return (
      <div ref={this.myRef}   >

        <Component initialState={{
          isShown: false, spin: false,
          name: this.props.name,
          email:this.props.email,
          department:this.props.department,
          status:this.props.status,
          depas:'',
          dep_nm:''
        }}>
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

                 
                  setState({ spin: true })

                  var headers = {
                    jwt: cookies.get("token")
                  };
                 
              
                  axios({
                    url: Host + `users/user/${this.props.ids}`,
                    method: "PUT",
                    headers: headers,
                    data: {
                     name:state.name,
                     email:state.email,
                     department_id:state.dep_nm,
                     enabled:state.status
                    },
                  })
              
                    .then(response => {
console.log(response.data);

                      if (response.data.status===false) {
                        toast.error(response.data.data.text)
                        setState({ spin: false })
                    }
                    else if (response.data.status===true) {

                      toast.success("Info updated successfully");
                                            setState({isShown: false,spin:false })
                                            const { onProfileDelete } = this.props
                                            onProfileDelete()
                                          //  console.log('data',this.props.fun);
                    }                    
                    })
                    .catch(function (error) {
                      setState({ spin: false });
                    });

                }}
              >
                <div>
                  <div id="new_itemnav"> Edit User Info </div>
                  <div className="mod1">
                    <div id='dailog' style={{ marginTop: 15 }} >
                      <div id='dialog_title'>
                        Name </div>
                      <div style={{ width: "80%", textAlign: "center" }}>
                        <input type="text" id="field2" placeholder="Name"
                          value={state.name}
                          onChange={e => {
                            setState({ name: e.target.value })

                          }} />
                      </div>
                    </div>

                    <div id='dailog' >
                      <div id='dialog_title'> Email</div>

                      <div style={{ width: "80%", textAlign: "center" }}>
                        <input type="email" id="field2" placeholder="Email"
                          value={state.email}
                          onChange={e => {
                            setState({ email: e.target.value })

                          }} />
                      </div>
                    </div>


                    <div id='dailog' >
                      <div id='dialog_title' >
                        Department
                                  </div>

                      <div style={{ width: "80%", textAlign: "center" , display:'flex',alignItems:'center',justifyContent:'center' }}>
               
                      <Select onChange={e => { setState({ dep_nm: e.value }); }}
                                                    defaultValue={state.depas}
                                                   value={selectedOption}
                                                    styles={customStyles}
                                                    options={this.props.data1}
                                                />


                      </div>
                    </div>

                    <div id='dailog' >
                      <div id='dialog_title' >
                        Status
                                  </div>

                      <div style={{ width: "80%", textAlign: "center" }}>
                        <select
                          type="text"
                          id="field2"
                          placeholder="Status"
                          value={state.status}
                          onChange={e =>
                          setState({
                              status: e.target.value
                            })
                          }
                        >
                          <option value="-">- </option>
                          <option value="1">enabled</option>
                          <option value="0">  disabled </option>
                        </select>
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
                onClick={() =>{ 
                  setState({ isShown: true })
                  let getIndex=this.props.data1.findIndex((element) => element.label === this.props.department)
                  setState({depas:this.props.data1[getIndex]})
                setState({
                  name: this.props.name,
                  email:this.props.email,
                  department:this.props.department,
                  status:this.props.status,
                })
                }}

              >
                <i className="fas fa-edit" id="edit"></i>
              </div>
            </Pane>
          )}
        </Component>

      </div>
    );
  }
}
export default EditUser;