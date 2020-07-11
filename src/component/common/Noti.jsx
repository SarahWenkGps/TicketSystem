import React from 'react';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Cookies from "universal-cookie";
import Host from "../../assets/js/Host";
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import axios from "axios";
import Lottie from "lottie-react-web";
import Context from "../../assets/js/context";
import moment from 'moment';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { toast } from 'react-toastify';
const cookies = new Cookies();


class Noti extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {

    };
  }


  render() {
    return (
      <div style={{cursor:'pointer'}}  >
        <div id='notification_main'  >
        
            {this.props.type==='task_assgin'?(
 <div id='type_btn' style={{backgroundColor:'#94D295'}}  > Task Assign  <NotificationsIcon />  </div>
            ):(null)} 
           {this.props.type==='task_status_changed'?(
 <div id='type_btn'   > Task Status Changed    <NotificationsIcon />  </div>
            ):(null)} 
              {this.props.type==='task_updated'?(
 <div id='type_btn' style={{backgroundColor:'#FF8847'}}   > Task Updated    <NotificationsIcon />  </div>
            ):(null)} 
                {this.props.type==='comment'?(
 <div id='type_btn' style={{backgroundColor:'#946F5D'}}   > Task Comment   <NotificationsIcon />  </div>
            ):(null)} 
          <div id='noti_date'  >  {moment(this.props.time).format("LLL")}   </div>
          <div id='notiTitle' >{this.props.task_title}</div>
          <div id='noti_text' > 
         
           <span id='span_noti1' >
             {this.props.commenter} {this.props.assign_to}  </span> {this.props.note}  
              <span id='span_noti2'>{this.props.user_updater} {this.props.assign_from} </span>    </div>

          {/* <div id='noti_btn_dwn' >
            <Tooltip title="Set Read" onClick={() => {
              this.setRead();
            }}>
              <IconButton aria-label="Set Read">
                <CheckCircleIcon style={{ color: '#68ff7a' }} />
              </IconButton>
            </Tooltip>
       
          </div> */}

        </div>


      </div>
    );
  }
}

export default Noti;
