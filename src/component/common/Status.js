import React from 'react';
import { Pane, Dialog, Button } from 'evergreen-ui';
import Component from '@reactions/component';
import axios from "axios";
import Cookies from "universal-cookie";
import Host from "../../assets/js/Host";
import IconButton from '@material-ui/core/IconButton';
import { toast } from "react-toastify";
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
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



class Status extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            spin: false,
            status_id:'',
        };
    }

    accept(){
        this.setState({ spin: true })
        var headers = {
            jwt: cookies.get("token")
        };

        axios({
            url: Host + `tasks/change_status/${this.props.id}`,
            method: "PUT",
            headers: headers,
            data: {
             
                status_id:this.state.status_id
            },
        })

            .then(res => {
                if (res.data.status === true) {
                    this.setState({ isShown: false, spin: false })
                    toast.success('task updated successfully')
                    const { onProfileDelete } = this.props.onProfileDelete
                    onProfileDelete()
                }
                else if (res.data.status === false) {
                    toast.error(res.data.data.message.text)
                    this.setState({ spin: false })
                }
            })
            .catch(function (error) {
         
                this.setState({ spin: false });
        })
    }


    render() {


        return (
            <div style={{ display: 'flex', alignItems: 'center',width:'50%' }}  >
            {this.props.status==="new"?(<Tooltip title="Accept" onClick={()=>{
                    this.setState({status_id:'2'})
                   setTimeout(() => {
                     this.accept();
                   }, 200);}}>
                      <IconButton aria-label="Accept">
                        <AssignmentTurnedInIcon style={{ color: 'rgba(24, 135, 24, 0.71)' }} />
                      </IconButton>
                    </Tooltip>):(null)}
            {this.props.status==="in progress"?(<Tooltip title="Closed" onClick={()=>{
                    this.setState({status_id:'3'})
                   setTimeout(() => {
                     this.accept();
                   }, 200);}}>
                      <IconButton aria-label="Closed">
                        <AssignmentTurnedInIcon style={{ color: 'rgba(24, 135, 24, 0.71)' }} />
                      </IconButton>
                    </Tooltip>):(null)}
            {this.props.status==="closed"?(<Tooltip title="Approved" onClick={()=>{
                    this.setState({status_id:'5'})
                   setTimeout(() => {
                     this.accept();
                   }, 200);}}>
                      <IconButton aria-label="Approved">
                        <AssignmentTurnedInIcon style={{ color: 'rgba(24, 135, 24, 0.71)' }} />
                      </IconButton>
                    </Tooltip>):(null)}
            {this.props.status==="approved"?(<Tooltip title="Archived" onClick={()=>{
                    this.setState({status_id:'6'})
                   setTimeout(() => {
                     this.accept();
                   }, 200);}}>
                      <IconButton aria-label="Archived">
                        <AssignmentTurnedInIcon style={{ color: 'rgba(24, 135, 24, 0.71)' }} />
                      </IconButton>
                    </Tooltip>):(null)}
            {this.props.status==="rejected"?(  <Tooltip title="Archived" onClick={()=>{
                    this.setState({status_id:'6'})
                   setTimeout(() => {
                     this.accept();
                   }, 200);}}>
                      <IconButton aria-label="Archived">
                        <AssignmentTurnedInIcon style={{ color: 'rgba(24, 135, 24, 0.71)' }} />
                      </IconButton>
                    </Tooltip>):(null)}
            {this.props.status!=="rejected" && this.props.status!=="approved"?( 
                   <Tooltip title="Reject" onClick={()=>{
                    this.setState({status_id:'4'})
                   setTimeout(() => {
                     this.accept();
                   }, 200);}}>
                      <IconButton aria-label="Reject">
                        <DeleteOutlineIcon style={{ color: 'red' }} />
                      </IconButton>
                    </Tooltip>):(null)} 
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
        );
    }
}
export default Status;