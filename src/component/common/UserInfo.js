import React from 'react';
import { Pane, Dialog } from 'evergreen-ui';
import Component from '@reactions/component';
import axios from "axios";
import Cookies from "universal-cookie";
import Host from "../../assets/js/Host";
import Lottie from "lottie-react-web";
import loading from '../../assets/js/loading.json';
import { toast } from "react-toastify";
import PersonIcon from '@material-ui/icons/Person';
import Context from "../../assets/js/context";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const cookies = new Cookies();
class UserInfo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: {
                data: [],
                old_password: "",
                new_password: '',
                con_password: '',
                email: '',
                name: '',
                spin: false,
                spin1: false,
                isShown: false,
                ip_phone:'',
                birthdate:'',
                phone:'',

            }
        };
    }


    changepass() {
        if (this.state.new_password.length < 3) {
            toast.warning('password must be more than 3 char')
        }
        else if (this.state.con_password !== this.state.new_password) {
            toast.warning('please confirm password')
        }
        else {
            this.setState({ spin: true })
            var headers = {
                jwt: cookies.get("token")
            };

            if (this.state.old_password === undefined) {
                var old_password = ""
            } else {
                old_password = this.state.old_password
            }
            axios({
                url: Host + `users/change_password`,
                method: "PUT",
                headers: headers,
                data: {
                    user_id: this.props.ids,
                    old_password: old_password,
                    new_password: this.state.new_password,
                },
            })

                .then(response => {
                    if (response.data.status === false) {
                        toast.error(response.data.data.message.text)
                        this.setState({ spin: false })
                    }
                    else if (response.data.status === true) {
                        toast.success("password updated successfully");
                        this.setState({ spin: false })
                    }

                })
                .catch(err => {
                    toast.error("Network Error")

                });
        }
    }


    getinfo() {
        var headers = {
            jwt: cookies.get("token")
        };
        axios({
            url: Host + `users/user/${cookies.get("user_id")}`,
            method: "GET",
            headers: headers,
        })
            .then(response => {
                console.log('data', response.data.data[0].name);

                this.setState({
                    name: response.data.data[0].name,
                    email: response.data.data[0].email,
                    ip_phone:response.data.data[0].ip_phone,
                    birthdate: response.data.data[0].birthdate === 'Thu Jan 01 1970 03:00:00 GMT+0300 (Arabian Standard Time)' ? ( "") :(new Date(response.data.data[0].birthdate)),
                    phone:response.data.data[0].phone
                })

            })
    }



    changeInfo() {
        if (this.state.name.length < 3) {
            return toast.warning('name must be more than 3 char')
        }

        if (this.state.email.length < 5) {
            return toast.warning('mail must be more than 5 char')
        }

        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (reg.test(this.state.email) == false) {
            return toast.warning('Invalid Email Address');

        }
        this.setState({ spin1: true })
        var headers = {
            jwt: cookies.get("token")
        };
        if (this.state.birthdate!=='') {
            var milliseconds = this.state.birthdate.getTime() + (3 * 60 * 60 * 1000); //add three hours
            var correctedDeadTime = new Date(milliseconds);  
        }
        axios({
            url: Host + `users/user/${this.props.ids}`,
            method: "PUT",
            headers: headers,
            data: {
                name: this.state.name,
                email: this.state.email,
                phone: this.state.phone,
                ip_phone:this.state.ip_phone,
                birthdate:correctedDeadTime
            },
        })

            .then(response => {


                if (response.data.status === false) {
                    toast.error(response.data.data.message.text)
                    this.setState({ spin1: false })
                }
                else if (response.data.status === true) {

                    toast.success("Info updated successfully");
                    this.setState({ spin1: false })
                    this.getinfo()
                    //  console.log('data',this.props.fun);
                }
            })
            .catch(err => {
                toast.error("Network Error")

            });

    }


    render() {
        return (
            <Context.Consumer>
                {ctx => {
                    return (
                        <div    >

                            <Component initialState={{
                                isShown: false, spin: false,
                                name: '', email: ''
                            }}    >
                                {({ state, setState }) => (
                                    <Pane >
                                        <Dialog
                                            isShown={this.state.isShown}

                                            onCloseComplete={() => this.setState({ isShown: false })}
                                            hasHeader={false}
                                            hasFooter={false}
                                            // shouldCloseOnOverlayClick={false}
                                            confirmLabel="Save"
                                            cancelLabel="Cancel"
                                            onConfirm={() => {

                                            }}
                                        >
                                            <div >
                                                <div>
                                                    <div id='new_itemnav' >   Change Info </div>
                                                    <div className='mod1'>

                                                        <div id='dailog' style={{ marginTop: 15 }} >
                                                            <div id='dialog_title' > Name  </div>
                                                            <div style={{ width: '80%', textAlign: 'center' }} >
                                                                <input type='text' id='field2' placeholder=' Name ' value={this.state.name} onChange={(e) =>
                                                                    this.setState({ name: e.target.value })} />  </div>
                                                        </div>

                                                        <div id='dailog' >
                                                            <div id='dialog_title' >   Email  </div>
                                                            <div style={{ width: '80%', textAlign: 'center' }} >
                                                                <input type='email' id='field2' placeholder=' Email '
                                                                    value={this.state.email} onChange={(e) =>
                                                                        this.setState({ email: e.target.value })} /> </div>
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
                      <div id='dialog_title'> Ext.  </div>
                      <div style={{ width: "80%", textAlign: "center" }}>
                        <input type="number" id="field2" placeholder="***"
                          value={this.state.ip_phone}
                          onChange={e => {
                            this.setState({ ip_phone: e.target.value })
                          }} />
                      </div>
                    </div>
                    <div id='dailog' >
                      <div id='dialog_title'> Birthdate </div>
                      <div style={{ width: "80%", textAlign: "center" }}>
                      <DatePicker  id='dateEditUser1'
                         
                          selected={this.state.birthdate}
                          onChange={(date)=> {
                            this.setState({birthdate:date})
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

                                                        <div id='info_btnMain' >
                                                            <div id='info_btn' onClick={() => {
                                                                this.changeInfo();
                                                            }}   >Save</div>
                                                        </div>
                                                        {this.state.spin1 ? (
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
                                                <div>
                                                    <div id='new_itemnav' >   Change Password </div>
                                                    <div className='mod1'>
                                                        <div id='dailog' style={{ marginTop: 15 }} >
                                                            <div id='dialog_title' > Old Password   </div>
                                                            <div style={{ width: '80%', textAlign: 'center' }} >
                                                                <input type='password' id='field2' placeholder=' ****** ' value={this.state.old_password} onChange={(e) =>
                                                                    this.setState({ old_password: e.target.value })} />  </div>
                                                        </div>


                                                        <div id='dailog' >
                                                            <div id='dialog_title' >   New Password   </div>

                                                            <div style={{ width: '80%', textAlign: 'center' }} >
                                                                <input type='password' id='field2' placeholder=' ****** '
                                                                    value={this.state.new_password} onChange={(e) =>
                                                                        this.setState({ new_password: e.target.value })} /> </div>
                                                        </div>
                                                        <div id='dailog' >
                                                            <div id='dialog_title' >   Confirm  Password  </div>

                                                            <div style={{ width: '80%', textAlign: 'center' }} >
                                                                <input type='password' id='field2' placeholder=' ****** '
                                                                    value={this.state.con_password} onChange={(e) =>
                                                                        this.setState({ con_password: e.target.value })} /> </div>
                                                        </div>
                                                        <div id='info_btnMain' >
                                                            <div id='info_btn' onClick={() => {
                                                                this.changepass();


                                                            }} >Save</div>
                                                        </div>

                                                        {this.state.spin ? (
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
                                            </div>
                                        </Dialog>

                                        <div style={{ minWidth: 90 }} onClick={() => {
                                            this.setState({ isShown: true })
                                            this.getinfo();




                                        }}   >

                                            {cookies.get("username")}   <i className="fas fa-cog" id='pass_use' ></i>

                                        </div>
                                    </Pane>
                                )}
                            </Component>

                        </div>

                    )
                }}
            </Context.Consumer>
        );
    }
}
export default UserInfo;