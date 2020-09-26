import React from 'react';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Cookies from "universal-cookie";
import { Pane, Dialog, Button } from 'evergreen-ui';
import Component from '@reactions/component';
import Host from "../../assets/js/Host";
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import axios from "axios";
import VisibilityIcon from '@material-ui/icons/Visibility';
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
      assignedata:[]
    };
  }


 async setReadAll() {
    var headers = {
      jwt: cookies.get("token"),
    };
    var count=0;
    for (let index = 0; index < this.state.assignedata.length; index++) {
      count++;
    await  axios({
        url: Host + `notifications/read_notification/${this.state.assignedata[index].activity_id}`,
        method: "POST",
        headers: headers,
  
      })
        .then(res => {
          const { onProfileDelete } = this.props
          onProfileDelete()
          console.log(count,this.state.assignedata.length);
          if (count === this.state.assignedata.length) {
            toast.success("Done")
          }
         
        })
      
    }
  
  }





  setRead(data) {
    var headers = {
      jwt: cookies.get("token"),
    };
    axios({
      url: Host + `notifications/read_notification/${data}`,
      method: "POST",
      headers: headers,

    })
      .then(res => {
        const { onProfileDelete } = this.props
        onProfileDelete()
        toast.success("Done")
      })
  }

  render() {
    return (
      //       <div style={{cursor:'pointer'}}  >
      //         <div id='notification_main'  >

      //             {this.props.type==='task_assgin'?(
      //  <div id='type_btn' style={{backgroundColor:'#94D295'}}  > Task Assign  <NotificationsIcon />  </div>
      //             ):(null)} 
      //            {this.props.type==='task_status_changed'?(
      //  <div id='type_btn'   > Task Status Changed    <NotificationsIcon />  </div>
      //             ):(null)} 
      //               {this.props.type==='task_updated'?(
      //  <div id='type_btn' style={{backgroundColor:'#FF8847'}}   > Task Updated    <NotificationsIcon />  </div>
      //             ):(null)} 
      //                 {this.props.type==='comment'?(
      //  <div id='type_btn' style={{backgroundColor:'#946F5D'}}   > Task Comment   <NotificationsIcon />  </div>
      //             ):(null)} 
      //           <div id='noti_date'  >  {moment(this.props.time).format("LLL")}   </div>
      //           <div id='notiTitle' >{this.props.task_title}</div>
      //           <div id='noti_text' > 

      //            <span id='span_noti1' >
      //              {this.props.commenter} {this.props.assign_to}  </span> {this.props.note}  
      //               <span id='span_noti2'>{this.props.user_updater} {this.props.assign_from} </span>    </div>

      //           {/* <div id='noti_btn_dwn' >
      //             <Tooltip title="Set Read" onClick={() => {
      //               this.setRead();
      //             }}>
      //               <IconButton aria-label="Set Read">
      //                 <CheckCircleIcon style={{ color: '#68ff7a' }} />
      //               </IconButton>
      //             </Tooltip>

      //           </div> */}

      //         </div>


      //       </div>




      <div   >
        <div id='notification_main'  >

          {this.props.type === 'task_assgin' ? (
            <div id='type_btn' style={{ backgroundColor: '#94D295' }}  > Task Assign  <NotificationsIcon />  </div>
          ) : (null)}
          {this.props.type === 'task_status_changed' ? (
            <div id='type_btn'   > Task Status Changed    <NotificationsIcon />  </div>
          ) : (null)}
          {this.props.type === 'task_updated' ? (
            <div id='type_btn' style={{ backgroundColor: '#FF8847' }}   > Task Updated    <NotificationsIcon />  </div>
          ) : (null)}
          {this.props.type === 'comment' ? (
            <div id='type_btn' style={{ backgroundColor: '#946F5D' }}   > Task Comment   <NotificationsIcon />  </div>
          ) : (null)}
          <div id='noti_date'  >  {moment(this.props.time).format("LLL")}   </div>
          <div id='notiTitle' >{this.props.task_title}</div>
          <div id='noti_text' >

            <span id='span_noti1' >
              {this.props.commenter} {this.props.assign_to}  </span> {this.props.note}
            <span id='span_noti2'>{this.props.user_updater} {this.props.assign_from} </span>    </div>

          <div id='noti_btn_dwn' >
            <Component initialState={{ isShown: false, assignedata: [] }}>
              {({ state, setState }) => (
                <Pane>
                  <Dialog
                    isShown={state.isShown}
                    hasHeader={false}
                    onCloseComplete={() => setState({ isShown: false })}
                    hasFooter={false}
                    topOffset={200}
                    width={900}
                    height={900}

                  >
                    {state.assignedata.length > 1 ? (
                      state.assignedata.map((p, i) =>
                        <div key={i} id='notification_main'  >

                          {p.type === 'task_assgin' ? (
                            <div id='type_btn1' style={{ backgroundColor: '#94D295' }}  > Task Assign  <NotificationsIcon />  </div>
                          ) : (null)}
                          {p.type === 'task_status_changed' ? (
                            <div id='type_btn1'   > Task Status Changed    <NotificationsIcon />  </div>
                          ) : (null)}
                          {p.type === 'task_updated' ? (
                            <div id='type_btn1' style={{ backgroundColor: '#FF8847' }}   > Task Updated    <NotificationsIcon />  </div>
                          ) : (null)}
                          {p.type === 'comment' ? (
                            <div id='type_btn1' style={{ backgroundColor: '#946F5D' }}   > Task Comment   <NotificationsIcon />  </div>
                          ) : (null)}
                          <div id='noti_date'  >  {moment(p.date_time).format("LLL")}   </div>
                          <div id='notiTitle' >{p.task_title}</div>
                          <div id='noti_text' >

                            <span id='span_noti1' >
                              {p.commenter} {p.assign_to}  </span> {p.note}
                            <span id='span_noti2'>{p.user_updater} {p.assign_from} </span>    </div>

                          <div id='noti_btn_dwn' >

                            <Tooltip title="Set Read" onClick={() => {
                              this.setRead(p.activity_id);
                            }}>
                              <IconButton aria-label="Set Read">
                                <CheckCircleIcon style={{ color: '#68ff7a' }} />
                              </IconButton>
                           </Tooltip>
                          </div>
                        </div>
                      )
                    ) : (
                        <div id='Not_notic'  >
                          No More Notifications
                        </div>
                      )}
                  </Dialog>
                  <div onClick={() => {
                    setState({ isShown: true })
                    let assignedata = this.props.allData.filter(f =>
                      f.task_id === this.props.id)
                  //  console.log(assignedata);
                    setState({ assignedata: assignedata })

                  }}
                    style={{ color: '#dbdfdf', paddingRight: 15, cursor: 'pointer' }}   >  Show  More Notifications  </div>
                </Pane>
              )}
            </Component>

            <Tooltip title="Show Task" onClick={() => {
                  let assignedata = this.props.allData.filter(f =>
                    f.task_id === this.props.id)
                 console.log(assignedata);
                  this.setState({ assignedata: assignedata })
             setTimeout(() => {
              this.setReadAll();
              { window.open(`https://www.iraq-gis.com/` + `Detials_TaskEdit?id=${this.props.id}`, '_blank') }
             }, 200);
              // setTimeout(() => {
              //   
              // }, 200);


            }} >
              <IconButton aria-label="Show Task">
                <VisibilityIcon style={{ color: '#68ff7a' }} />
              </IconButton>
            </Tooltip>

            <Tooltip title="Set Read" onClick={() => {
              this.setRead(this.props.activity_id);
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
