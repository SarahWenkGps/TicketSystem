import React from 'react';
import { Pane, Dialog, Button, SelectMenu } from 'evergreen-ui';
import Component from '@reactions/component';
import axios from "axios";
import Cookies from "universal-cookie";
import Host from "../../../assets/js/Host";
import { toast } from "react-toastify";
import Lottie from "lottie-react-web";
import loading from '../../../assets/js/loading.json';
import DatePicker from "react-datepicker";
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";
import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import RefreshIcon from '@material-ui/icons/Refresh';
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
        height: '42px',
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
class EditCustomer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            customer: '',
            user: '',
            description: '',
            dead_time: '',
            status_id: '',
            startDate: '',
            type_id: '',
            moniter: [],
            geo_name: '',
            dimentions: [],
            weight: '',

        };
    }

    handleChange = date => {
        this.setState({
            startDate: date
        });
    };
    handleChangeweight = (event, newValue) => {
        // setValue(newValue);
        console.log(newValue);
        this.setState({ weight: newValue })
    };



    render() {
        const { selectedOption } = this.state;


        return (
            <div style={{ marginRight: 10 }}  >

                <Component initialState={{
                    isShown: false, spin: false,
                    description: '', customer: '', status_id: '', status: '', task_type1: ''
                }}    >
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
                                    if (this.state.startDate !== '') {
                                        var milliseconds = this.state.startDate.getTime() + (3 * 60 * 60 * 1000); //add three hours
                                        var correctedDeadTime = new Date(milliseconds);
                                    }


                                    axios({
                                        url: Host + `tasks/task/${this.props.id}`,
                                        method: "PUT",
                                        headers: headers,
                                        data: {
                                            customer_id: this.state.customer,
                                            description: state.description,
                                            dead_time: correctedDeadTime,                                      
                                            geo_name: this.state.geo_name,
                                            geo_x: this.state.dimentions[0],
                                            geo_y: this.state.dimentions[1],
                                            weight: this.state.weight
                                        },
                                    })

                                        .then(res => {

                                            if (res.data.status === true) {
                                                //  if (this.state.moniter.length === undefined) {
                                                axios({
                                                    url: Host + `tasks/assign/monitor/${this.props.id}`,
                                                    method: "PUT",
                                                    headers: headers,
                                                    data: {
                                                        monitor_user_id: this.state.moniter,
                                                    },
                                                })
                                                    .then(res => {
                                                        const { onRefTask } = this.props.onRefTask
                                                        onRefTask()

                                                    })
                                                //  }

                                                setState({ isShown: false, spin: false })
                                                toast.success('task updated successfully')
                                                const { onRefTask } = this.props.onRefTask
                                                onRefTask()
                                            } else if (res.data.status === false) {
                                                toast.error(res.data.data.message.text)
                                                setState({ spin: false })
                                            }
                                        })
                                        .catch(err => {
                                            toast.error("Network Error")
                                            setState({ spin: false });
                                        });
                                }}
                            >
                                <div >
                                    <div id='new_itemnav' >  Edit Task  </div>
                                    <div className='mod1'>
                                        <div id='dailog' style={{ marginTop: 15, height: 'auto' }} >

                                        <div id='dailog' >
                                            <div id='dialog_title' >  Customer Name   </div>
                                            <div style={{ width: '80%', textAlign: 'center', display: "flex", alignItems: 'center', justifyContent: 'center' }} >
                                                <Component initialState={{
                                                    selected: [this.props.customer.id],
                                                    label: this.props.customer.name
                                                }} >
                                                    {({ state, setState }) => (
                                                        <SelectMenu
                                                            isMultiSelect
                                                            title="Select Moniter"
                                                            options={this.props.Allcustomer}
                                                            selected={state.selected}
                                                            onSelect={item => {
                                                                const selected = [state.selected, item.value]
                                                                this.setState({ customer: item.value })
                                                                const selectedItems = selected
                                                                const selectedItemsLength = selectedItems.length
                                                                let selectedNames = ''
                                                                setState({
                                                                    selected,
                                                                    selectedNames, label: item.label
                                                                })
                                                                setTimeout(() => {
                                                                    console.log(this.state.customer);
                                                                }, 300);
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
                                                                setState({ selected: '', label: "" })
                                                                this.setState({ customer: null })
                                                           }}
                                                        >
                                                            <Button onMouseOver={() => {
                                                                setState({ selected: [this.props.customer.id], label: this.props.customer.name })
                                                                console.log(state.selected);

                                                            }} style={{ width: '95%', outline: 'none', display: 'flex', justifyContent: 'center' }}  >{state.label || 'Select name...'}</Button>
                                                        </SelectMenu>
                                                    )}
                                                </Component>
                                            </div>
                                        </div>


                                            {/* <div id='dialog_title' > Title    </div>
                                            <div style={{ width: '80%', textAlign: 'center', direction: 'rtl' }} >
                                                <input type='text' id='field2' style={{ width: '95%' }} value={state.task_title} onChange={(e) =>
                                                    setState({ task_title: e.target.value })} />  </div> */}
                                        </div>
                                    </div>


                                    <div className='mod1'>
                                        <div id='dailog' style={{ height: 'auto' }} >
                                            <div id='dialog_title' > Description    </div>
                                            <div style={{ width: '80%', textAlign: 'center', direction: 'rtl' }} >
                                                <textarea id='field3' value={state.description} onChange={(e) =>
                                                    setState({ description: e.target.value })} />  </div>
                                        </div>

                                        <div id='dailog' >
                                            <div id='dialog_title' >  Task Moniter  </div>
                                            <div style={{ width: '80%', textAlign: 'center', display: "flex", alignItems: 'center', justifyContent: 'center' }} >
                                                <Component initialState={{
                                                    selected: [this.props.monitor.id],
                                                    label: this.props.monitor.name
                                                }} >
                                                    {({ state, setState }) => (
                                                        <SelectMenu
                                                            isMultiSelect
                                                            title="Select Moniter"
                                                            options={this.props.users}
                                                            selected={state.selected}
                                                            onSelect={item => {
                                                                const selected = [state.selected, item.value]
                                                                this.setState({ moniter: item.value })
                                                                const selectedItems = selected
                                                                const selectedItemsLength = selectedItems.length
                                                                let selectedNames = ''
                                                                setState({
                                                                    selected,
                                                                    selectedNames, label: item.label
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
                                                                setState({ selected: '', label: "" })
                                                                this.setState({ moniter: null })
                                                           }}
                                                        >
                                                            <Button onMouseOver={() => {
                                                                setState({ selected: [this.props.monitor.id], label: this.props.monitor.name })
                                                                console.log(state.selected);

                                                            }} style={{ width: '95%', outline: 'none', display: 'flex', justifyContent: 'center' }}  >{state.label || 'Select name...'}</Button>
                                                        </SelectMenu>
                                                    )}
                                                </Component>
                                            </div>
                                        </div>
                                        <div id='dailog' >
                                            <div id='dialog_title' >  Task Weight  </div>
                                            <div style={{ width: '80%', textAlign: 'center', display: "flex", alignItems: 'center', justifyContent: 'center' }} >
                                                <Component initialState={{ selected: null }}>
                                                    {({ setState, state }) => (
                                                        <Slider style={{ width: '94%' }}
                                                            defaultValue={this.props.weight}
                                                            //   value={value}
                                                            onChange={this.handleChangeweight}
                                                            aria-labelledby="discrete-slider"
                                                            valueLabelDisplay="auto"
                                                            step={1}
                                                            marks
                                                            min={0}
                                                            max={10}
                                                        />
                                                    )}
                                                </Component>
                                            </div>
                                        </div>

                                        <div id='dailog' style={{ marginTop: 15, height: 'auto' }} >
                                            <div id='dialog_title' > Deadline Date    </div>
                                            <div style={{ width: '80%', textAlign: 'center' }} >
                                                {/* <input type='date' id='field2' style={{ width: '95%' }} value={this.state.dead_time} onChange={(e) =>
                                                    this.setState({ dead_time: e.target.value })} />   */}
                                                <DatePicker
                                                    selected={this.state.startDate}
                                                    onChange={this.handleChange}
                                                    locale="ar-iq"
                                                    showTimeSelect
                                                    timeFormat="p"
                                                    timeIntervals={15}
                                                    dateFormat="Pp"
                                                    registerLocale='ar-iq'
                                                // minDate={new Date()}
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

                            <Button onClick={() => {
                                setState({ isShown: true })
                                let getIndex = this.props.allstatus.findIndex((element) => element.label === this.props.status)
                                let getIndex1 = this.props.type.findIndex((element) => element.label === this.props.task_type)
                                setState({
                                    status_id: this.props.allstatus[getIndex], description: this.props.desc, customer: this.props.customer.name,
                                    type: this.props.type, task_type1: this.props.type[getIndex1]
                                })

                                this.setState({ startDate: this.props.time === '1970-01-01T00:00:00.000Z' ? ("") : (new Date(this.props.time)) 
                                ,customer: this.props.customer.id
                            })






                            }}  >  <i className="fas fa-edit" id="edit"></i></Button>
                        </Pane>
                    )}
                </Component>

            </div>
        );
    }
}
export default EditCustomer;