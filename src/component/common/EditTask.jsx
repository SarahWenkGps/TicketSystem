import React from 'react';
import { Pane, Dialog, Button } from 'evergreen-ui';
import Component from '@reactions/component';
import axios from "axios";
import Cookies from "universal-cookie";
import Host from "../../assets/js/Host";
import { toast } from "react-toastify";
import Lottie from "lottie-react-web";
import loading from '../../assets/js/loading.json';
import "react-toastify/dist/ReactToastify.css";
import Select from 'react-select';
import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// import moment from 'moment';
const cookies = new Cookies();

const customStyles = {
    option: (provided, state) => ({
        ...provided,
        borderBottom: '1px dotted pink',
        color: state.isSelected ? 'red' : 'blue',

    }),
    control: () => ({
        // none of react-select's styles are passed to <Control />
        width: '100%',
        border: '1px solid #ababab',
        borderRadius: 5,
        padding: 5,
        display: 'flex',
        height:'42px',
    }),
    container: () => ({

        width: '95%',
        position: 'relative',
        boxSizing: 'border-box',
    }),
    singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = 'opacity 300ms';

        return { ...provided, opacity, transition };
    }
}
class EditTask extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            task_title: '',
            user: '',
            description: '',
            dead_time: '',
            status_id: '',
            startDate: ''
        };
    }

    handleChange = date => {
        this.setState({
            startDate: date
        });
    };


    render() {
        const { selectedOption } = this.state;
    

        return (
            <div style={{ marginRight: 10 }}  >
                {/* <button onClick={()=>{
    console.log('s', onProfileDelete()
    );
    
}}>sss,,,,,</button> */}
                <Component initialState={{ isShown: false, spin: false,time:'',
                    description:'',task_title:'',status_id:'',status:'' }}    >
                    {({ state, setState }) => (
                        <Pane >
                            <Dialog
                                isShown={state.isShown}

                                onCloseComplete={() => setState({ isShown: false })}
                                hasHeader={false}
                                shouldCloseOnOverlayClick={false}
                                confirmLabel="Save"
                                cancelLabel="Cancel"
                                onConfirm={() => {
                                    setState({ spin: true })
                                    var headers = {
                                        jwt: cookies.get("token")
                                    };

                                    var milliseconds = this.state.startDate.getTime() + (3 * 60 * 60 * 1000); //add three hours
                                    var correctedDeadTime = new Date(milliseconds);

                                    axios({
                                        url: Host + `tasks/task/${this.props.id}`,
                                        method: "PUT",
                                        headers: headers,
                                        data: {
                                            task_title:state.task_title,
                                            description: state.description,
                                            dead_time:correctedDeadTime,
                                            // status_id:state.status
                                        },
                                    })

                                        .then(res => {
                                            axios({
                                                url: Host + `tasks/change_status/${this.props.id}`,
                                                method: "PUT",
                                                headers: headers,
                                                data: {
                                                 
                                                    status_id:state.status
                                                },
                                            })


                                            if (res.data.status === true) {
                                                setState({ isShown: false, spin: false })
                                                toast.success('task updated successfully')
                                                const { onProfileDelete } = this.props.onProfileDelete
                                                onProfileDelete()
                                            }
                                            else if (res.data.status === false) {
                                                toast.error(res.data.data.message.text)
                                                setState({ spin: false })
                                            }
                                        })
                                        .catch(function (error) {
                                        // console.log(error);
                                        setState({ spin: false });
                                    })
                                }}
                            >
                                <div >
                                    <div id='new_itemnav' >  Edit Task  </div>
                                    <div className='mod1'>
                                        <div id='dailog' style={{ marginTop: 15, height: 'auto' }} >
                                            <div id='dialog_title' > Title    </div>
                                            <div style={{ width: '80%', textAlign: 'center',direction:'rtl' }} >
                                                <input type='text' id='field2' style={{ width: '95%' }} value={state.task_title} onChange={(e) =>
                                                   setState({ task_title: e.target.value })} />  </div>
                                        </div>
                                    </div>


                                    <div className='mod1'>
                                        <div id='dailog' style={{ height: 'auto' }} >
                                            <div id='dialog_title' > Description    </div>
                                            <div style={{ width: '80%', textAlign: 'center' ,direction:'rtl'}} >
                                                <textarea id='field3' value={state.description} onChange={(e) =>
                                                    setState({ description: e.target.value })} />  </div>
                                        </div>


                                        {/* <div id='dailog' >
                                            <div id='dialog_title' >  Update Status  </div>

                                            <div style={{ width: '80%', textAlign: 'center', display: "flex", alignItems: 'center', justifyContent: 'center' }} >
                                                <Select onChange={e => { setState({ status: e.value }); }}
                                                    defaultValue={state.status_id}
                                                    value={selectedOption}
                                                    styles={customStyles}
                                                    options={this.props.allstatus}
                                                /> </div>
                                        </div> */}

                                        <div id='dailog' style={{ marginTop: 15, height: 'auto' }} >
                                            <div id='dialog_title' > Deadline Date    </div>
                                            <div style={{ width: '80%', textAlign: 'center' }} >
                                                {/* <input type='date' id='field2' style={{ width: '95%' }} value={this.state.dead_time} onChange={(e) =>
                                                    this.setState({ dead_time: e.target.value })} />   */}
                                                <DatePicker
                                                    selected={this.state.startDate}
                                                    onChange={this.handleChange}
                                                    // timeInputLabel="Time:"
                                                    // dateFormat="MM/dd/yyyy h:mm aa"
                                                    // showTimeInput
                                                    // timeFormat="hh:mm aa"
                                                    locale="ar-iq"
                                                    showTimeSelect
                                                    timeFormat="p"
                                                    timeIntervals={15}
                                                    dateFormat="Pp"
                                                    registerLocale='ar-iq'
                                                    minDate={new Date()}
                                                />

                                            </div>
                                        </div>
                                        {state.spin ? (
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
                       
                                </div>
                            </Dialog>

                            <Button onClick={() => { setState({ isShown: true })
                         let getIndex=this.props.allstatus.findIndex((element) => element.label === this.props.status)
                         setState({status_id:this.props.allstatus[getIndex] , time:this.props.time ,description:this.props.desc ,task_title:this.props.title
                        })
                         console.log(this.props.status);
                         console.log(state.status_id);
                         
                         
                        }}  >  <i className="fas fa-edit" id="edit"></i></Button>
                        </Pane>
                    )}
                </Component>

            </div>
        );
    }
}
export default EditTask;