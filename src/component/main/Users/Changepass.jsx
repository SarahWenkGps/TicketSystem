import React from 'react';
import { Pane, Dialog } from 'evergreen-ui';
import Component from '@reactions/component';
import axios from "axios";
import Cookies from "universal-cookie";
import Host from "../../../assets/js/Host";
import Lottie from "lottie-react-web";
import loading from '../../../assets/js/loading.json';
import { toast } from "react-toastify";
const cookies = new Cookies();
class Changwpass extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: {
                data: [],
                old_password: "",
                new_password: '',
                con_password: '',

            }
        };
    }


    render() {
        return (
            <div  className='iconUserDialog'  >

                <Component initialState={{ isShown: false, spin: false }}    >
                    {({ state, setState }) => (
                        <Pane >
                            <Dialog
                                isShown={state.isShown}
                                onCloseComplete={() => setState({ isShown: false })}
                                hasHeader={false}
                                shouldCloseOnOverlayClick={false}
                                confirmLabel="Save"
                                cancelLabel="Cancel"
                                onConfirm={() => {

                                    if (this.state.new_password.length < 3) {
                                        toast.warning('password must be more than 3 char')
                                    } else if (this.state.con_password !== this.state.new_password) {
                                        toast.warning('please confirm password')
                                    } else {
                                        setState({ spin: true })
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
                                                    setState({ spin: false })
                                                } else if (response.data.status === true) {
                                                    toast.success("password updated successfully");
                                                    setState({ isShown: false, spin: false })
                                                }

                                            })
                                            .catch(err => {
                                                toast.error("Network Error")
                                      
                                              });
                                    }
                                }}
                            >
                                <div >
                                    <div id='new_itemnav' > Change Password </div>
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

                            <div onClick={() => { setState({ isShown: true }) }} id='pass_use' > <i className="fas fa-cog"></i> </div>
                        </Pane>
                    )}
                </Component>

            </div>
        );
    }
}
export default Changwpass;