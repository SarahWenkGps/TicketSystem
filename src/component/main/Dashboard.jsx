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

const cookies = new Cookies();
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.wrapper = React.createRef();
    this.state = {
  
    check:'',
   
    };
}

componentDidMount(){
  // if (cookies.get("userslength")) {
   
  // }
  if (cookies.get("token")) {
    this.setState({check:'login'})
   
  }
  else{
    this.setState({check:'notlogin'})
  }

}


  render() {
    return (

      <Context.Consumer>{ctx => {


        if (this.state.check === "notlogin") {
          return (
            <Redirect to="/"></Redirect>
          )
        } else
          if (this.state.check === "login" && cookies.get("userslength")  ) {
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
                    <ReactMinimalPieChart
                      animate
                      animationDuration={500}
                      animationEasing="ease-out"
                      cx={50}
                      cy={50}
                      data={[
                        {
                          color: 'rgb(253, 224, 165)',
                          title: 'One',
                          value: 10
                        },
                        {
                          color: 'rgb(205, 228, 218)',
                          title: 'Two',
                          value: 15
                        },
                        {
                          color: 'rgb(86, 178, 191)',
                          title: 'Three',
                          value: 20
                        },
                        {
                          color: 'rgb(79, 90, 118)',
                          title: 'Foure',
                          value: 20
                        },
                        {
                          color: 'rgb(147, 138, 185)',
                          title: 'Five',
                          value: 30
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


                  <div id='circle_div'  >

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
                          value: 100-cookies.get("tasks")
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

                <div style={{width:'96.5%'}} ref={this.wrapper} >
<DashTable />

</div>


              </div>

            )
          } else if (this.state.check === "" || cookies.get("userslength")===undefined  ) {
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