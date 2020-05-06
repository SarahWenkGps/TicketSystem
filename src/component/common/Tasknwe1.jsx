import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import Component from '@reactions/component';
import Lottie from "lottie-react-web";
import loading from '../../assets/js/loading.json';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import axios from "axios";
import {Popover,Pane,Button} from 'evergreen-ui';
import Cookies from "universal-cookie";
import Host from "../../assets/js/Host";
import Details from './Details';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AssingUser from './AssignUser';
import EditTask from './EditTask';
import Comments from './Comments';
const cookies = new Cookies();
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '50%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    flexBasis: '50%',
    textAlign: 'end',
  },

}));


export default function ControlledExpansionPanels(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <div className="ControlledExpansionPanels"  >


      <div style={{ marginTop: 20 }}  >
        {props.status === "approved" ? (
          <div id='tit_task' style={{ backgroundColor: '#188718b5' }} >{props.status} </div>
        ) : (
            null
          )}
        {props.status === "rejected" ? (
          <div id='tit_task' style={{ backgroundColor: '#da251e' }} >{props.status} </div>
        ) : (
            null
          )}
        {props.status === "closed" ? (
          <div id='tit_task' style={{ backgroundColor: 'gray' }} >{props.status} </div>
        ) : (
            null
          )}
        {props.status === "new" ? (
          <div id='tit_task' style={{ backgroundColor: '#2e6b95' }} >{props.status} </div>
        ) : (
            null
          )}
        {props.status === "in progress" ? (
          <div id='tit_task' style={{ backgroundColor: '#f06105cc' }} >{props.status} </div>
        ) : (
            null
          )}
        {props.status === "assigned" ? (
          <div id='tit_task' style={{ backgroundColor: '#d5ad00d4' }} >{props.status} </div>
        ) : (
            null
          )}
        {props.status === "archived" ? (
          <div id='tit_task' style={{ backgroundColor: 'black' }} >{props.status} </div>
        ) : (
            null
          )}

        <ExpansionPanel
          style={{ backgroundColor: 'rgba(241, 237, 237, 0.42)', minHeight: 80, display: 'flex', flexDirection: 'column', justifyContent: 'center', boxShadow: '1px 1px 4px 0px grey' }} >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography className={classes.heading}>{props.name}  </Typography>
            <Typography className={classes.secondaryHeading}> {props.time}  </Typography>
          
          </ExpansionPanelSummary>
          <ExpansionPanelDetails style={{ display: 'flex', flexDirection: 'column' }}  >


            {props.desc}
           
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row-reverse' }} >
              <AssingUser users={props.users} id={props.id} onProfileDelete={props} />

              {props.assigners.length > 0 ? (
               
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
                   backgroundColor="#dfe0e0c9"
                    flexDirection="column"
                  >
                  
                  {props.assigners.map((item, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 20, borderBottom: '1px solid #9e9c9c',width:'100%',padding:5 }}  >
                      {item.name}
                      <i className="far fa-trash-alt" id="del" onClick={() => {
                        setState({spin:true})
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
                              toast.error(response.data.data.message)
                              // console.log(response.data);
                              setState({spin:false})

                            }
                            else if (response.data.status === true) {
                              // console.log(response.data);
                              toast.success("deleted successfully")
                              const { onProfileDelete } = props
                              onProfileDelete();
                              setState({spin:false})
                            }
                          })
                          .catch(function (err) {
                            // console.log(err);
                            setState({spin:false})
                          });
                      }}
                      ></i>
                       
                    </div>
                    
                  ))}           
                  </Pane>
                } >
                <Button style={{marginRight:10}}  >Assigners </Button>
              </Popover>
              {state.spin === true ? (
                                    <div style={{  position: "absolute",zIndex:20 }}>
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
                 )}

              <EditTask allstatus={props.allstatus} onProfileDelete={props} id={props.id} />
            </div>

          </ExpansionPanelDetails>

          <div id='pan_main'  >
            <div style={{width:'50%'}} ><Comments id={props.id} onProfileDelete={props} /></div>
            <div style={{width:'50%'}} ><Details /></div>
          </div>



        </ExpansionPanel>
      </div>


    </div>
  );
}


