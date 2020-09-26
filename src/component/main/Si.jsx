import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Box from '@material-ui/core/Box';
import { Popover, Pane, Avatar } from 'evergreen-ui';
import Badge from '@material-ui/core/Badge';
import { Link, NavLink } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap';
import Tooltip from '@material-ui/core/Tooltip';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Redirect } from 'react-router-dom';
import Context from '../../assets/js/context';
import Task_type from './Task_type';
import Users from './Users/Users';
import Tasks from './Tasks/Tasks';
import Detials_TaskEdit from './Tasks/Detials_TaskEdit';
import NoteTask from './Tasks/NoteTask';
import UserInfo from '../common/UserInfo';
import LogTable from '../common/LogTable';
import Department from './Department/Department';
import Dashboard from './Dashboard/Dashboard';
import Customers from './CustomersCare/Customers';
import Notifications from './Notifications';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

function rendertitile(props) {
  if (props.match.path === '/Task_type') {
    return (<div> Task Type  </div>)
  }

  else if (props.match.path === '/Users') {
    return (<div>  Users  </div>)
  }

  else if (props.match.path === '/Dashboard') {
    return (<div>  Dashboard  </div>)
  }

  else if (props.match.path === '/Department') {
    return (<div>  Departments  </div>)
  }
  else if (props.match.path === '/Notifications') {
    return (<div>  Notification   </div>)
  }

  else if (props.match.path === '/Detials_TaskEdit') {
    return (<div>  Edit  Task    </div>)
  }
  else if (props.match.path === '/Tasks') {
    return (<div>  Tasks   </div>)
  }
  else if (props.match.path === '/NoteTask') {
    return (<div>  Tasks   </div>)
  }
  else if (props.match.path === '/Customers') {
    return (<div>  Customers   </div>)
  }
  else if (props.match.path === '/List') {
    return (<div>   List   </div>)
  }
  else if (props.match.path === '/LogTable') {
    return (<div>   Log   </div>)
  }
}








