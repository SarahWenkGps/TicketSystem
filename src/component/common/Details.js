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


                               
                            </Dialog>

                            <Button onClick={() => {
                                setState({ isShown: true })
                                // this.callcomm();
                            }}
                                id='coment1' >Details </Button>
                        </Pane>
                    )}
                </Component>



            </div>
        );
    }
}
export default Comments;