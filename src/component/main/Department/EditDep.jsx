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
class Edit_Dep extends React.Component {
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
        name:'',
        spin: false,

      }
    };
  }



  render() {
    return (
      <div ref={this.myRef}   >

        <Component initialState={{
          isShown: false, spin: false,
          department:this.props.department,
         
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
                  if (state.department.length <3) {
                    toast.warning('department mast be more than 3 char')
                  }
                  else{
                 
                  setState({ spin: true })

                  var headers = {
                    jwt: cookies.get("token")
                  };
                 
              
                  axios({
                    url: Host + `departments/department/${this.props.ids}`,
                    method: "PUT",
                    headers: headers,
                    data: {
                        dep_name:state.department,
                     
                    },
                  })
              
                    .then(response => {
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
                    .catch(err => {
                      toast.error("Network Error")
                      setState({ spin: false });
                    });

                }}}
              >
                <div>
                  <div id="new_itemnav"> Edit Department Name </div>
                  <div className="mod1">
                    <div id='dailog' style={{ marginTop: 15 }} >
                      <div id='dialog_title'>
                      Department </div>
                      <div style={{ width: "80%", textAlign: "center" }}>
                        <input type="text" id="field2" placeholder="Department"
                          value={state.department}
                          onChange={e => {
                            setState({ department: e.target.value })

                          }} />
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
                  setState({ isShown: true , department:this.props.department, })

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
export default Edit_Dep;