import React from "react";
import loading from '../../assets/js/loading.json';
import axios from "axios";
import Component from "@reactions/component";
import Cookies from "universal-cookie";
import Lottie from 'lottie-react-web';
import Host from "../../assets/js/Host";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import login from '../common/login'
const cookies = new Cookies();
//var loginAction = new login();

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        username:'',
        password:'',
        errors:false,
        };
    }

    render() {
        return (
            <div id='main' >
              <div id="login_main">
                    <img src={require("../../assets/img/Logo.png")} alt="img" style={{ height: "125px" }}/>

                    <div
                        style={{
                            fontSize: 22,
                            lineHeight: "40px",
                            color: "#707070",
                            fontWeight: "bold"
                        }}
                    >
                        Ticket System 
          </div>

                    <div
                        style={{
                            fontSize: 20,
                            lineHeight: "40px",
                            color: "#707070",
                            marginBottom: 30
                        }}
                    >
                     
          </div>
                    <div className="Sign_container" style={{ position: 'relative' }} > 
                        <div className="up_field">
                            <input
                                id="field1"
                                placeholder="Username"
                                value={this.state.username}
                                onChange={e => {
                                    this.setState({ username: e.target.value });                               
                                }}
                            />

                            <input
                                id="field12"
                                name="text-input-name"
                                type="password"
                                placeholder="Password "
                                required
                                value={this.state.password}
                                onKeyDown={(e) => this.onEnter(e)}
                                onChange={e => {
                                    this.setState({ password: e.target.value });   
                                   
                                }}
                            />
                        </div>

                        <div className="down_field">
                            <Component initialState={{ isShown: true, spin: false }}>
                                {({ state, setState }) =>
                                    <div
                                        id="sign_but"
                                        onClick={(e) => {
                                           this.login(this.state,setState)
                                           
                                            }                                        
                                        } >
                                        {state.spin === false ? (
                                            <div> Login  </div>
                                        ) : (
                                                <div>
                                                    <div>loading ...</div>
                                                    <div style={{ width: "100%", position: "absolute", top: '102px', right: '-7px' }}>
                                                        <Lottie
                                             options={{
                                               animationData: loading
                                             }}
                                             width={300}
                                             height={150}
                                             position="absolute"
                                           />
                                                    </div></div>
                                            )}
                                    </div>
                                }
                            </Component>
                        </div>
                    </div>
                </div>
            </div>
            
        );
    }
 
          onEnter(event){
        if (event.keyCode === 13) {
            document.getElementById("sign_but").click();
        }
  }
}



export default Login;
