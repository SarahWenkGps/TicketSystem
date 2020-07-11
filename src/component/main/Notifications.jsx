import React from 'react';
import Noti from '../common/Noti';
import Cookies from "universal-cookie";
import Host from "../../assets/js/Host";
import axios from "axios";
import { Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Lottie from "lottie-react-web";
import Context from "../../assets/js/context";
import loading from '../../assets/js/loading.json';
import { Redirect } from "react-router-dom";
const cookies = new Cookies();
class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      redir: false,
      data: [],
      watt: "yes",
      spin: false,
      check: "",
      redirect: false
    };
  }


  componentDidMount() {
    if (cookies.get("token")) {
      this.setState({ check: "login" })
    }
    const jwt = cookies.get("token");
    var headers = {
      jwt: jwt,
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    };

    axios({
      url: Host + `notifications`,
      method: "GET",
      headers: headers,
    })
      .then(res => {

        this.setState({ data: res.data.data })
        this.setState({ watt: "no" });
  
        // var result = Object.values(res.data.data.reduce((c, v) => {
        //   let k = v.task_title + '-' + v.task_id;
        //   c[k] = c[k] || [];
        //   c[k].push(v);
        //   return c;
        // }, {})).reduce((c, v) => v.length > 1 ? c.concat(v) : c, []);
        
        // console.log(result);
   
        
      })
  }

  clearNoti() {

    var headers = {
      jwt: cookies.get("token"),
    };
    axios({
      url: Host + `notifications/clear_notifications`,
      method: "POST",
      headers: headers,

    })
      .then(response => {
        if (response.data.status === false) {
          toast.error(response.data.data.message.text)
        } else {
          toast.success("Done")
          this.componentDidMount();
        }
      })
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
    .then(res =>{
      this.componentDidMount();
    })
  }

  render() {
    return (
      <Context.Consumer>
      {ctx => {
        if (this.state.check === "notlogin") {
          return <Redirect to="/"></Redirect>;
        } else
          if (
            this.state.check === "login" && this.state.watt === "no"

          ) {
            return (
     
     
     <div>
{/* {this.renderRedirect()} */}

        <div>

          {/* <button onClick={()=>{
        this.setRedirect()
          }} >nnnnn</button> */}
          {this.state.data.length > 0 ? (
            <div id='clear_noti' onClick={() => {
              this.clearNoti();
            }} > Clear Notifications  </div>
          ) : (null)}
        </div>
        <Row style={{ width: '100%', display: 'flex' }}   >
          {this.state.data.map((p, i) => (
            <Col md={6} key={i}  onClick={()=>{
              this.setRead(p.activity_id);
              setTimeout(() => {
                {window.open(`https://www.iraq-gis.com/`+`NoteTask?id=${p.task_id}`,'_blank')}
              }, 200);
            
           
                }}   >

              <Noti type={p.type} id={p.task_id} note={p.note} commenter={p.commenter} time={p.date_time} task_title={p.task_title}
                user_updater={p.user_updater} assign_from={p.assign_from} assign_to={p.assign_to} activity_id={p.activity_id} onProfileDelete={() => this.componentDidMount()}
              />
            </Col>
          ))}
        </Row>
      </div>
    );
  } else if (this.state.check === "" || this.state.watt === "yes") {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }} >
        <Lottie
          options={{
            animationData: loading
          }}
          width={300}
          height={300}
        />
      </div>
   
   
   );
  }
}}
</Context.Consumer>
);
}
}

export default Notifications;
