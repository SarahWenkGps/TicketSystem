import React from 'react';
import { Pane, Dialog, Switch, SelectMenu, Button } from 'evergreen-ui';
import Component from '@reactions/component';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import axios from "axios";
import Cookies from "universal-cookie";
import Host from '../../../assets/js/Host';
import { toast } from "react-toastify";
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Lottie from "lottie-react-web";
import loading from '../../../assets/js/loading.json';
import Slider from '@material-ui/core/Slider';
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

class NewCustomer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            checked: '',
            checked_customer: '',
            task_name: '',
            user: [],
            description: '',
            dead_time: '',
            startDate: new Date(),
            isShown: false,
            spin: false,
            id: '',
            type_id: '',
            moniter: 9,
            dimentions: [null, null],
            // priority_id:[],
            geo_name: null,
            weight: 2,
            confirm: false,
            customer: null,
            customer_name: ''
        };
    }

    handleChange = date => {
        this.setState({
            startDate: date
        });
    };

    handleChangeweight = (event, newValue) => {
        // setValue(newValue);
        // console.log(newValue);
        this.setState({ weight: newValue })
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
                users_id: this.state.user,
            },
        })
            .then(res => {
                // console.log(response.data);
                if (res.data.status === true) {
                    // toast.success('task created successfully')

                    axios({
                        url: Host + `tasks/assign/monitor/${id}`,
                        method: "PUT",
                        headers: headers,
                        data: {
                            monitor_user_id: 9,
                        },
                    })
                        .then(res => {
                            const { onRefTask } = this.props
                            onRefTask()

                            toast.success('task created successfully')
                            this.setState({
                                isShown: false, spin: false, description: "", startDate: new Date(), customer_name: "",
                                priority_id: "", checked_customer: false, weight: 2, users_id: "", moniter: 9
                            })
                        })

                }
                else if (res.data.status === false) {
                    toast.error(res.data.data.message.text)
                    this.setState({ spin: false })
                }

            })
            .catch(err => {
                toast.error("Network Error")
                this.setState({ spin: false });
            });

    }


    newtask = async () => {
        var headers = { jwt: cookies.get("token") };
        try {
            this.setState({ spin: true, confirm: true })
            if (this.state.checked_customer === true && this.state.customer === null) {
                await axios({
                    url: Host + `customers/customer`,
                    method: "POST",
                    headers: headers,
                    data: {
                        customer_name: this.state.customer_name,
                    },
                })
                    .then(result => {
                        console.log(result.data.data.customer_id);
                        if (this.state.checked === true) {
                            var milliseconds = this.state.startDate.getTime() + (3 * 60 * 60 * 1000); //add three hours
                            var correctedDeadTime = new Date(milliseconds);
                        }
                        axios({
                            url: Host + `tasks/task`,
                            method: "POST",
                            headers: headers,
                            data: {
                                task_name:null,
                                description: this.state.description,
                                dead_time: correctedDeadTime,
                                main_task_id: '0',
                                task_type_id: 9,
                                customer_id: result.data.data.customer_id,
                                weight: this.state.weight,
                            },
                        })
                            .then(res => {
                                if (res.data.status === true) {

                                    if (this.state.user.length > 0) {
                                        this.assign_user(res.data.data.data.task_id);
                                    } else {

                                        axios({
                                            url: Host + `tasks/assign/monitor/${res.data.data.data.task_id}`,
                                            method: "PUT",
                                            headers: headers,
                                            data: {
                                                monitor_user_id: 9,
                                            },
                                        })
                                            .then(res => {
                                                const { onRefTask } = this.props
                                                onRefTask()
                                                toast.success('task created successfully')
                                                this.setState({
                                                    isShown: false, spin: false, description: "", startDate: new Date(),
                                                    priority_id: "", checked_customer: false, weight: 2, moniter: 9, customer_name: ""
                                                })
                                            })
                                    }

                                } else if (res.data.status === false) {
                                    toast.error(res.data.data.message.text)
                                    this.setState({ spin: false })
                                }
                            })
                    })

            } else {
                if (this.state.checked === true) {
                    var milliseconds = this.state.startDate.getTime() + (3 * 60 * 60 * 1000); //add three hours
                    var correctedDeadTime = new Date(milliseconds);
                }
                let res = await axios({
                    url: Host + `tasks/task`,
                    method: "POST",
                    headers: headers,
                    data: {
                        task_name:null,
                        description: this.state.description,
                        dead_time: correctedDeadTime,
                        main_task_id: '0',
                        task_type_id: 9,
                        customer_id: this.state.customer,
                        weight: this.state.weight,
                    },
                })
                if (res.data.status === true) {

                    if (this.state.user.length > 0) {
                        this.assign_user(res.data.data.data.task_id);
                    } else {

                        axios({
                            url: Host + `tasks/assign/monitor/${res.data.data.data.task_id}`,
                            method: "PUT",
                            headers: headers,
                            data: {
                                monitor_user_id: 9,
                            },
                        })
                            .then(res => {
                                const { onRefTask } = this.props
                                onRefTask()
                                toast.success('task created successfully')
                                this.setState({
                                    isShown: false, spin: false, description: "", startDate: new Date(),
                                    priority_id: "", geo_name: "", dimentions: [], weight: 2, moniter: 9
                                })
                            })                        
                    }

                } else if (res.data.status === false) {
                    toast.error(res.data.data.message.text)
                    this.setState({ spin: false })
                }
            }
        }
        catch (error) {
            toast.error("Network Error")
            console.log(error);
        }
    }




    render() {
        const { selectedOption } = this.state;


        return (
            <div   >

                <Component initialState={{ isShown: false }}    >
                    {({ state, setState }) => (
                        <Pane >
                            <Dialog
                                isShown={this.state.isShown}
                                onCloseComplete={() => this.setState({ isShown: false, checked: false })}
                                hasHeader={false}
                                shouldCloseOnOverlayClick={false}
                                confirmLabel="Save"
                                cancelLabel="Cancel"
                                isConfirmDisabled={this.state.confirm}
                                onConfirm={() => {
                                    // setState({ isShown: false });
                                    this.newtask();
                                }}
                            >
                                <div >
                               
                                    <div id='new_itemnav' >  Create New Task  </div>
                                    <div className='mod1'>
                                        <div id='dailog' style={{ marginTop: 15, height: 'auto' }} >

                                            <div id='dailog' >
                                                <div id='dialog_title' >  Customer Name  </div>
                                                <div style={{ width: '80%', textAlign: 'center', display: "flex", alignItems: 'center', justifyContent: 'center' }} >
                                                    <Component initialState={{ selected: '', label: '' }}>
                                                        {({ setState, state }) => (
                                                            <SelectMenu
                                                                isMultiSelect
                                                                title="Select Moniter"
                                                                options={this.props.Allcustomer}
                                                                selected={state.selected}
                                                                onSelect={item => {
                                                                    const selected = [state.selected, item.value]
                                                                    this.setState({ customer: item.value })
                                                                    setTimeout(() => {
                                                                        console.log(this.state.moniter);
                                                                    }, 200);
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
                                                                    setState({ selected: selectedItems, selectedNames, label: '' })
                                                                    this.setState({ customer: null })
                                                                }}
                                                            >
                                                                <Button style={{ width: '95%', outline: 'none', display: 'flex', justifyContent: 'center' }}  >{state.label || 'Select Customer...'}</Button>
                                                            </SelectMenu>
                                                        )}
                                                    </Component>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '50%', paddingLeft: '1px' }}>
                                        <span style={{ color: '#517c92', marginBottom: '.5rem', fontWeight: '600', fontSize: 15 }}>Add New Customer </span>
                                        <Component initialState={{ checked: true }}>
                                            {({ state, setState }) => (
                                                <Switch
                                                    //   checked={state.checked}
                                                    onChange={e => {
                                                        this.setState({ checked_customer: e.target.checked })
                                                        // console.log(e.target.checked);
                                                    }} />
                                            )}
                                        </Component>
                                    </div>

                                    {this.state.checked_customer === true ? (
                                        <div id='dailog' style={{ marginTop: 15, height: 'auto' }} >
                                            <div id='dialog_title' > Customer Name    </div>
                                            <div style={{ width: '80%', textAlign: 'center' }} >
                                                <input type='text' id='field2' style={{ width: '95%', direction: 'rtl' }} value={this.state.customer_name} onChange={(e) =>
                                                    this.setState({ customer_name: e.target.value })} />  </div>
                                        </div>
                                    ) : (
                                            null
                                        )}

                                    <div className='mod1'>
                                        <div id='dailog' style={{ height: 'auto' }} >
                                            <div id='dialog_title' > Description    </div>
                                            <div style={{ width: '80%', textAlign: 'center', direction: 'rtl' }} >
                                                <textarea id='field3' value={this.state.description} onChange={(e) =>
                                                    this.setState({ description: e.target.value })} />  </div>
                                        </div>


                                        <div id='dailog' >
                                            <div id='dialog_title' >  Assign to </div>
                                            <div style={{ width: '80%', textAlign: 'center', display: "flex", alignItems: 'center', justifyContent: 'center' }} >
                                                <Component initialState={{ selected: '', label: '' }} >
                                                    {({ state, setState }) => (
                                                        <SelectMenu
                                                            isMultiSelect
                                                            selected={state.selected}
                                                            title="Select multiple names"
                                                            options={this.props.users}
                                                            onSelect={item => {
                                                                const selected = [...state.selected, item.value]
                                                                this.setState({ user: selected })
                                                                setTimeout(() => {
                                                                    console.log(this.state.user);
                                                                }, 200);
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
                                                                setState({ selected: selectedItems, selectedNames })
                                                                this.setState({ user: selectedItems })

                                                            }}
                                                        >
                                                            <Button style={{ width: '95%', outline: 'none', display: 'flex', justifyContent: 'center' }}  >{`${state.selected.length} Selected ` || 'Select name...'} </Button>
                                                        </SelectMenu>
                                                    )}
                                                </Component>
                                            </div>
                                        </div>

                                        <div id='dailog' >
                                            <div id='dialog_title' >  Task Moniter  </div>
                                            <div style={{ width: '80%', textAlign: 'center', display: "flex", alignItems: 'center', justifyContent: 'center' }} >
                                                <Component initialState={{ selected: 9, label: 'Raafat Salih**' }}>
                                                    {({ setState, state }) => (

                                                        <SelectMenu
                                                            isMultiSelect
                                                            title="Select Moniter"
                                                            options={this.props.users}
                                                            selected={state.selected}
                                                        // onSelect={item => {
                                                        //     const selected = [state.selected, item.value]
                                                        //     this.setState({ moniter: item.value })
                                                        //     setTimeout(() => {
                                                        //         console.log(this.state.moniter);

                                                        //     }, 200);
                                                        //     const selectedItems = selected
                                                        //     const selectedItemsLength = selectedItems.length
                                                        //     let selectedNames = ''
                                                        //     setState({
                                                        //         selected,
                                                        //         selectedNames, label: item.label
                                                        //     })
                                                        // }}
                                                        // onDeselect={item => {
                                                        //     const deselectedItemIndex = state.selected.indexOf(item.value)
                                                        //     const selectedItems = state.selected.filter(
                                                        //         (_item, i) => i !== deselectedItemIndex
                                                        //     )
                                                        //     const selectedItemsLength = selectedItems.length
                                                        //     let selectedNames = ''
                                                        //     if (selectedItemsLength === 0) {
                                                        //         selectedNames = ''
                                                        //     } else if (selectedItemsLength === 1) {
                                                        //         selectedNames = selectedItems.toString()
                                                        //     } else if (selectedItemsLength > 1) {
                                                        //         selectedNames = selectedItemsLength.toString() + ' selected...'
                                                        //     }
                                                        //     setState({ selected: selectedItems, selectedNames, label: '' })
                                                        //     this.setState({ moniter: null })
                                                        // }}
                                                        >
                                                            <Button style={{ width: '95%', outline: 'none', display: 'flex', justifyContent: 'center' }}  >{state.label || 'Select Moniter...'}</Button>
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
                                                            defaultValue={2}
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

                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '50%', paddingLeft: '1px' }}>
                                            <span style={{ color: '#517c92', marginBottom: '.5rem', fontWeight: '600', fontSize: 15 }}>Set Deadline</span>
                                            <Component initialState={{ checked: true }}>
                                                {({ state, setState }) => (
                                                    <Switch
                                                        //   checked={state.checked}
                                                        onChange={e => {
                                                            this.setState({ checked: e.target.checked })
                                                            // console.log(e.target.checked);
                                                        }} />
                                                )}
                                            </Component>
                                        </div>

                                        {this.state.checked === true ? (
                                            <div id='dailog' style={{ marginTop: 15, height: 'auto' }} >
                                                <div id='dialog_title' > Date    </div>
                                                <div style={{ width: '80%', textAlign: 'center' }} >
                                                    <DatePicker
                                                        selected={this.state.startDate}
                                                        onChange={this.handleChange}
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

                            <div onClick={() => { this.setState({ isShown: true, confirm: false }) }} id='tasknew' > Create New Task +</div>
                        </Pane>
                    )}
                </Component>

            </div>
        );
    }
}
export default NewCustomer;