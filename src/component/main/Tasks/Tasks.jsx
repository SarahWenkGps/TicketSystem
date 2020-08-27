import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Component from "@reactions/component";
import { Checkbox, SelectMenu, Button } from 'evergreen-ui';
import loading from '../../../assets/js/loading.json';
import axios from "axios";
import Cookies from "universal-cookie";
import Lottie from 'lottie-react-web';
import Host from '../../../assets/js/Host';
import 'react-toastify/dist/ReactToastify.css';
import NewTask from './NewTask';
import { Redirect } from "react-router-dom";
import Tasknwe1 from './Tasknwe1';
import RangePicker from "react-range-picker";
import moment from 'moment';
import Task_noti from './Task_noti';
import { toast } from "react-toastify";
import Context from "../../../assets/js/context";


const cookies = new Cookies();

class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      tasks: [],
      tasks1: [],
      users: [],
      new: [],
      assigned: [],
      inprogress: [],
      closed: [],
      approved: [],
      rejected: [],
      statuses: [],
      archived: [],
      afterfilter: '',
      search: [],
      date: [],
      date1: moment(moment().format('L')).format("X") * 1000,
      date2: 0,
      check: "",
      watt: "yes",
      all: [],
      wait: true,
      range: [],
      //  day : moment().format('L'),
      allday: '',
      spin: false,
      commentLenght: [],
      noti: [],
      status1: 'new',
      checked: true,
      status2: '',
      checked2: false,
      status3: '',
      checked3: false,
      status4: '',
      checked4: false,
      status5: '',
      checked5: false,
      status6: '',
      checked6: false,
      selected_AssignFrom: '',
      selected_AssignTo: '',
      selected_taskType: '',
      type: [],
      priorities: [],
      Geofences: [],
      height: window.innerHeight,
      message: 'not at bottom',
      force: 0,
      deadTimeFilter: null,
      ids: [],
      userarr: [],
      newtype: [],
      filter: [],
      dataF: [],
    }
    this.filterRef = React.createRef();
    this.handleScroll = this.handleScroll.bind(this);
  }



  handleClearAllClick = () => {
    this.filterRef.current.clearAll();
  }

  handleScroll() {
    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight) {
      this.setState({
        message: 'bottom reached'
      });
    } else {
      this.setState({
        message: 'not at bottom'
      });
    }
  }



  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    this.setState({ spin: true })
    if (cookies.get("token")) {
      this.setState({ check: "login" })
    }
    var headers = {
      jwt: cookies.get("token"),
    };
    this.getTasks();
    // setInterval(() => {
    //   this.getTasks();
    // }, 100000);
    axios({
      url: Host + `tasks/statuses`,
      method: "GET",
      headers: headers,

    })
      .then(res => {
        let arr = [];
        for (let index = 0; index < res.data.data.length; index++) {
          let obj = {
            label: res.data.data[index].status_name,
            value: res.data.data[index].status_id,
          }
          arr.push(obj);
        }
        this.setState({
          statuses: arr
        });
      })

    axios({
      url: Host + `users/users`,
      method: "GET",
      headers: headers,
    })
      .then(res => {
        let arr = [];
        let idarr = [];

        for (let index = 0; index < res.data.data.length; index++) {

          let obj = {
            label: res.data.data[index].name,
            value: res.data.data[index].user_id,
          }

          arr.push(obj);
          idarr.push(res.data.data[index].user_id);

        }
        this.setState({
          users: arr, ids: idarr, selected_AssignFrom: idarr, selected_AssignTo: idarr,
        });
      })
      .catch(err => {


      });

    axios({
      url: Host + `task_types`,
      method: "GET",
      headers: headers,
    })
      .then(res => {
        if (res.data.status === false) {
          cookies.remove("token");
          window.location.href = "/"
        } else {
          let arr = [];
          let userarr = [];
          let newtype = [];
          for (let index = 0; index < res.data.data.length; index++) {
            let obj = {
              label: res.data.data[index].name,
              value: res.data.data[index].task_type_id,
            }
            let obj1 = {
              label: res.data.data[index].name,
              value: res.data.data[index].name,
            }
            arr.push(obj)
            userarr.push(res.data.data[index].name)
            newtype.push(obj1)
          }
          this.setState({ type: arr, userarr: userarr, selected_taskType: userarr, newtype: newtype })
        }
      })


    // this.getpriorities();
    this.getGeofences();

  }


  filterResult() {
    let filters = this.state.tasks.filter((dog) => {

      return (
        (dog.task_title.toString().toLowerCase().includes(this.state.search.toString().toLowerCase()) ||
          dog.description.toString().toLowerCase().includes(this.state.search.toString().toLowerCase()) ||
          dog.status.toString().toLowerCase().includes(this.state.search.toString().toLowerCase()) ||
          dog.issuer_user.name.toString().toLowerCase().includes(this.state.search.toString().toLowerCase()) ||
          dog.created_at.toString().toLowerCase().includes(this.state.search.toString().toLowerCase()) ||
          dog.assigners.map((p, i) => (p.name)).toString().toLowerCase().includes(this.state.search.toString().toLowerCase())) &&
        (dog.status === this.state.status1 || dog.status === this.state.status2 || dog.status === this.state.status3 ||
          dog.status === this.state.status4 || dog.status === this.state.status5 || dog.status === this.state.status6
        ) &&

        (
          this.state.selected_AssignFrom.includes(dog.issuer_user.id)

        ) &&
        (
          this.state.selected_AssignTo.some(ai => (dog.assigners.map((p, i) => (p.user_id))).includes(ai))

        )
        &&
        (
          this.state.selected_taskType.toString().toLowerCase().includes(dog.task_type)

        )
        && (
          this.state.deadTimeFilter != null ? (
            dog.dead_time !== "1970-01-01T00:00:00.000Z" &&
            moment(dog.dead_time).format("X") < this.state.deadTimeFilter

          ) : (dog.dead_time)
        )

      )
    })
    // console.log(filters);

    this.setState({ dataF: filters })
  }








  getpriorities() {
    var headers = {
      jwt: cookies.get("token"),
    };
    axios({
      url: Host + `tasks/priorities`,
      method: "GET",
      headers: headers,

    })
      .then(res => {
        this.setState({ priorities: res.data.data })
      })
      .catch(err => {

      })
  }
  RefreshGeofences() {
    this.setState({ force: 1 })
    setTimeout(() => {
      this.getGeofences();
    }, 200);
  }
  getGeofences() {
    var headers = {
      jwt: cookies.get("token"),
    };

    axios({
      url: Host + `tasks/task_geofences?params={"force":${this.state.force}}`,
      method: "GET",
      headers: headers,

    })
      .then(res => {
        this.setState({ Geofences: res.data.data.data })
      })
      .catch(err => {

      })
  }

  async getTasks() {
    this.setState({ spin: true })
    var headers = {
      jwt: cookies.get("token"),
    };
    await axios({
      url: Host + `tasks/tasks?params={"from_date":${this.state.date1},"to_date":${this.state.date2}}`,
      method: "GET",
      headers: headers,

    })
      .then(response => {
        this.setState({ watt: "no" });
        this.setState({ spin: false })
        if (response.data.status === false) {
          cookies.remove("token");
          window.location.href = "/"
        } else {

          // console.log(response.data.data);
          this.setState({ tasks: response.data.data })
          this.setState({ spin: false })
          setTimeout(() => {
            this.filterResult();
          }, 200);
        }

      })
      .catch(err => {


      });
  }




  handleInput = (e) => {
    // console.log(e.target.value);
    this.setState({ search: e.target.value })
    setTimeout(() => {
      this.filterResult();
    }, 100);
  }

  allTime() {
    var x = document.getElementById("date_btn");
    x.style.backgroundColor = "#fff";
    x.style.color = "#828282";
    var b = document.getElementById("date_btn2");
    b.style.backgroundColor = "#fff";
    b.style.color = "#828282";
    var n = document.getElementById("date_btn3");
    n.style.backgroundColor = "#fff";
    n.style.color = "#828282";
    var y = document.getElementById("date_btn1");
    y.style.backgroundColor = "rgb(106, 170, 104)";
    y.style.color = "#fff";
    setTimeout(() => {
      this.filterResult();
    }, 100);
  }

  today() {
    var x = document.getElementById("date_btn1");
    x.style.backgroundColor = "#fff";
    x.style.color = "#828282";
    var s = document.getElementById("date_btn3");
    s.style.backgroundColor = "#fff";
    s.style.color = "#828282";
    var t = document.getElementById("date_btn2");
    t.style.backgroundColor = "#fff";
    t.style.color = "#828282";
    var y = document.getElementById("date_btn");
    y.style.backgroundColor = "rgb(106, 170, 104)";
    y.style.color = "#fff";
    setTimeout(() => {
      this.filterResult();
    }, 100);
  }
  yesterday() {
    var x = document.getElementById("date_btn1");
    x.style.backgroundColor = "#fff";
    x.style.color = "#828282";
    var s = document.getElementById("date_btn3");
    s.style.backgroundColor = "#fff";
    s.style.color = "#828282";
    var t = document.getElementById("date_btn");
    t.style.backgroundColor = "#fff";
    t.style.color = "#828282";
    var y = document.getElementById("date_btn2");
    y.style.backgroundColor = "rgb(106, 170, 104)";
    y.style.color = "#fff";
    setTimeout(() => {
      this.filterResult();
    }, 100);
  }
  Week() {
    var x = document.getElementById("date_btn1");
    x.style.backgroundColor = "#fff";
    x.style.color = "#828282";
    var t = document.getElementById("date_btn");
    t.style.backgroundColor = "#fff";
    t.style.color = "#828282";
    var d = document.getElementById("date_btn2");
    d.style.backgroundColor = "#fff";
    d.style.color = "#828282";
    var y = document.getElementById("date_btn3");
    y.style.backgroundColor = "rgb(106, 170, 104)";
    y.style.color = "#fff";
    setTimeout(() => {
      this.filterResult();
    }, 100);
  }
  onDateChanges = (date, date2) => {
    this.setState({ date1: moment(date).format("X") * 1000, date2: moment(date2).format("X") * 1000 })
    var x = document.getElementById("date_btn");
    x.style.backgroundColor = "#fff";
    x.style.color = "#828282";
    var x = document.getElementById("date_btn1");
    x.style.backgroundColor = "#fff";
    x.style.color = "#828282";
    var s = document.getElementById("date_btn2");
    s.style.backgroundColor = "#fff";
    s.style.color = "#828282";
    var c = document.getElementById("date_btn3");
    c.style.backgroundColor = "#fff";
    c.style.color = "#828282";
    setTimeout(() => {
      this.filterResult();
    }, 100);
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
                <div >
                  {/* <button onClick={() => {
                    console.log(this.state.selected_AssignTo);
                  }} >nnn</button> */}
                  <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }} >

                    <Checkbox
                      label="New"
                      checked={this.state.checked}
                      onChange={e => {
                        this.setState({ checked: e.target.checked })
                        // console.log(this.state.checked);

                        if (this.state.checked === false) {
                          this.setState({ status1: 'new' })
                          // console.log(this.state.status1);
                        } else {
                          this.setState({ status1: '' })
                          // console.log(this.state.status1 === undefined);
                        }
                        setTimeout(() => {
                          this.filterResult();
                        }, 200);
                      }}
                    />
                    <Checkbox
                      label="In Progress"
                      checked={this.state.checked2}
                      onChange={e => {
                        // console.log(this.state.checked2);
                        this.setState({ checked2: e.target.checked })
                        if (this.state.checked2 === false) {
                          this.setState({ status2: 'in progress' })
                        } else {
                          this.setState({ status2: '' })
                        }
                        setTimeout(() => {
                          this.filterResult();
                        }, 200);
                      }}
                    />
                    <Checkbox
                      label="Closed"
                      checked={this.state.checked3}
                      onChange={e => {

                        // console.log(e.target.checked);
                        this.setState({ checked3: e.target.checked })
                        if (this.state.checked3 === false) {
                          this.setState({ status3: 'closed' })
                        } else {
                          this.setState({ status3: '' })
                        }
                        setTimeout(() => {
                          this.filterResult();
                        }, 200);
                      }}
                    />
                    <Checkbox
                      label="Approved"
                      checked={this.state.checked4}
                      onChange={e => {
                        this.setState({ checked4: e.target.checked })
                        if (this.state.checked4 === false) {
                          this.setState({ status4: 'approved' })
                        } else {
                          this.setState({ status4: '' })
                        }
                        setTimeout(() => {
                          this.filterResult();
                        }, 200);
                      }}
                    />
                    <Checkbox
                      label="Rejected"
                      checked={this.state.checked5}
                      onChange={e => {
                        this.setState({ checked5: e.target.checked })
                        if (this.state.checked5 === false) {
                          this.setState({ status5: 'rejected' })
                        } else {
                          this.setState({ status5: '' })
                        }
                        setTimeout(() => {
                          this.filterResult();
                        }, 200);
                      }}
                    />
                    <Checkbox
                      label="Archived"
                      checked={this.state.checked6}
                      onChange={e => {
                        this.setState({ checked6: e.target.checked })
                        if (this.state.checked6 === false) {
                          this.setState({ status6: 'archived' })
                        } else {
                          this.setState({ status6: '' })
                        }
                        setTimeout(() => {
                          this.filterResult();
                        }, 200);
                      }}
                    /></div>

                  <div style={{ display: 'flex' }}  >
                    <Component initialState={{ selected: '' }} >
                      {({ state, setState }) => (
                        <SelectMenu
                          isMultiSelect
                          selected={state.selected}
                          title="Select names"
                          options={this.state.users}
                          onSelect={item => {
                            const selected = [...state.selected, item.value]
                            const selectedItems = selected
                            const selectedItemsLength = selectedItems.length
                            let selectedNames = ''
                            if (selectedItemsLength === 0) {
                              selectedNames = ''
                            } else if (selectedItemsLength === 1) {
                              selectedNames = selectedItems.toString()
                            } else if (selectedItemsLength > 1) {
                              selectedNames = selectedItemsLength.toString() + ' selected...'
                            }
                            this.setState({
                              selected_AssignFrom: selected,
                              selectedNames
                            })
                            setTimeout(() => {
                              this.filterResult();
                            }, 200);
                            setState({
                              selected,
                              selectedNames
                            })
                          }}
                          onDeselect={item => {
                            const deselectedItemIndex = state.selected.indexOf(item.value)
                            const selectedItems = state.selected.filter(
                              (_item, i) => i !== deselectedItemIndex
                            )
                            const selectedItemsLength = selectedItems.length
                            let selectedNames = ''
                            if (selectedItemsLength === 0) {
                              selectedNames = '';

                            } else if (selectedItemsLength === 1) {
                              selectedNames = selectedItems.toString()
                            } else if (selectedItemsLength > 1) {
                              selectedNames = selectedItemsLength.toString() + ' selected...'
                            }
                            if (selectedItemsLength === 0) {
                              this.setState({ selected_AssignFrom: this.state.ids })

                            } else if (selectedItemsLength !== 0) {
                              this.setState({ selected_AssignFrom: selectedItems, selectedNames })
                            }
                            setTimeout(() => {
                              this.filterResult();
                            }, 200);
                            setState({ selected: selectedItems, selectedNames })


                          }}
                        >
                          <Button onMouseOver={() => {

                          }} >{'Created By '}</Button>
                        </SelectMenu>
                      )}
                    </Component>
                    <Component initialState={{ selected: '' }} >
                      {({ state, setState }) => (
                        <SelectMenu
                          isMultiSelect
                          selected={state.selected}
                          title="Select names"
                          options={this.state.users}
                          onSelect={item => {


                            const selected = [...state.selected, item.value]
                            const selectedItems = selected
                            const selectedItemsLength = selectedItems.length
                            let selectedNames = ''
                            if (selectedItemsLength === 0) {
                              selectedNames = ''
                            } else if (selectedItemsLength === 1) {
                              selectedNames = selectedItems.toString()
                            } else if (selectedItemsLength > 1) {
                              selectedNames = selectedItemsLength.toString() + ' selected...'
                            }
                            this.setState({
                              selected_AssignTo: selected,
                              selectedNames
                            })
                            setTimeout(() => {
                              this.filterResult();
                            }, 200);
                            setState({
                              selected,
                              selectedNames
                            })
                          }}
                          onDeselect={item => {
                            const deselectedItemIndex = state.selected.indexOf(item.value)
                            const selectedItems = state.selected.filter(
                              (_item, i) => i !== deselectedItemIndex
                            )
                            const selectedItemsLength = selectedItems.length
                            let selectedNames = ''
                            if (selectedItemsLength === 0) {
                              selectedNames = ''
                            } else if (selectedItemsLength === 1) {
                              selectedNames = selectedItems.toString()
                            } else if (selectedItemsLength > 1) {
                              selectedNames = selectedItemsLength.toString() + ' selected...'
                            }
                            if (selectedItemsLength === 0) {
                              this.setState({ selected_AssignTo: this.state.ids })

                            } else if (selectedItemsLength !== 0) {
                              this.setState({ selected_AssignTo: selectedItems, selectedNames })
                            }
                            setTimeout(() => {
                              this.filterResult();
                            }, 200);
                            setState({ selected: selectedItems, selectedNames })

                          }}
                        >
                          <Button  >{'Assigned To '}</Button>
                        </SelectMenu>
                      )}
                    </Component>
                    <Component initialState={{
                      selected: [],
                      options: this.state.type
                        .map(label => ({ label: label.name, value: label.task_type_id })),

                    }}
                    >
                      {({ state, setState }) => (
                        <SelectMenu
                          isMultiSelect
                          options={this.state.newtype}
                          selected={state.selected}

                          onSelect={item => {


                            const selected = [...state.selected, item.value]
                            const selectedItems = selected
                            const selectedItemsLength = selectedItems.length
                            let selectedNames = ''
                            if (selectedItemsLength === 0) {
                              selectedNames = ''
                            } else if (selectedItemsLength === 1) {
                              selectedNames = selectedItems.toString()
                            } else if (selectedItemsLength > 1) {
                              selectedNames = selectedItemsLength.toString() + ' selected...'
                            }
                            this.setState({
                              selected_taskType: selected,
                              selectedNames
                            })
                            setTimeout(() => {
                              this.filterResult();
                            }, 200);
                            setState({
                              selected,
                              selectedNames
                            })
                          }}
                          onDeselect={item => {
                            const deselectedItemIndex = state.selected.indexOf(item.value)
                            const selectedItems = state.selected.filter(
                              (_item, i) => i !== deselectedItemIndex
                            )
                            const selectedItemsLength = selectedItems.length
                            let selectedNames = ''
                            if (selectedItemsLength === 0) {
                              selectedNames = ''
                            } else if (selectedItemsLength === 1) {
                              selectedNames = selectedItems.toString()
                            } else if (selectedItemsLength > 1) {
                              selectedNames = selectedItemsLength.toString() + ' selected...'
                            }
                            if (selectedItemsLength === 0) {
                              this.setState({ selected_taskType: this.state.userarr })

                            } else if (selectedItemsLength !== 0) {
                              this.setState({ selected_taskType: selectedItems, selectedNames })
                            }
                            setTimeout(() => {
                              this.filterResult();
                            }, 200);
                            setState({ selected: selectedItems, selectedNames })

                          }}
                        >
                          <Button   >{'Task Type'}</Button>
                        </SelectMenu>
                      )}
                    </Component>


                    <div id='deadTime' onClick={() => {
                      // console.log(moment(moment().format('L')).add(1,'day').format("X"));

                      if (this.state.deadTimeFilter === null) {
                        this.setState({
                          deadTimeFilter: moment(moment().format('L')).add(1, 'day').format("X")
                        })
                        var x = document.getElementById("deadTime");
                        x.style.backgroundImage = "linear-gradient(rgb(227, 14, 14), rgb(229, 75, 118))";
                        x.style.color = "#FFF";
                      } else {
                        this.setState({
                          deadTimeFilter: null
                        })
                        var x = document.getElementById("deadTime");
                        x.style.backgroundImage = "linear-gradient(rgb(255, 255, 255), rgb(244, 245, 247))";
                        x.style.color = "#828282";
                      }
                      setTimeout(() => {
                        this.filterResult();
                      }, 200);

                    }}  >Dead Line</div>

                  </div>





                  <div id="apfot" ref={this.myRef}  >
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%' }}>
                      <div id='searchdiv' >
                        <input type='text' onChange={this.handleInput} placeholder='Search' id='search' />

                        <div style={{ display: 'flex', marginLeft: '10%' }}  >
                          <RangePicker onDateSelected={this.onDateChanges}
                            selectTime={true}
                            onClose={() => {
                              this.getTasks();
                            }} />

                          <div onClick={() => {
                            this.setState({ date1: 0, date2: 0 })
                            setTimeout(() => {
                              this.getTasks();
                              this.allTime();
                            }, 200);
                          }} id="date_btn1" > All Time </div>

                          <div onClick={() => {
                            this.setState({ date1: moment(moment().format('L')).subtract(7, 'day').format("X") * 1000, date2: 0 })
                            setTimeout(() => {
                              this.getTasks();
                              this.Week();
                            }, 200);
                            // console.log(moment().subtract(7, 'day'));

                          }} id="date_btn3" > Week  </div>

                          <div onClick={() => {
                            this.setState({ date1: moment(moment().format('L')).subtract(1, 'day').format("X") * 1000, date2: moment(moment().format('L')).format("X") * 1000 })
                            setTimeout(() => {
                              this.getTasks();
                              this.yesterday();
                            }, 200);
                          }} id="date_btn2" > Yesterday  </div>

                          <div onClick={() => {
                            this.setState({ date1: moment(moment().format('L')).format("X") * 1000, date2: 0 })
                            setTimeout(() => {
                              this.getTasks();
                              this.today();
                            }, 200);
                          }} id="date_btn" > Today  </div>

                        </div>
                      </div>

                      {this.state.spin === true ? (
                        <div style={{ width: "100%", position: "absolute" }}>
                          <Lottie
                            options={{
                              animationData: loading
                            }}
                            width={300}
                            height={300}
                          />
                        </div>
                      ) : (
                          null
                        )}


                      <NewTask onProfileDelete={() => this.componentDidMount()} users={this.state.users} key={1} onRefreshGeo={() => this.RefreshGeofences()}
                        type={this.state.type} priorities={this.state.priorities} Geofences={this.state.Geofences} onRefTask={() => this.getTasks()}    />
                      <span className='filter_span' > {this.state.dataF.length} Tasks </span>
                      <Row style={{ width: '100%', display: 'flex' }}   >


                        {this.state.dataF.map((item, i) => (
                          <Col md={6} key={i} id='noti_Get' style={{ marginTop: 40 }}    >
                            <Tasknwe1 name={item.task_title} time={item.dead_time} desc={item.description}
                              id={item.task_id} users={this.state.users} assigners={item.assigners}
                              onProfileDelete={() => this.componentDidMount()} status={item.status} allstatus={this.state.statuses}
                              createdby={item.issuer_user.name} created_at={item.created_at} assigned={item.assigners.map((p, i) => (p.user_id))} comments_count={item.comments_count}
                              type={this.state.type} task_type={item.task_type} monitor={item.monitor} files={item.files} priority={item.priority} geofences={item.geofences}
                              Geofences={this.state.Geofences} weight={item.weight} onRefreshGeo={() => this.RefreshGeofences()}  onRefTask={() => this.getTasks()}  />

                          </Col>
                        ))}

                      </Row>
                    </div>
                  </div>
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

export default Tasks;
