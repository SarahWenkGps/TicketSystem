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



  setRead() {
    this.setState({ color: '#4f8363' })
    var headers = {
      jwt: cookies.get("token"),
    };
    axios({
      url: Host + `notifications/read_notification/${this.props.activity_id}`,
      method: "POST",
      headers: headers,

    })
      .then(response => {
        if (response.data.status === false) {
          toast.error(response.data.data.message.text)
        } else {
          toast.success("Done")
          const { onProfileDelete } = this.props
          onProfileDelete()
        }
      })
  }







  render() {
    return (
      <div>
        <div id='notification_main'  >
          <div id='type_btn' >{this.props.type} <NotificationsIcon /> </div>
          <div id='noti_date'  >  {moment(this.props.time).format("LLL")}   </div>
          <div id='noti_text' >  <span id='span_noti1' > {this.props.commenter} {this.props.assign_to}  </span> {this.props.note}  <span id='span_noti2'>{this.props.user_updater} {this.props.assign_from} </span>    </div>

          <div id='noti_btn_dwn' >
            <Tooltip title="Set Read" onClick={() => {
              this.setRead();
            }}>
              <IconButton aria-label="Set Read">
                <CheckCircleIcon style={{ color: '#68ff7a' }} />
              </IconButton>
            </Tooltip>
       
          </div>

        </div>


      </div>
    );
  }
}

export default Noti;
