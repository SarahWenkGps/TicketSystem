import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import Details from '../Tasks/Details';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import AssingUser from '../Tasks/AssignUser';
import ShowFile from '../Tasks/ShowFile';
import PersonIcon from '@material-ui/icons/Person';
import Comments from '../Tasks/Comments';
import AttachFile from '../Tasks/AttachFile';
import Status from '../Tasks/Status';
import moment from 'moment';
import EditCustomer from './EditCustomer';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import CommentIcon from '@material-ui/icons/Comment';
import { toast } from "react-toastify";
import axios from "axios";
import Cookies from "universal-cookie";
import Host from "../../../assets/js/Host";
import Lottie from "lottie-react-web";
 import loading from '../../../assets/js/loading.json';
const cookies = new Cookies();
var spin;
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: '18px',
    flexBasis: '70%',
    flexShrink: 0,
    color: '#2e6b95',
    fontWeight: '600'
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    flexBasis: '30%',
    textAlign: 'end',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  expanded:{
    margin:'0px'
  }
}));


export default function ControlledExpansionPanels(props) {
  const classes = useStyles();
  const [expanded , setExpanded ] = React.useState('panel1');

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : true);


  };

  function Delete(data) {
    spin=true;
    var headers = {
      "Content-Type": "application/json",
      jwt: cookies.get("token")
    };
   
    axios({
      url: Host + `tasks/task/${data}`,
      method: "DELETE",
      headers: headers
    })
      .then(response => {
        if (response.data.status===false) {
          toast.error(response.data.data.text)
          spin=false;
      }
      else if (response.data.status===true) {
        const { onRefTask } = props
        onRefTask() 
     toast.success("deleted successfully")
     spin=false;
      }
      })
      .catch(err => {
        toast.error("Network Error")
        spin=false;
      });
    
    }



  return (

    <div className="ControlledExpansionPanels"  >


      <div   >
        {props.status === "approved" ? (
          <div id='head_task' style={{height:35 ,fontSize:'16.5px' }}  >  
           <div id='tit_task' style={{ backgroundColor: '#188718b5',minWidth:200 }} >Approved  </div>
            <div className='weight' > {props.weight} </div>
            <div className='task_type_style'  >  {props.task_type} </div>
            {/* <div className='task_priority'  > {props.priority}  </div> */}

          </div>
        ) : (
            null
          )}
        {props.status === "rejected" ? (
          <div id='head_task' style={{height:35,fontSize:'16.5px'}} >   
            <div id='tit_task' style={{ backgroundColor: '#da251e',minWidth:200 }} >Rejected</div>
            <div className='weight' > {props.weight} </div>
            <div className='task_type_style'   >  {props.task_type} </div>
            {/* <div className='task_priority'  > {props.priority}  </div> */}

          </div>
        ) : (
            null
          )}
        {props.status === "closed" ? (
          <div id='head_task' style={{height:35,fontSize:'16.5px'}} >  
            <div id='tit_task' style={{ backgroundColor: 'gray',minWidth:200 }} >Closed </div>
            <div className='weight' > {props.weight} </div>
            <div className='task_type_style'    >  {props.task_type} </div>
            {/* <div className='task_priority'  > {props.priority}  </div>  */}

          </div>
        ) : (
            null
          )}
        {props.status === "new" ? (
          <div id='head_task' style={{height:35,fontSize:'16.5px'}} >   
            <div id='tit_task' style={{ backgroundColor: '#2e6b95',minWidth:200 }} >New </div>
            <div className='weight' > {props.weight} </div>
            <div className='task_type_style'   >  {props.task_type} </div>
            {/* <div className='task_priority'  > {props.priority}  </div> */}

          </div>
        ) : (
            null
          )}
        {props.status === "in progress" ? (
          <div id='head_task' style={{height:35,fontSize:'16.5px'}} >  
            <div id='tit_task' style={{ backgroundColor: '#f06105cc',minWidth:200 }} > In progress </div>
            <div className='weight' > {props.weight} </div>
            <div className='task_type_style'   >  {props.task_type} </div>
            {/* <div className='task_priority'  > {props.priority}  </div>  */}

          </div>
        ) : (
            null
          )}
        {props.status === "assigned" ? (
          <div id='head_task' style={{height:35,fontSize:'16.5px'}} >   
            <div id='tit_task' style={{ backgroundColor: '#d5ad00d4',minWidth:200 }} > Assigned </div>
            <div className='weight' > {props.weight} </div>
            <div className='task_type_style'   >  {props.task_type} </div>
            {/* <div className='task_priority'  > {props.priority}  </div> */}

          </div>
        ) : (
            null
          )}
        {props.status === "archived" ? (
          <div id='head_task' style={{height:35,fontSize:'16.5px'}} >    
           <div id='tit_task' style={{ backgroundColor: 'black',minWidth:200 }} > Archived </div>
            <div className='weight' > {props.weight} </div>
            <div className='task_type_style' >  {props.task_type} </div>
            {/* <div className='task_priority'  > {props.priority}  </div> */}

          </div>
        ) : (
            null
          )}

        <ExpansionPanel square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}
          style={{ backgroundColor: 'rgba(241, 237, 237, 0.42)', display: 'flex', flexDirection: 'column', justifyContent: 'center', boxShadow: '1px 1px 4px 0px grey',margin:'0px' }} >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <div style={{ width: '100%' }}   >
              <div style={{color:'#2e6b95',fontSize:'16px',fontWeight:'600'}}  > 
              {props.customer.name} 
                </div>

              <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }} >
                <div style={{ color: 'rgb(127, 127, 127)', fontSize: 14, fontWeight: '100', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
                  <div style={{ display: 'flex', alignItems: 'center' }}  >
                    <PersonIcon style={{ fontSize: 14,marginRight:4 }} /> {props.createdby}
                    {props.monitor.name !== null ? (<div style={{ marginLeft: 15 }} >  <img src={require('../../../assets/img/2.png')} alt='img' style={{ height: 15 }} />  {props.monitor.name} </div>) : (null)}
                  </div>
                  <div style={{ width: '19%' }}   > {props.time === '1970-01-01T00:00:00.000Z' ? (
                    null
                  ) : (
                      <div id="parent">
                        {moment().format('X') >= moment(props.time).format("X") ? (
                          <AccessAlarmIcon
                            style={{ color: '#da251e', cursor: 'pointer' }} />
                        ) : (<AccessAlarmIcon
                          style={{ color: 'green', cursor: 'pointer' }} />)}

                        <div id="hover-content" >
                          {moment(props.time).format("lll")}

                        </div>
                      </div>

                    )}</div>
                </div>

              </div>
           
              <div style={{ color: 'rgb(127, 127, 127)', fontSize: 14, fontWeight: '100',display:'flex',alignItems:'center' }}  > 
                <PeopleAltIcon style={{ fontSize: 14,marginRight:4 }} />  
                {props.assigners.length > 0 ? (
                <div style={{display:'flex',alignItems:'center'}} > {props.assigners[0].name} {props.assigners.length > 1 ? (
                <span id='OthersParent' > +  {props.assigners.length - 1} Others <span id='OthersContent' > {props.assigners.map((p, i) => (<div key={i}  > {p.name} </div>))}  </span> </span>) : (null)}
                 </div> 
                 ) : (<span>No Body</span>)}
                </div>
               


              <div style={{ color: 'rgb(127, 127, 127)', fontSize: 10, fontWeight: '100',display:'flex',alignItems:'center',justifyContent:'space-between',paddingRight:'3px' }}   > 
              <div  >
              {moment(props.created_at).format("lll")} 
              <div>   # {props.id} </div> 
                </div>   
              <div >
                <div id='icons_headerTask' >
                  {props.files.length > 0 ? (<AttachFileIcon className='icon_file_head' />) : (null)}
                  {props.geofences.geo_name !== "null" && props.geofences.geo_name !== null ? (<LocationOnIcon style={{ fontSize: 18 }} />) : (null)}
                  {props.comments_count > 0 ? (<div>  {props.comments_count}  <CommentIcon style={{ fontSize: 18, color: '#3e83b2' }} />  </div>) : (null)}

                </div>
              </div>
               </div>


         
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid rgb(225, 227, 229)' }}  >

            <div style={{ display: 'flex', justifyContent: 'space-between',height:'30px' }} >
              <div>  {props.files.length > 0 ? (<ShowFile files={props.files} onRefTask={props} />) : (null)}</div>

              <div>
                <button className='btn_lang' onClick={() => {
                  var x = document.createElement("STYLE");
                  var t = document.createTextNode("p {text-align: start;}");
                  x.appendChild(t);
                  document.head.appendChild(x);
                }} > <FormatAlignLeftIcon style={{ fontSize: 16 }} /> </button>
                <button className='btn_lang' onClick={() => {
                  var x = document.createElement("STYLE");
                  var t = document.createTextNode("p {text-align: end;}");
                  x.appendChild(t);
                  document.head.appendChild(x);
                }} ><FormatAlignRightIcon style={{ fontSize: 16 }} /></button>
              </div>

            </div>

            <div className='location' >
              {props.geofences.geo_name !== "null" && props.geofences.geo_name !== null ? (
                <div style={{ display: 'flex', alignItems: 'center' }} onClick={() => {
                  window.open(`https://maps.google.com/?q=${props.geofences.geo_y},${props.geofences.geo_x}`, '_blank');
                }}   >  <LocationOnIcon style={{ fontSize: 20 }} />   {props.geofences.geo_name}   </div>
              ) : (null)}
            </div>

            <div style={{ width: '100%', paddingBottom: 35, fontSize: 16, paddingTop: 10, height: 150, overflow: 'auto' }}  >

              {props.desc.split('\n').map((i, n) => {
                return <p key={n} >{i}</p>
              })}
            </div>



            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row-reverse' }} >
              <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row-reverse', width: '50%' }} >
                
                <AssingUser users={props.users} id={props.id} onRefTask={props} assigned={props.assigned} />
                {props.status !== "new" &&  props.task_type==="حذف" ? (null):(
                 <EditCustomer allstatus={props.allstatus} onProfileDelete={props} id={props.id} title={props.name}
                 time={props.time} desc={props.desc} status={props.status} type={props.type} task_type={props.task_type}
                 users={props.users} Geofences={props.Geofences} geofences={props.geofences} weight={props.weight} onRefreshGeo={props}
                 monitor={props.monitor} onRefTask={props} customer={props.customer} Allcustomer={props.Allcustomer} />
                )}
                  <AttachFile id={props.id} onRefTask={props} />
              </div>

              <Status status={props.status} onRefTask={props} id={props.id} />

            </div>
            <div style={{display:'flex',alignItems:'center',justifyContent:'flex-end'}}  >
            <span style={{marginRight:10}}  >
              {props.status === "rejected" && JSON.parse(localStorage.getItem("roles")).includes(7) ? (
                <i className="far fa-trash-alt"  id="dels" onClick={() => {                   
                    if (window.confirm('Delete the Task?')) { Delete(props.id) }
                  }}></i>
              ) : (null)}
                 </span>
           
            {JSON.parse(localStorage.getItem("roles")).includes(9) === false ? (null) : (<span style={{ display: 'flex', justifyContent: 'flex-end', cursor: 'help' }} >
              <img src={require('../../../assets/img/log1.png')} alt='img' style={{ height: 20 }} onClick={() => { window.open(`https://www.iraq-gis.com/` + `LogTable?id=${props.id}&name=${"Task"}`, '_blank') }} />
            </span>)}
        
                 </div>
                 {spin===true ? (
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
          </ExpansionPanelDetails>

          <div id='pan_main'  >
            <div style={{ width: '50%' }} ><Comments id={props.id} onRefTask={props} comment={props.comment} comments_count={props.comments_count} /></div>
            <div style={{ width: '50%' }} ><Details id={props.id} onRefTask={props} /></div>
          </div>


        </ExpansionPanel>
      </div>


    </div>


  );
}


