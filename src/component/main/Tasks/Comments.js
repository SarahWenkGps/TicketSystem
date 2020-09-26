import React from 'react';
import { Pane, Dialog, Button } from 'evergreen-ui';
import Component from '@reactions/component';
import axios from "axios";
import Cookies from "universal-cookie";
import Host from "../../../assets/js/Host";
import { toast } from "react-toastify";
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



class Comments extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            spin: false,
            comments: [],
            comment: '',
            comment2: '',
            file: '',
            file2: '',
            spinComment:false,
        };
    }

    handleChange = date => {
        this.setState({
            startDate: date
        });
    };



    callcomm() {
        this.setState({ spin: true })
        var headers = {
            jwt: cookies.get("token"),
        };
        axios({
            url: Host + `comments/${this.props.id}`,
            method: "GET",
            headers: headers,
        })
            .then(response => {
                // console.log('tok', response.data);
                this.setState({ spin: false })
                this.setState({ comments: response.data.data })
            })
            .catch(err => {
                toast.error("Network Error")

            });

    }





    addcomm() {
       
        let formData = new FormData();
        var headers = {
            jwt: cookies.get("token")
        };
        if (this.state.comment.length === 0) {
            return toast.error("Add comment First")
        }
        this.setState({spinComment:true})
        let fdata = JSON.stringify({ "comment": this.state.comment })
        formData.append("photo", this.state.file);
        formData.append("params", fdata);
        axios({
            url: Host + `comments/comment/${this.props.id}`,
            method: "POST",
            headers: headers,
            data: formData,
        })
            .then(res => {
                // console.log(response.data);
                if (res.data.status === true) {
                    toast.success("Comment added successfully")
                    this.callcomm();
                    // const { onProfileDelete } = this.props.onProfileDelete
                    // onProfileDelete()
                    const { onRefTask } = this.props.onRefTask
                    onRefTask()
                    this.setState({ comment: "",file:'',spinComment:false })

                }
                else if (res.data.status === false) {
                    toast.error(res.data.data.message.text)
                    this.setState({ comment: "",file:'',spinComment:false })
                }
            })
            .catch(err => {
                toast.error("Network Error")
                // this.setState({ comment: "",file:'',spinComment:false })
            });
    }

    Delete(data) {
        this.setState({spinComment:true}) 
        var headers = {
          "Content-Type": "application/json",
          jwt: cookies.get("token")
        };
       
        axios({
          url: Host + `comments/comment/${data}`,
          method: "DELETE",
          headers: headers
        })
          .then(response => {
            if (response.data.status===false) {
              toast.error(response.data.data.text)
              this.setState({spinComment:false}) 
          }
          else if (response.data.status===true) {
           
            this.callcomm();        
            const { onRefTask } = this.props.onRefTask
            onRefTask()
         toast.success("deleted successfully")
        this.setState({spinComment:false}) 
          }
          })
          .catch(err => {
            toast.error("Network Error")
            this.setState({spinComment:false}) 
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
                                {this.state.comments.length > 0 ? (
                                    <div style={{ height: 200, width: '100%', overflow: 'auto' }} >
                                        {this.state.comments.map((item, i) => (
                                            <div key={i} style={{ width: '100%', padding: '0 10px 0 10px', backgroundColor: '#f6f4f4', marginBottom: 5 }} >
                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                                                    <div>  <PersonIcon style={{ fontSize: 15, color: '#7f7f7f' }} />  {item.commenter_name}</div>
                                                    <div>
                                                        {moment(item.comment_dateTime).format("LLL")} </div>
                                                </div>

                                                <div style={{ paddingTop: 14, paddingBottom: 10, textAlign: 'start', direction: 'rtl' }}  >
                                                    {item.comment_text.split('\n').map((i, n) => {
                                                        return <p key={n} >{i}</p>
                                                    })}
                                                    {item.comment_pic_path === null ? (null) : (<img src={Host + item.comment_pic_path} alt='img' style={{ height: 100 ,cursor:'pointer'}} onClick={() => {
                                                        window.open(Host + item.comment_pic_path, '_blank');
                                                    }} />)}
                                                </div>

                                                <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '5px' }} >
                                                {JSON.parse(localStorage.getItem("roles")).includes(13) ? (
                <i className="far fa-trash-alt"  id="del" onClick={() => {                   
                    if (window.confirm('Delete the Comment?')) { this.Delete(item.comment_id) }
                  }}></i>
              ) : (null)}
                                                    <Component initialState={{ isShown: false, comment2: item.comment_text }}>
                                                        {({ state, setState }) => (
                                                            <Pane>
                                                                <Dialog
                                                                    isShown={state.isShown}
                                                                    hasHeader={false}
                                                                    onCloseComplete={() => setState({ isShown: false })}
                                                                    hasFooter={false}
                                                                    topOffset={200}
                                                                >
                                                                    <div style={{ width: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-evenly', marginBottom: 5, marginTop: 5 }} >

                                                                        <InputFiles onChange={files =>
                                                                            this.setState({ file2: files[0], file: files.length })
                                                                        }>
                                                                            <AddPhotoAlternateIcon style={{ cursor: 'pointer', color: '#2e6b95' }} />
                                                                        </InputFiles>

                                                                        <textarea id='coment' value={state.comment2}
                                                                            onChange={(e) => {
                                                                                setState({ comment2: e.target.value })
                                                                            }} />
                                                                        <SendIcon id='com_icon' onClick={() => {

                                                                            var headers = {
                                                                                jwt: cookies.get("token")
                                                                            };
                                                                            let formData = new FormData();
                                                                            if (state.comment2.length === 0) {
                                                                                return toast.error("Add comment First")
                                                                            }
                                                                            let fdata2 = JSON.stringify({ "comment": state.comment2 })
                                                                            formData.append("photo", this.state.file2);
                                                                            formData.append("params", fdata2);
                                                                            axios({
                                                                                url: Host + `comments/comment/${item.comment_id}`,
                                                                                method: "PUT",
                                                                                headers: headers,
                                                                                data: formData
                                                                            })

                                                                                .then(res => {
                                                                                    // console.log(response.data);
                                                                                    if (res.data.status === true) {
                                                                                        toast.success("Comment updated successfully")
                                                                                        this.callcomm();
                                                                                        const { onRefTask } = this.props.onRefTask
                                                                                        onRefTask()

                                                                                    }
                                                                                    else if (res.data.status === false) {
                                                                                        toast.error(res.data.data.message.text)
                                                                                    }
                                                                                })
                                                                                .catch(err => {
                                                                                    toast.error("Network Error")
                                                                                });
                                                                            setState({ isShown: false })
                                                                        }} />

                                                                    </div>
                                                                </Dialog>

                                                                <div onClick={() => setState({ isShown: true })}>  <EditIcon style={{ fontSize: 20, color: '#22619f', cursor: 'pointer',marginLeft:10 }} /> </div>
                                                            </Pane>
                                                        )}
                                                    </Component>

                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                        <div style={{ width: '100%', height: 200, textAlign: 'center', color: '#2e6b95', fontSize: 20, display: 'flex', flexDirection: 'column', justifyContent: 'center' }} >
                                            No Comments </div>
                                    )}

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



                                <div style={{ width: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-evenly', marginBottom: 5, marginTop: 5 }} >
                                    <InputFiles onChange={files =>
                                        this.setState({ file: files[0], file1: files.length })
                                    }>
                                        <AddPhotoAlternateIcon style={{ cursor: 'pointer', color: '#2e6b95' }} />
                                    </InputFiles>

                                    <textarea id='coment' value={this.state.comment}
                                        onChange={(e) => {
                                            this.setState({ comment: e.target.value })
                                        }} />
                                          {this.state.spinComment === true ? (
                                    <div style={{ width: "17%", position: "absolute",top:170,right:100 }}>
                                        <Lottie
                                            options={{
                                                animationData: loading
                                            }}
                                            width={300}
                                            height={150}
                                            position="absolute"
                                        />
                                    </div>
                                ) : (   <SendIcon id='com_icon' onClick={() => {
                                    this.addcomm();
                                }} />)}
                                 
                                </div>


                            </Dialog>

                            <Button onClick={() => {
                                setState({ isShown: true })
                                this.callcomm();
                            }} id='coment1' >Comments {this.props.comments_count}
                            </Button>
                        </Pane>
                    )}
                </Component>



            </div>
        );
    }
}
export default Comments;