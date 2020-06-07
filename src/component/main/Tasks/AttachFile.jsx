import React from 'react';
import { Pane, Dialog, FilePicker } from 'evergreen-ui';
import Component from '@reactions/component';
import axios from "axios";
import Cookies from "universal-cookie";
import Host from "../../../assets/js/Host";
import Lottie from "lottie-react-web";
import loading from '../../../assets/js/loading.json';
import { toast } from "react-toastify";
import AttachFileIcon from '@material-ui/icons/AttachFile';
import "react-toastify/dist/ReactToastify.css";
const cookies = new Cookies();
class AttachFile extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      value: {

        verified: "",


        check: "login",
        File: '',
        spin: false,

      }
    };
  }



  render() {
    return (
      <div ref={this.myRef}   >

        <Component initialState={{
          isShown: false, spin: false,
          department: this.props.department,

        }}>
          {({ state, setState }) => (
            <Pane>
              <Dialog
                isShown={state.isShown}
                onCloseComplete={() => setState({ isShown: false })}
                hasHeader={false}
                topOffset={100}
                shouldCloseOnOverlayClick={false}
                confirmLabel="Save"
                cancelLabel="Cancel"
                onConfirm={() => {


                  setState({ spin: true })

                  var headers = {
                    jwt: cookies.get("token")
                  };
                  let formData = new FormData();
                  formData.append("files", this.state.File);
                  axios({
                    url: Host + `tasks/task_files/${this.props.id}`,
                    method: "POST",
                    headers: headers,
                    data: formData
                  })

                    .then(response => {
                      if (response.data.status === false) {
                        toast.error(response.data.data.text)
                        setState({ spin: false })
                      }
                      else if (response.data.status === true) {
                        toast.success("Info updated successfully");
                        setState({ isShown: false, spin: false })
                        const { onProfileDelete } = this.props.onProfileDelete
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
                  <div id="new_itemnav"> Attach File </div>
                  <div className="mod1">
                    <div id='dailog' style={{ marginTop: 15 }} >
                      <div id='dialog_title'>
                        File </div>
                      <div style={{ width: "80%", textAlign: "center" }}>
                        <FilePicker
                          multiple
                          width={250}
                          marginBottom={32}
                          onChange={files =>
                            this.setState({ File: files[0], file1: files.length })
                          }
                          placeholder="Select the file here!"
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

              <div className="attach_icon"
                onClick={() => {
                  setState({ isShown: true, department: this.props.department, })

                }}

              >
                <AttachFileIcon />
              </div>
            </Pane>
          )}
        </Component>

      </div>
    );
  }
}
export default AttachFile;