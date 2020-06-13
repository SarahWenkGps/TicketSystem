import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import Details from './Details';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import "react-toastify/dist/ReactToastify.css";
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import AssingUser from './AssignUser';
import EditTask from './EditTask';
import ShowFile from './ShowFile';
import PersonIcon from '@material-ui/icons/Person';
import Comments from './Comments';
import AttachFile from './AttachFile';
import Status from './Status';
import moment from 'moment';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import CommentIcon from '@material-ui/icons/Comment';
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
    display:'flex',
    flexDirection:'column',
    justifyContent:'space-between',
  },

}));


export default function ControlledExpansionPanels(props) {
  const classes = useStyles();
  // const [ setExpanded] = React.useState(false);

  // const handleChange = (panel) => (event, isExpanded) => {
  //   setExpanded(isExpanded ? panel : false);


  // };
  return (

    <div className="ControlledExpansionPanels"  >


      <div   >
        {props.status === "approved" ? (
          <div id='head_task' >   <div id='tit_task' style={{ backgroundColor: '#188718b5' }} >Approved  </div> 
            <div className='weight' > {props.weight} </div>
           <div className='task_type_style'>  {props.task_type} </div>
           {/* <div className='task_priority'  > {props.priority}  </div> */}
           {props.files.length >0? (<AttachFileIcon  className='icon_file_head' />):(null)}
            </div>
        ) : (
            null
          )}
        {props.status === "rejected" ? (
          <div id='head_task' >     <div id='tit_task' style={{ backgroundColor: '#da251e' }} >Rejected</div> 
           <div className='weight' > {props.weight} </div>
          <div className='task_type_style'>  {props.task_type} </div>
          {/* <div className='task_priority'  > {props.priority}  </div> */}
          {props.files.length >0? (<AttachFileIcon  className='icon_file_head' />):(null)}
           </div>
        ) : (
            null
          )}
        {props.status === "closed" ? (
          <div id='head_task' >     <div id='tit_task' style={{ backgroundColor: 'gray' }} >Closed </div> 
           <div className='weight' > {props.weight} </div>
          <div className='task_type_style'>  {props.task_type} </div> 
          {/* <div className='task_priority'  > {props.priority}  </div>  */}
          {props.files.length >0? (<AttachFileIcon  className='icon_file_head' />):(null)}
           </div>
        ) : (
            null
          )}
        {props.status === "new" ? (
          <div id='head_task' >     <div id='tit_task' style={{ backgroundColor: '#2e6b95' }} >New </div> 
          <div className='weight' > {props.weight} </div>
          <div className='task_type_style'>  {props.task_type} </div> 
          {/* <div className='task_priority'  > {props.priority}  </div> */}
          {props.files.length >0? (<AttachFileIcon  className='icon_file_head' />):(null)}
            </div>
        ) : (
            null
          )}
        {props.status === "in progress" ? (
          <div id='head_task' >    <div id='tit_task' style={{ backgroundColor: '#f06105cc' }} > In progress </div> 
            <div className='weight' > {props.weight} </div>
           <div className='task_type_style'>  {props.task_type} </div> 
           {/* <div className='task_priority'  > {props.priority}  </div>  */}
           {props.files.length >0? (<AttachFileIcon  className='icon_file_head' />):(null)}
            </div>
        ) : (
            null
          )}
        {props.status === "assigned" ? (
          <div id='head_task' >     <div id='tit_task' style={{ backgroundColor: '#d5ad00d4' }} > Assigned </div> 
            <div className='weight' > {props.weight} </div>
           <div className='task_type_style'>  {props.task_type} </div> 
           {/* <div className='task_priority'  > {props.priority}  </div> */}
           {props.files.length >0? (<AttachFileIcon  className='icon_file_head' />):(null)}
             </div>
        ) : (
            null
          )}
        {props.status === "archived" ? (
          <div id='head_task' >     <div id='tit_task' style={{ backgroundColor: 'black' }} > Archived </div> 
           <div className='weight' > {props.weight} </div>
           <div className='task_type_style'>  {props.task_type} </div>  
           {/* <div className='task_priority'  > {props.priority}  </div> */}
           {props.files.length >0? (<AttachFileIcon  className='icon_file_head' />):(null)}
            </div>
        ) : (
            null
          )}

        <ExpansionPanel
          style={{ backgroundColor: 'rgba(241, 237, 237, 0.42)', display: 'flex', flexDirection: 'column', justifyContent: 'center', boxShadow: '1px 1px 4px 0px grey' }} >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <div className={classes.heading}>
              {props.name}
              <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }} >
                <div style={{ color: 'rgb(127, 127, 127)', fontSize: 14, fontWeight: '100', display: 'flex' }} >
                  <div><PersonIcon style={{ fontSize: 14 }} /> {props.createdby} </div>
                  {props.monitor.name !== null ? (<div style={{ marginLeft: 15 }} >  <img src={require('../../../assets/img/2.png')} alt='img' style={{ height: 15 }} />  {props.monitor.name} </div>) : (null)}
                </div>
                {props.assigners.length > 0 ? (<div style={{ color: 'rgb(127, 127, 127)', fontSize: 14, fontWeight: '100' }}  >   <PeopleAltIcon style={{ fontSize: 14 }} />    {props.assigners[0].name} {props.assigners.length > 1 ? (
                  <span id='OthersParent' > +  {props.assigners.length - 1} Others <span id='OthersContent' > {props.assigners.map((p, i) => (<div key={i}  > {p.name} </div>))}  </span> </span>) : (null)} </div>) : (null)}
                
               
                  <div style={{ color: 'rgb(127, 127, 127)', fontSize: 10, fontWeight: '100' }}   > {moment(props.created_at).format("lll")}  </div>
               
               
              </div>
            </div>
            <div className={classes.secondaryHeading}>
              <div> {props.time === '1970-01-01T00:00:00.000Z' ? (
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
             
<div id='icons_headerTask' > {props.geofences.geo_name !== null?(<LocationOnIcon style={{fontSize:18,marginRight:10}} />):(null)}     {props.comments_count>0 ?( <div> <CommentIcon style={{fontSize:18,color:'#3e83b2'}} /> {props.comments_count} </div>  ):(null)} </div>
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid rgb(225, 227, 229)' }}  >
 
            <div style={{ display: 'flex',justifyContent:'space-between' }} >
              <div>  {props.files.length >0? ( <ShowFile files={props.files} onProfileDelete={props}  /> ):(null)}</div>
           
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
            {props.geofences.geo_name !== null? (
            <div style={{display:'flex',alignItems:'center'}} onClick={()=>{
              window.open(`https://maps.google.com/?q=${props.geofences.geo_y},${props.geofences.geo_x}`, '_blank');
            }}   >  <LocationOnIcon  style={{fontSize:20}} />   {props.geofences.geo_name}   </div>  
            ):(null)}
                </div>

            <div  style={{ width: '100%', paddingBottom: 35, fontSize: 16, paddingTop: 10, height: 150, overflow: 'auto' }}  >

              {props.desc.split('\n').map((i, n) => {
                return <p key={n} >{i}</p>
              })}
            </div>



            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row-reverse' }} >
              <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row-reverse', width: '50%' }} >
                <AssingUser users={props.users} id={props.id} onProfileDelete={props} assigned={props.assigned} />
                <EditTask allstatus={props.allstatus} onProfileDelete={props} id={props.id} title={props.name}
                  time={props.time} desc={props.desc} status={props.status} type={props.type} task_type={props.task_type}
                   users={props.users} Geofences={props.Geofences} geofences={props.geofences}  />
                <AttachFile id={props.id} onProfileDelete={props} />
              </div>

              <Status status={props.status} onProfileDelete={props} id={props.id} />

            </div>

          </ExpansionPanelDetails>

          <div id='pan_main'  >
            <div style={{ width: '50%' }} ><Comments id={props.id} onProfileDelete={props} comment={props.comment} comments_count={props.comments_count} /></div>
            <div style={{ width: '50%' }} ><Details id={props.id} onProfileDelete={props} /></div>
          </div>



        </ExpansionPanel>
      </div>


    </div>


  );
}