const drawerWidth = 210;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    zIndex: '2',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
      zIndex: '2',
    }),
  },
  MuiAppBar: {
    root: {
      zIndex: '2',
    }

  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    display: 'flex',

  },
  drawerPaper: {
    width: drawerWidth,
    overflowY: 'visible',
    backgroundColor: '#c2c3c478',
    color: '#757575'
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    zIndex: '2',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',

  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function PersistentDrawerLeft(props) {

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const renderPage = (props) => {
    if (props.match.path === '/Task_type') {
      return (<Task_type />)
    }
    else if (props.match.path === '/Users') {
      return (<Users />)
    }
    else if (props.match.path === '/Tasks') {
      return (<Tasks />)
    }
    else if (props.match.path === '/Customers') {
      return (<Customers />)
    }
    else if (props.match.path === '/Notifications') {
      return (<Notifications />)
    }
    else if (props.match.path === '/Dashboard') {
      return (<Dashboard />)
    }
    else if (props.match.path === '/Department') {
      return (<Department />)
    }
    else if (props.match.path === '/NoteTask') {
      return (<NoteTask />)
    }
    else if (props.match.path === '/LogTable') {
      return (<LogTable />)
    }
    else if (props.match.path === '/Detials_TaskEdit') {
      return (<Detials_TaskEdit />)
    }
  }



  function onEnter(event) {
    if (event.keyCode === 13) {
      // document.getElementById("sign_but").click();
      window.open(`https://www.iraq-gis.com/` + `Detials_TaskEdit?id=${event.target.value}`, '_blank')
      console.log(event.target.value);
    }
  }
  return (

    <Context.Consumer>{ctx => {


      if (ctx.value.che === "notlogin") {
        return (
          <Redirect to="/"></Redirect>
        )
      } else if (ctx.value.che === "login") {
        return (
          <div className={classes.root}>
            <CssBaseline />
            <AppBar id='abr'
              position="fixed"
              className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
              })}
            >
              <Navbar expand="lg" id="navmain">
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  className={clsx(classes.menuButton, open && classes.hide)}
                >
                  <MenuIcon />
                </IconButton>

                {/* <Navbar.Brand >{rendericon(this.props)}</Navbar.Brand> */}

                <Nav className="mr-auto">

                </Nav>
                <div id='sarnavimg44'>
                  <div id='nav_title' >   {rendertitile(props)} </div>

                  <div id='ss' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}  >

                    <div></div>
                    <Link to='/Notifications'>
                      <Box display="flex">
                        <Box m={2}>
                          <Badge badgeContent={ctx.value.noti} color="secondary">
                            <NotificationsIcon style={{ color: 'white' }} />
                          </Badge>
                        </Box>
                      </Box>
                    </Link>
                    <UserInfo ids={cookies.get("user_id")} />

                    <Tooltip title="Logout" onClick={() => {
                      cookies.remove("token");
                      window.location.href = "/"
                    }}   >
                      <IconButton aria-label="Logout">
                        <ExitToAppIcon style={{ color: '#fff' }} />
                      </IconButton>
                    </Tooltip>




                  </div>

                </div>



              </Navbar>


            </AppBar>
            <Drawer
              className={classes.drawer}
              variant="persistent"
              anchor="left"
              open={open}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              {/* <div className={classes.drawerHeader}>
       
        </div> */}

              <div id='jj'>
                <div style={{ display: 'flex', width: '100%', flexDirection: 'row-reverse', paddingRight: '10px' }} >
                  <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                  </IconButton>
                </div>
                <div className={classes.toolbar} />

                <div className='logo-large' >
                  <img src={require('../../assets/img/Logo.png')} alt='img' style={{ height: 100 }} />
                </div>

                <NavLink to='/Dashboard' activeClassName='active' >
                  <List className='sidefect' style={{ paddingBottom: 0 }} >
                    <ListItem >
                      <img src={require('../../assets/img/home.png')} alt='img' id='side_img' />
                      <ListItemText ><span className='sspan' style={{ fontWeight: '500', fontSize: '16px' }}>Dashboard</span></ListItemText>
                    </ListItem>
                  </List>
                </NavLink>

                <NavLink to='/Users' activeClassName='active' >
                  <List className='sidefect' style={{ paddingBottom: 0 }} >
                    <ListItem >
                      <img src={require('../../assets/img/user.png')} alt='img' id='side_img' />
                      <ListItemText ><span className='sspan' style={{ fontWeight: '500', fontSize: '16px' }}>Users</span></ListItemText>
                    </ListItem>
                  </List>
                </NavLink>

                {JSON.parse(localStorage.getItem("roles")).includes(3) && JSON.parse(localStorage.getItem("roles")).includes(4) ? (

                  <NavLink to='/Department' activeClassName='active' >
                    <List className='sidefect' style={{ paddingBottom: 0 }} >
                      <ListItem >
                        <img src={require('../../assets/img/web.png')} alt='img' id='side_img' />
                        <ListItemText ><span className='sspan' style={{ fontWeight: '500', fontSize: '16px' }}>Departments</span></ListItemText>
                      </ListItem>
                    </List>
                  </NavLink>

                ) : (null
                  )}


                <NavLink to='/Tasks' activeClassName='active' >
                  <List className='sidefect' style={{ paddingBottom: 0 }} >
                    <ListItem >
                      <img src={require('../../assets/img/list.png')} alt='img' id='side_img' />
                      <ListItemText ><span className='sspan' style={{ fontWeight: '500', fontSize: '16px' }}>Tasks</span></ListItemText>
                    </ListItem>
                  </List>
                </NavLink>

                <NavLink to='/Customers' activeClassName='active' >
                  <List className='sidefect' style={{ paddingBottom: 0 }} >
                    <ListItem >
                      <img src={require('../../assets/img/target.png')} alt='img' id='side_img' />
                      <ListItemText ><span className='sspan' style={{ fontWeight: '500', fontSize: '16px' }}>Customer Care</span></ListItemText>
                    </ListItem>
                  </List>
                </NavLink>


                {JSON.parse(localStorage.getItem("roles")).includes(11) === false ? (
                  <div></div>
                ) : (
                    <NavLink to='/Task_type' activeClassName='active' >
                      <List className='sidefect' style={{ paddingBottom: 0 }} >
                        <ListItem >
                          <img src={require('../../assets/img/list.png')} alt='img' id='side_img' />
                          <ListItemText ><span className='sspan' style={{ fontWeight: '500', fontSize: '16px' }}>Task Type</span></ListItemText>
                        </ListItem>
                      </List>
                    </NavLink>)}

                <NavLink to='/Notifications' activeClassName='active' >
                  <List className='sidefect' style={{ paddingBottom: 0 }} >
                    <ListItem >
                      <img src={require('../../assets/img/bell.png')} alt='img' id='side_img' />
                      <ListItemText ><span className='sspan' style={{ fontWeight: '500', fontSize: '16px' }}>Notifications</span></ListItemText>
                    </ListItem>
                  </List>
                </NavLink>

              </div>

              <div id='foot'  >
                <input type="number" placeholder="Search Task ID"
                  title="Write task id then click enter"

                  onKeyDown={(event) => onEnter(event)}
                // onChange={(event)=> handleInput(event) }
                />
              </div>


            </Drawer>
            <main
              className={clsx(classes.content, {
                [classes.contentShift]: open,
              })}
            >
              <div className={classes.drawerHeader} />


              {renderPage(props)}


            </main>
          </div>

        )
      } else if (ctx.value.che === "") {
        return (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}  >

            {/* <Lottie
                 options={{
                   animationData: animation,
                 }}
                width={300}
                height={300}
               /> */}
          </div>
        )
      }

    }}

    </Context.Consumer>



  );

}
