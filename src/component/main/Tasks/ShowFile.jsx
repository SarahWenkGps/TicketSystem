import React from 'react';
import { Pane, Dialog, Button } from 'evergreen-ui';
import Component from '@reactions/component';
import axios from "axios";
import Cookies from "universal-cookie";
import Host from "../../../assets/js/Host";
import { toast } from "react-toastify";
import AttachmentIcon from '@material-ui/icons/Attachment';
import SendIcon from '@material-ui/icons/Send';
import "react-datepicker/dist/react-datepicker.css";
import PersonIcon from '@material-ui/icons/Person';
import Lottie from "lottie-react-web";
import loading from '../../../assets/js/loading.json';
import EditIcon from '@material-ui/icons/Edit';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import InputFiles from 'react-input-files';
import moment from 'moment';
// import moment from 'moment';
const cookies = new Cookies();



class ShowFile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            spin: false,

        };
    }




    delete(id) {
  
        var headers = {
          "Content-Type": "application/json",
          jwt: cookies.get("token")
        };
        axios({
          url: Host + `tasks/task_file/${id}`,
          method: "DELETE",
          headers: headers
        })
          .then(response => {
            if (response.data.status===false) {
              toast.error(response.data.data.text)
             
          }
          else if (response.data.status===true) {
           
         toast.success("deleted successfully")
         const { onRefTask } = this.props.onRefTask
         onRefTask()
          }
          })
          .catch(err => {
            toast.error("Network Error")
            
          });
      }
    



    render() {


        return (
            <div   >

                <Component initialState={{ isShown: false }}>
                    {({ state, setState }) => (
                        <Pane>
                            <Dialog
                                isShown={state.isShown}
                                hasHeader={false}
                                onCloseComplete={() => setState({ isShown: false })}
                                hasFooter={false}
                                topOffset={150}
                            >

                                {this.props.files.map((f, i) => (
                                    <div key={i} style={{ color: '#61adc3', fontSize: 16, fontWeight: '600', padding: 10,borderBottom:'1px solid gray',
                                    display:'flex',alignItems:'center',justifyContent:'space-between' }}  >

                                        <div onClick={() => {
                                            window.open(Host + f.file_path);
                                        }} >{i + 1} File <span> <AttachmentIcon /> <span style={{fontSize:12}}  >{f.file_path} </span>  </span>  </div>
                                        <div>
                                            <i className="far fa-trash-alt" id="del"
                                                onClick={() => {
                                                    // this.delete(res.data.data[index].dep_id);
                                                    if (window.confirm('Delete the File?')) { this.delete(f.file_id) };
                                                }}
                                            ></i>
                                        </div>
                                    </div>
                                ))}




                                {this.state.spin === true ? (
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

                            </Dialog>

                            <div onClick={() => {
                                setState({ isShown: true })

                            }} className='file_show' > Show Files  <AttachmentIcon />
                            </div>
                        </Pane>
                    )}
                </Component>



            </div>
        );
    }
}
export default ShowFile;