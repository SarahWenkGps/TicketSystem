import React from 'react';
import { Pane, Dialog, Switch } from 'evergreen-ui';
import Component from '@reactions/component';
import axios from "axios";
import Cookies from "universal-cookie";
import Host from "../../assets/js/Host";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Lottie from "lottie-react-web";
import loading from '../../assets/js/loading.json';
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
        padding: 2,
        display: 'flex'
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
class NewTask extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

            data: [],
            checked: '',
            task_name: '',
            user: '',
            description: '',
            dead_time: '',
            startDate: new Date(),
            isShown: false,
            spin:false,
        };
    }

    handleChange = date => {
        this.setState({
            startDate: date
        });
    };

    assign_user(id) {
        var headers = {
            jwt: cookies.get("token")
        };
        axios({
            url: Host + `tasks/assign/${id}`,
            method: "POST",
            headers: headers,
            data: {
                user_id: this.state.user,

            },
        })

            .then(res => {
                // console.log(response.data);
                if (res.data.status === true) {
                toast.success("user assigned successfully")
                this.setState({isShown:false,spin:false})
                }
                else if (res.data.status === false) {
                    toast.error(res.data.data.message.text)
                    this.setState({spin:false})
                }
            })
            .catch(function (error) {
                this.setState({spin:false})
            });
    }


    newtask = async () => {
        this.setState({spin:true})
        var headers = {
            jwt: cookies.get("token")
        };
        try {
         if (this.state.checked === true) {
             var dead_time= this.state.startDate
         }
            let res = await axios({
                url: Host + `tasks/task`,
                method: "POST",
                headers: headers,
                data: {
                    task_name: this.state.task_name,
                    description: this.state.description,
                    dead_time: dead_time,
                    main_task_id: '0'
                },
            })


            // console.log(res.data);


            if (res.data.status === true) {
                if (this.state.user.length === undefined ) {
                    this.assign_user(res.data.data.task_id);
                }
                else {
                    const { onProfileDelete } = this.props
                    onProfileDelete()
                    toast.success('task created successfully')
                    this.setState({isShown:false,spin:false})
                }


            } else if (res.data.status === false) {
                toast.error(res.data.data.message.text)
                this.setState({spin:false})
            }





        }
        catch (error) {
            // console.log(error);

        }
    }




    render() {
        const { selectedOption } = this.state;
        const { onProfileDelete } = this.props
       
        return (
            <div   >
{/* <button onClick={()=>{
    console.log('s', onProfileDelete()
    );
    
}}>sss,,,,,</button> */}
                <Component initialState={{ isShown: false }}    >
                    {({ state, setState }) => (
                        <Pane >
                            <Dialog
                                isShown={this.state.isShown}

                                onCloseComplete={() => this.setState({ isShown: false })}
                                hasHeader={false}
                                shouldCloseOnOverlayClick={false}
                                confirmLabel="Save"
                                cancelLabel="Cancel"
                                onConfirm={() => {

                                    // setState({ isShown: false });
                                    this.newtask();
                                }}
                            >
                                <div >
                                    <div id='new_itemnav' >  Create New Task  </div>


                                    <div className='mod1'>
                                        <div id='dailog' style={{ marginTop: 15, height: 'auto' }} >
                                            <div id='dialog_title' > Title    </div>
                                            <div style={{ width: '80%', textAlign: 'center' }} >
                                                <input type='text' id='field2' style={{ width: '95%',direction:'rtl' }} value={this.state.task_name} onChange={(e) =>
                                                    this.setState({ task_name: e.target.value })} />  </div>
                                        </div>
                                    </div>


                                    <div className='mod1'>
                                        <div id='dailog' style={{ height: 'auto' }} >
                                            <div id='dialog_title' > Description    </div>
                                            <div style={{ width: '80%', textAlign: 'center',direction:'rtl' }} >
                                                <textarea id='field3' value={this.state.description} onChange={(e) =>
                                                    this.setState({ description: e.target.value })} />  </div>
                                        </div>


                                        <div id='dailog' >
                                            <div id='dialog_title' >  Assign to </div>

                                            <div style={{ width: '80%', textAlign: 'center', display: "flex", alignItems: 'center', justifyContent: 'center' }} >
                                                <Select onChange={e => { this.setState({ user: e.value }); }}
                                                    value={selectedOption}
                                                    styles={customStyles}
                                                    options={this.props.users}
                                                /> </div>
                                        </div>

              
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '50%' }}>
                                            <span style={{ color: '#517c92', marginBottom: '.5rem',fontWeight:'600',fontSize:15 }}>Set Deadline</span>     
                                               <Component initialState={{ checked: true }}>
                                                {({ state, setState }) => (
                                                    <Switch
                                                        //   checked={state.checked}
                                                        onChange={e => {
                                                            this.setState({ checked: e.target.checked })
                                                            // console.log(e.target.checked);
                                                        }}
                                                    />
                                                )}
                                              
                                            </Component>
                                        </div>

                                        {this.state.checked === true ? (
                                           <div id='dailog' style={{ marginTop: 15, height: 'auto' }} >
                                           <div id='dialog_title' > Date    </div>
                                           <div style={{ width: '80%', textAlign: 'center' }} >
                                               {/* <input type='date' id='field2' style={{ width: '95%' }} value={this.state.dead_time} onChange={(e) =>
                                                   this.setState({ dead_time: e.target.value })} />   */}
                                               <DatePicker
                                                   selected={this.state.startDate}
                                                   onChange={this.handleChange}
                                                   timeInputLabel="Time:"
                                                   dateFormat="MM/dd/yyyy h:mm aa"
                                                //    showTimeInput
                                                  
                                               />
                                           </div>
                                       </div>

                                        ) : (
                                                null
                                            )}

{this.state.spin ? (
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

                            <div onClick={() => { this.setState({ isShown: true }) }} id='tasknew' > Create New Task +</div>
                        </Pane>
                    )}
                </Component>

            </div>
        );
    }
}
export default NewTask;