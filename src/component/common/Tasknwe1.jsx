import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


import AssingUser from './AssignUser';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));


export default function ControlledExpansionPanels(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <div>

 
    <div  className={classes.root}  style={{marginTop:20}}  >
      <ExpansionPanel expanded={expanded === 'panel2'} onChange={handleChange('panel2')} 
      style={{backgroundColor:'rgba(241, 237, 237, 0.42)',minHeight:80,display:'flex',flexDirection:'column',justifyContent:'center',boxShadow:'1px 1px 4px 0px grey'}} >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>{props.name}  </Typography>
          <Typography className={classes.secondaryHeading}> {props.time}  </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style={{display:'flex',flexDirection:'column'}}  >
     
           {props.desc}
<AssingUser users={props.users} id={props.id} />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>


    </div>
  );
}


