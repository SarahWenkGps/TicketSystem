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
      redirect: false,
      arrayUniqueByKey:[],
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
// console.log(res.data.data);

const result = [];
const map = new Map();
for (const item of res.data.data) {
  if(!map.has(item.task_id)){
      map.set(item.task_id, true);   
      result.push(
        item
      );
  }
}
// console.log(result)
        this.setState({ data: res.data.data })
        this.setState({ watt: "no" });
        // const key = 'task_id';
        // const reverse = res.data.data.reverse()
        // const arrayUniqueByKey = [...new Map(reverse.map(item =>
        //   [item[key], item])).values()];
        
        // console.log(arrayUniqueByKey);
   this.setState({arrayUniqueByKey:result})
        
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


        <div>

        
          {this.state.data.length > 0 ? (
            <div id='clear_noti' onClick={() => {
              this.clearNoti();
            }} > Clear Notifications  </div>
          ) : (null)}
        </div>
        <Row style={{ width: '100%', display: 'flex' }}   >
          {this.state.arrayUniqueByKey.map((p, i) => (
            <Col md={6} key={i}    >

              <Noti type={p.type} id={p.task_id} note={p.note} commenter={p.commenter} time={p.date_time} task_title={p.task_title}
                user_updater={p.user_updater} assign_from={p.assign_from} assign_to={p.assign_to} activity_id={p.activity_id} onProfileDelete={() => this.componentDidMount()}
                arrayUniqueByKey={this.state.arrayUniqueByKey} allData={this.state.data}
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
