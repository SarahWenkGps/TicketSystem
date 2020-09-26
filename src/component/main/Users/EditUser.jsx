import React from 'react';
import { Pane, Dialog } from 'evergreen-ui';
import Component from '@reactions/component';
import axios from "axios";
import Cookies from "universal-cookie";
import Host from "../../../assets/js/Host";
import Lottie from "lottie-react-web";
import Select from "react-select";
import loading from '../../../assets/js/loading.json';
import { toast } from "react-toastify";
import moment from 'moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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
class EditUser extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      value: {

        verified: "",
        data: [],
        Usersdata: [],
        Users: [],
        check: "login",
        email: '',
        name: '',
        username: '',
        password: '',
        spin: false,

      }
    };
  }







  render() {
    const { selectedOption } = this.state;
    return (
      <div ref={this.myRef} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} className='iconUserDialog'  >

        <Component initialState={{
          isShown: false, spin: false,
          name: this.props.name,
          email: this.props.email,
          department: this.props.department,
          status: this.props.status,
          depas: '',
          dep_nm: '',
          phone: this.props.phone,
          ip_phone: this.props.ip_phone,
          birthdate: '',
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

                  if (state.name.length < 3) {
                    return toast.warning('name must be more than 3 char')
                  }

                  if (state.email.length < 5) {
                    return toast.warning('mail must be more than 5 char')
                  }

                  var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                  if (reg.test(state.email) == false) {
                    return toast.warning('Invalid Email Address');

                  }

                  setState({ spin: true })
                  var headers = {
                    jwt: cookies.get("token")
                  };
                  if (state.birthdate!=='') {
                    var milliseconds = state.birthdate.getTime() + (3 * 60 * 60 * 1000); //add three hours
                    var correctedDeadTime = new Date(milliseconds);  
                }
                  axios({
                    url: Host + `users/user/${this.props.ids}`,
                    method: "PUT",
                    headers: headers,
                    data: {
                      name: state.name,
                      email: state.email,
                      department_id: state.dep_nm,
                      phone: state.phone,
                      ip_phone: state.ip_phone,
                      birthdate: correctedDeadTime
                    },
                  })

                    .then(response => {
                      if (response.data.status === false) {
                        toast.error(response.data.data.message.text)
                        setState({ spin: false })
                      } else if (response.data.status === true) {
                        toast.success("Info updated successfully");
                        setState({ isShown: false, spin: false })
                        const { onProfileDelete } = this.props
                        onProfileDelete()
                        //  console.log('data',this.props.fun);
                      }
                    })
                    .catch(err => {
                      toast.error("Network Error")
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
                      <div id='dialog_title'> Phone </div>
                      <div style={{ width: "80%", textAlign: "center" }}>
                        <input type="number" id="field2" placeholder="964**********"
                          value={state.phone}
                          onChange={e => {
                            setState({ phone: e.target.value })
                          }} />
                      </div>
                    </div>

                    <div id='dailog' >
                      <div id='dialog_title'> Ext. </div>
                      <div style={{ width: "80%", textAlign: "center" }}>
                        <input type="number" id="field2" placeholder="***"
                          value={state.ip_phone}
                          onChange={e => {
                            setState({ ip_phone: e.target.value })
                          }} />
                      </div>
                    </div>
                    <div id='dailog' >
                      <div id='dialog_title'> Birthdate </div>
                      <div style={{ width: "80%", textAlign: "center" }}>
                        <DatePicker  id='dateEditUser'
                         style={{width:'292px'}}
                          selected={state.birthdate}
                          onChange={(date)=> {
                            setState({birthdate:date})
                            // console.log(date,new Date(this.props.birthdate));
                            
                           }}
                          locale="ar-iq"
                          // showTimeSelect
                          // timeFormat="p"
                          // timeIntervals={15}
                          dateFormat="P"
                          registerLocale='ar-iq'
                          // minDate={new Date()}
                        />
                      </div>
                    </div>

                    <div id='dailog' >
                      <div id='dialog_title' > Department </div>
                      <div style={{ width: "80%", textAlign: "center", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Select onChange={e => { setState({ dep_nm: e.value }); }}
                          defaultValue={state.depas}
                          value={selectedOption}
                          styles={customStyles}
                          options={this.props.data1}
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
                onClick={() => {
                  setState({ isShown: true })
                  let getIndex = this.props.data1.findIndex((element) => element.label === this.props.department)
                  setState({ depas: this.props.data1[getIndex] })
                  setState({
                    name: this.props.name,
                    email: this.props.email,
                    department: this.props.department,
                    phone: this.props.phone,
                    ip_phone: this.props.ip_phone,
                    
                  })
if (this.props.birthdate!=="0000-00-00" && this.props.birthdate!==null  ) {
  setState({birthdate: new Date(this.props.birthdate)})
}
                  

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