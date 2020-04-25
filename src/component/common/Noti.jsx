import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
      style={{backgroundColor:'rgba(57, 208, 65, 0.54)',minHeight:80,display:'flex',flexDirection:'column',justifyContent:'center'}} >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>NOTIFICATIONS TITLE   </Typography>
          <Typography className={classes.secondaryHeading}> {props.name}   </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
           NOTIFICATIONS DETAILS .................
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>


    </div>
  );
}


