import React from 'react';
import { Tab, Tabs, Row, Col } from 'react-bootstrap';
import loading from '../../assets/js/loading.json';
import axios from "axios";
import Cookies from "universal-cookie";
import Lottie from 'lottie-react-web';
import Host from "../../assets/js/Host";
import 'react-toastify/dist/ReactToastify.css';
import Tasknwe1 from '../common/Tasknwe1';
import moment from 'moment';
import Context from "../../assets/js/context";
const cookies = new Cookies();


class Home extends React.Component{
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      noti:[],
    }
  }

componentDidMount(){
  var headers = {
    jwt: cookies.get("token"),
  };
    const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get('id');
  axios
    .get(Host + `tasks/task/${myParam}?params={"from_date":0,"to_date":0}`, {
      headers: headers,
    })
    .then(res => {
   this.setState({noti:res.data.data})
   console.log(res.data.data);
   
   
    })
  
}





render() {
  return (
  <div id='ttt'>
{this.state.noti.length >0 ?(
    <Row style={{ width: '100%', display: 'flex' }}   >
    <Col md={6}  id='noti_Get'  >

    <Tasknwe1  id='nnn'  name={this.state.noti[0].task_title} time={this.state.noti[0].dead_time} desc={this.state.noti[0].description}
      created_at={this.state.noti[0].created_at} id={this.state.noti[0].task_id}  assigners={this.state.noti[0].assigners}
      onProfileDelete={() => this.componentDidMount()} status={this.state.noti[0].status} 
      createdby={this.state.noti[0].issuer_user.name} created_at={this.state.noti[0].created_at} assigned={this.state.noti[0].assigners.map((p, i) => (p.user_id))} comments_count={this.state.noti[0].comments_count} />

  </Col>
  </Row>
):(null)}
  </div>
  );
}}

export default Home;
