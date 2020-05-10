import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import GroupIcon from '@material-ui/icons/Group';
import CategoryIcon from '@material-ui/icons/Category';
import ChangeHistoryOutlinedIcon from '@material-ui/icons/ChangeHistoryOutlined';
import { Redirect } from 'react-router-dom';
import Lottie from 'lottie-react-web';
import ReactMinimalPieChart from 'react-minimal-pie-chart';
import Context from '../../assets/js/context';
import Cookies from "universal-cookie";
import DashTable from '../common/DashTable';
import loading from '../../assets/js/loading.json';
import Host from "../../assets/js/Host";
import axios from "axios";
import Taskdetails from '../common/Taskdetails';
const cookies = new Cookies();
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.wrapper = React.createRef();
    this.state = {
      Usersdata:[],
      check: '',
    spin:true
    };
  }

  componentDidMount() {

    var headers = {
      jwt: cookies.get("token"),
    
    };
    if (cookies.get("token")) {
      this.setState({ check: 'login' })

    }
    else {
      this.setState({ check: 'notlogin' })
    }
    axios({
      url: Host + `users/users`,
      method: "GET",

      headers: headers,
    })
      .then(res => {
        console.log(res.data);

        if (res.data.status === false) {
          cookies.remove("token");
          window.location.href = "/"
        } else {


          var arr = [];
          for (let index = 0; index < res.data.data.length; index++) {
           
         
            let obj = {
              hash:[index +1],
              name: res.data.data[index].name,
              tasks: (<Taskdetails  id={res.data.data[index].user_id}  />),
            }
            arr.push(obj);
            // console.log('data11',this.state.arr);
          }
          this.setState({
            Usersdata: arr ,spin:false
          });

        }
      })
      .catch(err => {
        // console.log("error:", err);


      });
    }

    render() {
      return (

        <Context.Consumer>{ctx => {


          if (this.state.check === "notlogin") {
            return (
              <Redirect to="/"></Redirect>
            )
          } else
            if (this.state.check === "login" && cookies.get("userslength")) {
              return (
                <div id='cuthome'  >

                  <Row id='dash_row' >

                    {(cookies.get("role")) === "Storekeeper" ? (null) : (
                      <div id='col_dash'  >
                        <div className='card'>
                          <div className='round'>
                            <GroupIcon />
                          </div>
                          <div className='card-body'>
                            <div className='numcard' > {cookies.get("userslength")} </div>
                            <div className='m-l-10 '>
                              <p className='mb-0'>Users</p>
                            </div>
                          </div></div>
                      </div>
                    )}


                    <div id='col_dash' >

                      <div className='card'>
                        <div className='round'>
                          <ChangeHistoryOutlinedIcon />

                        </div>
                        <div className='card-body'>
                          <div className='numcard' > {cookies.get("deplength")} </div>
                          <div className='m-l-10 '>
                            <p className='mb-0'> Sections</p>
                          </div>
                        </div>
                      </div>
                    </div>



                    <div id='col_dash'  >
                      <div className='card'>
                        <div className='round'>
                          <CategoryIcon />

                        </div>
                        <div className='card-body'>
                          <div className='numcard' >
                            {cookies.get("tasks")}
                          </div>
                          <div className='m-l-10 '>
                            <p className='mb-0'>Tasks </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Row>


                  <div id='min_circle'>

                    <div id='circle_div'>
                      <div id='left1' >
                        <div style={{ display: 'flex', padding: 5 }} >
                          <div style={{ width: 20, height: 20, marginRight: 10, backgroundColor: 'rgb(86, 178, 191)' }} />
                          <div> New Tasks  </div>
                        </div>
                        <div style={{ display: 'flex', padding: 5 }}>
                          <div style={{ width: 20, height: 20, marginRight: 10, backgroundColor: '#f06105cc' }} />
                          <div> Inprogress Tasks</div>
                        </div>
                        <div style={{ display: 'flex', padding: 5 }}>
                          <div style={{ width: 20, height: 20, marginRight: 10, backgroundColor: '#188718b5' }} />
                          <div> Approved Tasks</div>
                        </div>

                      </div>
                      <div id='circle1' >
                        <ReactMinimalPieChart
                          animate
                          animationDuration={500}
                          animationEasing="ease-out"
                          cx={50}
                          cy={50}
                          data={[
                            {
                              color: 'rgb(86, 178, 191)',
                              title: 'One',
                              value: ctx.value.new
                            },
                            {
                              color: 'rgba(255, 142, 69, 0.94)',
                              title: 'Two',
                              value: ctx.value.inprogress
                            },
                            {
                              color: '#188718b5',
                              title: 'Three',
                              value: ctx.value.approved
                            },
                            {
                              color: 'gray',
                              title: 'Foure',
                              value: ctx.value.closed
                            },
                            {
                              color: 'black',
                              title: 'Five',
                              value: ctx.value.archived
                            },
                            {
                              color: '#da251e',
                              title: 'Six',
                              value: ctx.value.rejected
                            }

                          ]}
                          label={false}
                          labelPosition={50}
                          lengthAngle={-360}
                          lineWidth={100}
                          paddingAngle={1}
                          radius={50}
                          rounded={false}

                          startAngle={0}
                          style={{
                            height: '250px', stroke: '#fff',
                          }}
                          viewBoxSize={[
                            100,
                            100
                          ]}
                        />
                      </div>
                      <div id='left1' >
                        <div style={{ display: 'flex', padding: 5 }} >
                          <div style={{ width: 20, height: 20, marginRight: 10, backgroundColor: 'gray' }} />
                          <div> Closed Tasks</div>
                        </div>
                        <div style={{ display: 'flex', padding: 5 }}>
                          <div style={{ width: 20, height: 20, marginRight: 10, backgroundColor: '#da251e' }} />
                          <div> Rejected Tasks</div>
                        </div>
                        <div style={{ display: 'flex', padding: 5 }}>
                          <div style={{ width: 20, height: 20, marginRight: 10, backgroundColor: 'black' }} />
                          <div> Archived Tasks</div>
                        </div>

                      </div>
                    </div>


                    <div id='circle_div'  >
                      <div id='left1' style={{ width: '30%' }} >
                        <div style={{ display: 'flex', padding: 5 }} >
                          <div style={{ width: 20, height: 20, marginRight: 10, backgroundColor: '#cd85fe' }} />
                          <div> All Created Tasks  </div>
                        </div>
                      </div>
                      <div id='circle1' style={{ width: '70%' }} >
                        <ReactMinimalPieChart
                          animate={false}
                          animationDuration={500}
                          animationEasing="ease-out"
                          cx={50}
                          cy={50}
                          data={[
                            {
                              color: '#cd85fe',
                              title: 'One',
                              value: cookies.get("tasks")
                            },

                            {
                              color: '#dfe0e042',
                              title: 'Two',
                              value: 100 - cookies.get("tasks")
                            },
                            // {
                            //   color: '#56B2BF',
                            //   title: 'Three',
                            //   value: 20
                            // }
                          ]}

                          label={false}
                          // labelPosition={50}
                          lengthAngle={360}
                          lineWidth={40}
                          paddingAngle={0}
                          radius={50}
                          totalValue={100}
                          rounded={false}
                          startAngle={0}
                          style={{
                            height: '250px', stroke: '#fff',
                          }}
                          viewBoxSize={[
                            100,
                            100
                          ]}
                        />
                      </div>
                    </div>
                  </div>

                  <div style={{ width: '96.5%' }} ref={this.wrapper} >
                   {this.state.spin===true?(
 <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'  }}>
 <Lottie
   options={{
     animationData: loading
   }}
   width={300}
   height={150}
   position="absolute"
 />
</div>
                   ):(
                    <DashTable data={this.state.Usersdata}  />
                   )}

                  </div>


                </div>

              )
            } else if (this.state.check === "" || cookies.get("userslength") === undefined) {
              return (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}  >

                  <Lottie
                    options={{
                      animationData: loading,
                    }}
                    width={300}
                    height={300}
                  />
                </div>
              )
            }

        }}

        </Context.Consumer>








      );
    }
  }

  export default Dashboard;