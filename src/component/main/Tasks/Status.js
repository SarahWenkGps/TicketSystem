
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import ArchiveIcon from '@material-ui/icons/Archive';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import EditIcon from '@material-ui/icons/Edit';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import InfoIcon from '@material-ui/icons/Info';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import { toast } from "react-toastify";
import Lottie from "lottie-react-web";
import loading from '../../../assets/js/loading.json';
import axios from "axios";
import Cookies from "universal-cookie";
import Host from "../../../assets/js/Host";

const cookies = new Cookies();
var spin;
const useStyles = makeStyles((theme) => ({
  root: {
    height: 100,
    transform: 'translateZ(0px)',
    flexGrow: 1,

  },
  speedDial: {
    position: 'absolute',
    bottom: theme.spacing(2),
    left: theme.spacing(2),
  },
}));

function myFunction(props, data) {
  spin = true
  var headers = {
    jwt: cookies.get("token")
  };
  axios({
    url: Host + `tasks/change_status/${props.id}`,
    method: "PUT",
    headers: headers,
    data: { status_id: data },
  })
    .then(res => {
      if (res.data.status === true) {
        toast.success('task updated successfully')
        const { onRefTask } = props.onRefTask
        onRefTask()
        spin = false
      }
      else if (res.data.status === false) {
        toast.error(res.data.data.message.text)
        spin = false
      }
    })
    .catch(err => {
      toast.error("Network Error")
      spin = false
    })

}

export default function OpenIconSpeedDial(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);

  // const handleVisibility = () => {
  //   setHidden((prevHidden) => !prevHidden);
  // };
  const actions = [
    { icon: <AutorenewIcon onClick={() => { myFunction(props, 2) }} />, name: 'In Progress' },
    { icon: <DoneAllIcon onClick={() => { myFunction(props, 3) }} />, name: 'Close' },
    { icon: <ThumbUpIcon onClick={() => { myFunction(props, 5) }} />, name: 'Approve' },
    { icon: <ThumbDownIcon onClick={() => { myFunction(props, 4) }} />, name: 'Reject' },
    { icon: <ArchiveIcon onClick={() => { myFunction(props, 6) }} />, name: 'Archive' },
    { icon: <FiberNewIcon onClick={() => { myFunction(props, 1) }} />, name: 'New' },
  ];

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      {/* <Button onClick={handleVisibility}>Toggle Speed Dial</Button> */}
      <SpeedDial
        ariaLabel="SpeedDial openIcon example"
        className={classes.speedDial}
        hidden={hidden}
        icon={<SpeedDialIcon openIcon={<EditIcon />} />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        direction={'right'}

      >

        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={handleClose}

          />
        ))}
      </SpeedDial>

      {spin === true ? (
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
