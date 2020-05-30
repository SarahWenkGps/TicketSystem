import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Component from '@reactions/component';
import Lottie from "lottie-react-web";
import loading from '../../assets/js/loading.json';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import axios from "axios";
import { Popover, Pane, Button } from 'evergreen-ui';
import Cookies from "universal-cookie";
import Host from "../../assets/js/Host";
import Details from './Details';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import AssingUser from './AssignUser';
import EditTask from './EditTask';
import PersonIcon from '@material-ui/icons/Person';
import Comments from './Comments';
import Status from '../common/Status';
import moment from 'moment';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
const cookies = new Cookies();
const detectNewline = require('detect-newline');
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


      <div style={{ marginTop: 20 }}  >
        {props.status === "approved" ? (
          <div id='tit_task' style={{ backgroundColor: '#188718b5' }} >Approved </div>
        ) : (
            null
          )}
        {props.status === "rejected" ? (
          <div id='tit_task' style={{ backgroundColor: '#da251e' }} >Rejected</div>
        ) : (
            null
          )}
        {props.status === "closed" ? (
          <div id='tit_task' style={{ backgroundColor: 'gray' }} >Closed </div>
        ) : (
            null
          )}
        {props.status === "new" ? (
          <div id='tit_task' style={{ backgroundColor: '#2e6b95' }} >New </div>
        ) : (
            null
          )}
        {props.status === "in progress" ? (
          <div id='tit_task' style={{ backgroundColor: '#f06105cc' }} > In progress </div>
        ) : (
            null
          )}
        {props.status === "assigned" ? (
          <div id='tit_task' style={{ backgroundColor: '#d5ad00d4' }} > Assigned </div>
        ) : (
            null
          )}
        {props.status === "archived" ? (
          <div id='tit_task' style={{ backgroundColor: 'black' }} > Archived </div>
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
                <div style={{ color: 'rgb(127, 127, 127)', fontSize: 14, fontWeight: '100' }} > <PersonIcon style={{ fontSize: 14 }} /> {props.createdby}</div>
                {props.assigners.length > 0 ? (<div style={{ color: 'rgb(127, 127, 127)', fontSize: 14, fontWeight: '100' }}  >   <PeopleAltIcon style={{ fontSize: 14 }} />    {props.assigners[0].name} {props.assigners.length > 1 ? (
                  <span id='OthersParent' > +  {props.assigners.length - 1} Others <span id='OthersContent' > {props.assigners.map((p, i) => (<div key={i}  > {p.name} </div>))}  </span> </span>) : (null)} </div>) : (null)}
                <div style={{ color: 'rgb(127, 127, 127)', fontSize: 10, fontWeight: '100' }}   > {moment(props.created_at).format("lll")}  </div>
              </div>
            </div>
            <div className={classes.secondaryHeading}>
              {props.time === '0000-00-00 00:00:00' ? (
                null
              ) : (
                  <div id="parent">
                    {moment().format('lll') >= moment(props.time).format("lll") ? (
                      <AccessAlarmIcon
                        style={{ color: '#da251e', cursor: 'pointer' }} />
                    ) : (<AccessAlarmIcon
                      style={{ color: 'green', cursor: 'pointer' }} />)}

                    <div id="hover-content" >
                      {moment(props.time).format("lll")}
                    </div>
                  </div>

                )}

            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid rgb(225, 227, 229)' }}  >
            <div style={{ display: 'flex' }} >
              <button className='btn_lang' onClick={() => {
                var x = document.createElement("STYLE");
                var t = document.createTextNode("p {text-align: start;}");
                x.appendChild(t);
                document.head.appendChild(x);
              }} > <FormatAlignLeftIcon   style={{fontSize:16}}  /> </button>
              <button className='btn_lang' onClick={() => {
                var x = document.createElement("STYLE");
                var t = document.createTextNode("p {text-align: end;}");
                x.appendChild(t);
                document.head.appendChild(x);
              }} ><FormatAlignRightIcon  style={{fontSize:16}}  /></button>
            </div>
            <div id='lang' style={{ width: '100%', paddingBottom: 35, fontSize: 16, paddingTop: 10, height: 150, overflow: 'auto' }}  >

              {props.desc.split('\n').map((i, n) => {
                return <p key={n} >{i}</p>
              })}
            </div>



            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row-reverse' }} >
              <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row-reverse', width: '50%' }} >
                <AssingUser users={props.users} id={props.id} onProfileDelete={props} assigned={props.assigned} />
                {/* {props.assigners.length > 0 ? (
                  <Component initialState={{ spin: false }}>
                    {({ state, setState }) => (
                      <div>
                        <Popover
                          content={
                            <Pane
                              width={240}
                              height={240}
                              overflow="auto"
                              display="flex"
                              alignItems="center"
                              backgroundColor="#FFF"
                              flexDirection="column"
                              color="#2e6b95"
                              padding="5px"
                            >

                              {props.assigners.map((item, i) => (
                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 20, borderBottom: '1px solid #9e9c9c', width: '100%', padding: 5 }}  >
                                  {item.name}
                                  <i className="far fa-trash-alt" id="del" onClick={() => {
                                    setState({ spin: true })
                                    var headers = {
                                      "Content-Type": "application/json",
                                      jwt: cookies.get("token")
                                    };
                                    axios({
                                      url: Host + `tasks/unassign/${props.id}`,
                                      method: "POST",
                                      headers: headers,
                                      data: {
                                        user_id: item.user_id
                                      }
                                    })
                                      .then(response => {
                                        if (response.data.status === false) {
                                          toast.error(response.data.data.message.text)
                                          // console.log(response.data);
                                          setState({ spin: false })
                                        } else if (response.data.status === true) {
                                          // console.log(response.data);
                                          toast.success("deleted successfully")
                                          const { onProfileDelete } = props
                                          onProfileDelete();
                                          setState({ spin: false })
                                        }
                                      })
                                      .catch(err => {
                                        // console.log(err);
                                        setState({ spin: false })
                                      });
                                  }}
                                  ></i>

                                </div>

                              ))}
                            </Pane>
                          } >
                          <Button style={{ marginRight: 10 }}  >Assigners </Button>
                        </Popover>
                        {state.spin === true ? (
                          <div style={{ position: "absolute", zIndex: 20 }}>
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
                    )}

                  </Component>

                ) : (
                    null
                  )} */}

                <EditTask allstatus={props.allstatus} onProfileDelete={props} id={props.id} title={props.name}
                  time={props.time} desc={props.desc} status={props.status} />

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


