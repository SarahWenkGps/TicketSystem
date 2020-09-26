import React from 'react';
import { SelectMenu, Button, Pane} from "evergreen-ui";
import Component from "@reactions/component";
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import axios from "axios";
import Lottie from "lottie-react-web";
import loading from '../../../assets/js/loading.json'
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import Host from "../../../assets/js/Host";
const cookies = new Cookies();
class AssingUser extends React.Component {
  
    constructor(props) {
        super(props);

        this.state = {

            data: [],
            id: [],
            spin: false,
            assigned :this.props.assigned
        };
    }

   
    assign_user() {
        // if (this.state.id.length > 0) {
            
            this.setState({ spin: true })
            var headers = {
                jwt: cookies.get("token")
            };                          
                axios({
                    url: Host + `tasks/assign/${this.props.id}`,
                    method: "POST",
                    headers: headers,
                    data: {
                        users_id: this.state.id,
    
                    },
                })
    
                    .then(res => {                                     
                            if (res.data.status === true) {
                                toast.success("user assigned successfully")
                                const { onRefTask } = this.props.onRefTask
                                onRefTask()
                                this.setState({ spin: false })
                            } else if (res.data.status === false) {
                                this.setState({ spin: false })
                                toast.error(res.data.data.message.text)
                            }                        
                    })
                    .catch(err => {
                        toast.error("Network Error")
                      
                      });
          
            
        // }
        // else{
        //     return toast.error("Select User First")
        // }
       
    }





    render() {
       
        return (
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }} >
           

                <Component
                    initialState={{

                        selected:this.props.assigned 
                    }}
                >

                    {({ state, setState }) => (
                        <SelectMenu
                            isMultiSelect
                            selected={state.selected}
                            title="Select multiple names"
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
                                        <Tooltip title="Assigned" onClick={() => {
                                            this.assign_user();
                                        }}   >
                                            <IconButton aria-label="Assigned">
                                                <AssignmentTurnedInIcon style={{ color: '#da251e', cursor: 'pointer' }} />
                                            </IconButton>
                                        </Tooltip>
                                   
                                    </Pane>
                                )
                               
                            }}
                            options={this.props.users}
                           

                            onSelect={item => {
                                const selected = [...state.selected, item.value]
                                this.setState({ id: selected })
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
                                setState({ selected: selectedItems, selectedNames })
                                this.setState({ id: selectedItems })
                                
                            }}
                        >
                            <Button onMouseOver={()=>{
                             
                                setState({selected:this.props.assigned})
                            }}  ><SupervisorAccountIcon /></Button>
                        </SelectMenu>
                    )}
                </Component>









                {this.state.spin === true ? (
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
        );
    }
}

export default AssingUser;
