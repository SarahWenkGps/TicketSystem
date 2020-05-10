import React from 'react';
import { Pane, Dialog, Button } from 'evergreen-ui';
import Component from '@reactions/component';
import axios from "axios";
import Cookies from "universal-cookie";
import Host from "../../assets/js/Host";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SendIcon from '@material-ui/icons/Send';
import "react-datepicker/dist/react-datepicker.css";
import PersonIcon from '@material-ui/icons/Person';
import Lottie from "lottie-react-web";
import loading from '../../assets/js/loading.json';
import EditIcon from '@material-ui/icons/Edit';
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
            .catch(function (error) {
                // console.log('error', error);
                this.setState({ spin: true })
            });

    }


    editcoment(data) {
        var headers = {
            jwt: cookies.get("token")
        };
        axios({
            url: Host + `comments/comment/${data}`,
            method: "PUT",
            headers: headers,
            data: {
                comment: this.state.comment2,

            },
        })

            .then(res => {
                // console.log(response.data);
                if (res.data.status === true) {
                    toast.success("Comment updated successfully")
                    this.callcomm();
                    const { onProfileDelete } = this.props.onProfileDelete
                    onProfileDelete()
                }
                else if (res.data.status === false) {
                    toast.error(res.data.data.message.text)
                }
            })
            .catch(function (error) {

            });
    }


    addcomm() {
        var headers = {
            jwt: cookies.get("token")
        };
        axios({
            url: Host + `comments/comment`,
            method: "POST",
            headers: headers,
            data: {
                comment: this.state.comment,
                task_id: this.props.id,
            },
        })

            .then(res => {
                // console.log(response.data);
                if (res.data.status === true) {
                    toast.success("Comment added successfully")
                    this.callcomm();
                    const { onProfileDelete } = this.props.onProfileDelete
                    onProfileDelete()
                }
                else if (res.data.status === false) {
                    toast.error(res.data.data.message.text)
                }
            })
            .catch(function (error) {

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
                                topOffset={100}
                            >


                                {this.state.comments.length > 0 ? (
                                    <div style={{ height: 200, width: '100%', overflow: 'auto' }} >
                                        {this.state.comments.map((item, i) => (
                                            <div key={i} style={{ width: '100%', padding: '0 10px 0 10px', backgroundColor: '#f6f4f4', marginBottom: 5 }} >
                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                                                    <div>  <PersonIcon style={{ fontSize: 15, color: '#7f7f7f' }} />  {item.commenter_name}</div>
                                                    <div> 
                                                    {moment(item.comment_dateTime).format("YYYY-MM-DD")} </div>
                                                </div>
                                                <div style={{ paddingTop: 14,paddingBottom:10,textAlign:'end' }}  >{item.comment_text}</div>
                                                <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '5px' }} >

                                                    <Component initialState={{ isShown: false }}>
                                                        {({ state, setState }) => (
                                                            <Pane>
                                                                <Dialog
                                                                    isShown={state.isShown}
                                                                    hasHeader={false}
                                                                    onCloseComplete={() => setState({ isShown: false })}
                                                                    hasFooter={false}
                                                                    onCloseComplete={() => setState({ isShown: false })}
                                                                    topOffset={200}
                                                                >
                                                                    <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', marginBottom: 5, marginTop: 5 }} >
                                                                        <input type='text' id='coment' value={this.state.comment2}
                                                                            onChange={(e) => {
                                                                                this.setState({ comment2: e.target.value })
                                                                            }} />
                                                                        <SendIcon id='com_icon' onClick={() => {
                                                                            this.editcoment(item.comment_id);
                                                                            setState({ isShown: false })
                                                                        }} />
                                                                    </div>
                                                                </Dialog>

                                                                <div onClick={() => setState({ isShown: true })}>  <EditIcon style={{ fontSize: 20, color: '#22619f',cursor:'pointer' }} /> </div>
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



                                <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', marginBottom: 5, marginTop: 5 }} >
                                    <input type='text' id='coment' value={this.state.comment}
                                        onChange={(e) => {
                                            this.setState({ comment: e.target.value })
                                        }} />
                                    <SendIcon id='com_icon' onClick={() => {
                                        this.addcomm();
                                    }} />
                                </div>


                            </Dialog>

                            <Button onClick={() => {
                                setState({ isShown: true })
                                this.callcomm();
                            }}
                                id='coment1' >Comments </Button>
                        </Pane>
                    )}
                </Component>



            </div>
        );
    }
}
export default Comments;