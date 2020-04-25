import React from 'react';
import { Pane, Dialog, Switch } from 'evergreen-ui';
import Component from '@reactions/component';
import axios from "axios";
import Cookies from "universal-cookie";
import Host from "../../assets/js/Host";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from 'react-select';
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
                checked:'',
                task_name:'',
                user:'',
                description:'',
                dead_time:'',
        
        };
    }



assign_user(id){
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

        .then(response => {
console.log(response.data);
 toast.success("user assigned successfully")

        })
        .catch(function (error) {

        });
}


    newtask= async () => {
        var headers = {
            jwt: cookies.get("token")
        };
        try {
        let res = await   axios({
            url: Host + `tasks/task`,
            method: "POST",
            headers: headers,
            data: {
                task_name: this.state.task_name,
                description: this.state.description,
                dead_time:this.state.dead_time,
                main_task_id:'0'
            },
        })

           
console.log(res.data);


if (res.data.status===true) {
    if (this.state.user !== undefined) {
        this.assign_user(res.data.data.task_id);
    }
    else{
        const { onProfileDelete } = this.props
        onProfileDelete()
        toast.success('task created successfully')

    }


} else if(res.data.status===false) {
    toast.error(res.data.data.message.text)
}

    

 

            }
            catch (error) {
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
                                isShown={state.isShown}

                                onCloseComplete={() => setState({ isShown: false })}
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
                                                <input type='text' id='field2' style={{ width: '95%' }} value={this.state.task_name} onChange={(e) =>
                                                    this.setState({ task_name: e.target.value })} />  </div>
                                        </div>
                                </div>
                                
                                
                                    <div className='mod1'>
                                        <div id='dailog' style={{ height: 'auto' }} >
                                            <div id='dialog_title' > Description    </div>
                                            <div style={{ width: '80%', textAlign: 'center' }} >
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

                                        <div id='dailog' style={{ marginTop: 15, height: 'auto' }} >
                                            <div id='dialog_title' > Date    </div>
                                            <div style={{ width: '80%', textAlign: 'center' }} >
                                                <input type='date' id='field2' style={{ width: '95%' }} value={this.state.dead_time} onChange={(e) =>
                                                    this.setState({ dead_time: e.target.value })} />  </div>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', width: '50%' }}>
                                            <span style={{ color: '#517c92', marginBottom: '.5rem' }}>Create Sub task</span>         <Component initialState={{ checked: true }}>
                                                {({ state, setState }) => (
                                                    <Switch
                                                        //   checked={state.checked}
                                                        onChange={e => {
                                                            this.setState({ checked: e.target.checked })
                                                            console.log(e.target.checked);
                                                        }}


                                                    />
                                                  
                                                )}
                                                  <button onClick={()=>{
                                                        console.log(this.state.user);
                                                        
                                                    }} >sss</button>
                                            </Component>
                                        </div>

                                        {this.state.checked === true ? (
                                            <div>
                                                <div id='dailog' style={{ marginTop: 15, height: 'auto' }} >
                                                    <div id='dialog_title' > Task    </div>
                                                    <div style={{ width: '80%', textAlign: 'center' }} >
                                                        <textarea id='field3' value={this.state.password} onChange={(e) =>
                                                            this.setState({ password: e.target.value })} />  </div>
                                                </div>
                                                <div id='dailog' >
                                                    <div id='dialog_title' >  Assign to </div>

                                                    <div style={{ width: '80%', textAlign: 'center', display: "flex", alignItems: 'center', justifyContent: 'center' }} >
                                                        <Select onChange={e => { this.setState({ sto: e.value }); console.log('sto', e.value); }}
                                                            value={selectedOption}
                                                            styles={customStyles}
                                                            options={this.state.device1}
                                                        /> </div>
                                                </div>
                                                <div id='dailog' style={{ marginTop: 15, height: 'auto' }} >
                                                    <div id='dialog_title' > Date    </div>
                                                    <div style={{ width: '80%', textAlign: 'center' }} >
                                                        <input type='date' id='field2' style={{ width: '95%' }} value={this.state.password} onChange={(e) =>
                                                            this.setState({ password: e.target.value })} />  </div>
                                                </div>
                                            </div>
                                        ) : (
                                                null
                                            )}


                                    </div>
                                </div>
                            </Dialog>

                            <div onClick={() => { setState({ isShown: true }) }} id='tasknew' > Create New Task +</div>
                        </Pane>
                    )}
                </Component>

            </div>
        );
    }
}
export default NewTask;