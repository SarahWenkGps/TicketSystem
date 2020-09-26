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

class NewTask extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

            data: [],
            checked: '',
            task_name: '',
            user: [],
            description: '',
            dead_time: '',
            startDate: new Date(),
            isShown: false,
            spin: false,
            id: '',
            type_id: '',
            moniter: null,
            dimentions: [null, null],
            // priority_id:[],
            geo_name: null,
            weight: 2,
            confirm: false,
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
                    if (this.state.moniter !== null) {
                        axios({
                            url: Host + `tasks/assign/monitor/${id}`,
                            method: "PUT",
                            headers: headers,
                            data: {
                                monitor_user_id: this.state.moniter,
                            },
                        })
                            .then(res => {
                                const { onRefTask } = this.props
                                onRefTask()
                           
                                toast.success('task created successfully')
                                this.setState({
                                    isShown: false, spin: false, task_name: "", description: "", startDate: new Date(),
                                    priority_id: "", geo_name: "", dimentions: [], weight: 2, users_id: "",moniter:null
                                })
                            })
                    }else{
                        const { onRefTask } = this.props
                        onRefTask()
                    toast.success('task created successfully')
                    this.setState({
                        isShown: false, spin: false, task_name: "", description: "", startDate: new Date(),
                        priority_id: "", geo_name: "", dimentions: [], weight: 2, users_id: "" })
                    }
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

        var headers = {
            jwt: cookies.get("token")
        };
        try {
            if (this.state.checked === true) {
                var milliseconds = this.state.startDate.getTime() + (3 * 60 * 60 * 1000); //add three hours
                var correctedDeadTime = new Date(milliseconds);
            }
            if (this.state.task_name.length < 5) {
                return toast.error("Title must be more than 5 char")
            }
            this.setState({ spin: true, confirm: true })
            let res = await axios({
                url: Host + `tasks/task`,
                method: "POST",
                headers: headers,
                data: {
                    task_name: this.state.task_name,
                    description: this.state.description,
                    dead_time: correctedDeadTime,
                    main_task_id: '0',
                    task_type_id: this.state.type_id,
                    // priority_id:this.state.priority_id,
                    geo_name: this.state.geo_name,
                    geo_x: this.state.dimentions[0],
                    geo_y: this.state.dimentions[1],
                    weight: this.state.weight,
                },
            })
            if (res.data.status === true) {

                if (this.state.user.length > 0) {
                    this.assign_user(res.data.data.data.task_id);
                } else {
                    if (this.state.moniter !== null) {
                        axios({
                            url: Host + `tasks/assign/monitor/${res.data.data.data.task_id}`,
                            method: "PUT",
                            headers: headers,
                            data: {
                                monitor_user_id: this.state.moniter,
                            },
                        })
                        .then(res => {
                            const { onRefTask } = this.props
                                onRefTask()
                            toast.success('task created successfully')
                            this.setState({
                                isShown: false, spin: false, task_name: "", description: "", startDate: new Date(),
                                priority_id: "", geo_name: "", dimentions: [], weight:2, moniter:null
                            })
                        })
                    }else{
                        const { onRefTask } = this.props
                        onRefTask()
                    toast.success('task created successfully')
                    this.setState({
                        isShown: false, spin: false, task_name: "", description: "", startDate: new Date(),
                        priority_id: "", geo_name: "", dimentions: [], weight: 2 })
                }
            }



            } else if (res.data.status === false) {
                toast.error(res.data.data.message.text)
                this.setState({ spin: false })
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
                                            <div id='dialog_title' > Title    </div>
                                            <div style={{ width: '80%', textAlign: 'center' }} >
                                                <input type='text' id='field2' style={{ width: '95%', direction: 'rtl' }} value={this.state.task_name} onChange={(e) =>
                                                    this.setState({ task_name: e.target.value })} />  </div>
                                        </div>
                                    </div>


                                    <div className='mod1'>
                                        <div id='dailog' style={{ height: 'auto' }} >
                                            <div id='dialog_title' > Description    </div>
                                            <div style={{ width: '80%', textAlign: 'center', direction: 'rtl' }} >
                                                <textarea id='field3' value={this.state.description} onChange={(e) =>
                                                    this.setState({ description: e.target.value })} />  </div>
                                        </div>
                                        <div id='dailog' >
                                            <div id='dialog_title' >  Task type </div>
                                            <div style={{ width: '80%', textAlign: 'center', display: "flex", alignItems: 'center', justifyContent: 'center' }} >

                                                <Component initialState={{ selected: null, label: '' }}>
                                                    {({ state, setState }) => (
                                                        <SelectMenu
                                                            isMultiSelect
                                                            title="Select type"
                                                            options={this.props.type}
                                                            selected={state.selected}
                                                            onSelect={item => {
                                                                const selected = [state.selected, item.value]
                                                                this.setState({ type_id: item.value })
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
                                                                setState({ selected: selectedItems, selectedNames, label: "" })
                                                                this.setState({ type_id: "" })
                                                            }}
                                                        >
                                                            <Button style={{ width: '95%', outline: 'none', display: 'flex', justifyContent: 'center' }}  >{state.label || 'Select Type...'}</Button>
                                                        </SelectMenu>
                                                    )}
                                                </Component>

                                            </div>
                                        </div>

                                        {/* <div id='dailog' >
                                            <div id='dialog_title' >  Task Priorities </div>
                                            <div style={{ width: '80%', textAlign: 'center', display: "flex", alignItems: 'center', justifyContent: 'center' }} >
                                                <Component 
                                                initialState={{ selected: null ,
                                                    options: this.props.priorities
                                                 .map(label => ({ label: label.name, value: label.id })),
                                                 }}                                                                                                
                                                >
                                                    {({ setState, state }) => (
                                                        <SelectMenu
                                                            title="Select type"
                                                            options={state.options}
                                                            selected={state.selected}
                                                            onSelect={item => {
                                                                setState({ selected: item.value })
                                                                this.setState({priority_id:item.value})
                                                            }}
                                                        >
                                                            <Button style={{ width: '95%', outline: 'none', display: 'flex', justifyContent: 'center' }}  >{ 'Select Type...'}</Button>
                                                        </SelectMenu>
                                                    )}
                                                </Component>
                                            </div>
                                        </div> */}
                                        <div id='dailog' >
                                            <div id='dialog_title' >  ADD Geofence </div>
                                            <div style={{ width: '80%', textAlign: 'center', display: "flex", alignItems: 'center', justifyContent: 'center' }} >

                                                <Component initialState={{
                                                    selected: null, label: '',
                                                    options: this.props.Geofences
                                                        .map(label => ({ label: label.name, value: label.x, dimen: [label.x, label.y] })),
                                                }} >
                                                    {({ state, setState }) => (
                                                        <SelectMenu
                                                            isMultiSelect
                                                            selected={state.selected}
                                                            title="Select names"
                                                            titleView={({ close, title, headerHeight }) => {
                                                                return (
                                                                    <Pane
                                                                        display="flex"
                                                                        alignItems="center"
                                                                        borderBottom="default"
                                                                        padding={8}
                                                                        height={headerHeight}
                                                                        boxSizing="border-box"
                                                                    >
                                                                        <Tooltip title="Refresh" onClick={() => {
                                                                            const { onRefreshGeo } = this.props
                                                                            onRefreshGeo()
                                                                        }}   >
                                                                            <IconButton aria-label="Refresh">
                                                                                <RefreshIcon style={{ color: '#da251e', cursor: 'pointer' }} />
                                                                            </IconButton>
                                                                        </Tooltip>
                                                                    </Pane>
                                                                )

                                                            }}
                                                            options={state.options}
                                                            onSelect={item => {
                                                                const selected = [state.selected, item.value]
                                                                this.setState({ geo_name: item.label, dimentions: item.dimen })
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
                                                                setState({ selected: selectedItems, selectedNames, label: "" })
                                                                this.setState({ geo_name: null, dimentions: [null, null] })
                                                            }}
                                                        >
                                                            <Button style={{ width: '95%', outline: 'none', display: 'flex', justifyContent: 'center' }}  >{state.label || 'Select name...'}</Button>
                                                        </SelectMenu>
                                                    )}
                                                </Component>
                                            </div>
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
                                                <Component initialState={{ selected: null, label: '' }}>
                                                    {({ setState, state }) => (

                                                        <SelectMenu
                                                            isMultiSelect
                                                            title="Select Moniter"
                                                            options={this.props.users}
                                                            selected={state.selected}
                                                            onSelect={item => {
                                                                const selected = [state.selected, item.value]
                                                                this.setState({ moniter: item.value })
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
                                                                this.setState({ moniter: null })
                                                            }}
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
                                                        }}
                                                    />
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
export default NewTask;