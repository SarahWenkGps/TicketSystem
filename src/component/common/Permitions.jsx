import React from 'react';
import { SelectMenu, Pane, Button } from 'evergreen-ui';
import Component from '@reactions/component';
import axios from "axios";
import Cookies from "universal-cookie";
import Host from "../../assets/js/Host";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import Tooltip from '@material-ui/core/Tooltip';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import IconButton from '@material-ui/core/IconButton';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { toast } from "react-toastify";
const cookies = new Cookies();



class Permitions extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            spin: false,
            data: [],
            roles_id: [0],

        };
    }


    setRoles() {
       
        var headers = {
            jwt: cookies.get("token"),
        };       
        if (this.state.roles_id.length===0) {
           var roles_id=0
        }
        else{
            roles_id=this.state.roles_id 
        }
        axios({
            url: Host + `users/permissions/${this.props.ids}`,
            method: "POST",
            headers: headers,
            data: {
                roles_id:roles_id
            }
        })
            .then(response => {
            
                if (response.data.status === false) {
                    toast.error(response.data.data.message.text)
                } else if (response.data.status === true) {
                    toast.success("Updated Successfully");
                    const { onProfileDelete1 } = this.props
                    onProfileDelete1();
                }
            })
            .catch(function (error) {

            });
    }






    render() {
        return (
            <div>
                <Component
                    initialState={{
                        options: this.props.roles
                            .map(label => ({ label: label.name, value: label.role_id })),
                        selected: this.props.permitions
                    }} >
                    {({ state, setState }) => (
                        <SelectMenu
                            isMultiSelect
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
                                        <Tooltip title="Set" onClick={() => {
                                            this.setRoles();
                                        }}   >
                                            <IconButton aria-label="Set">
                                                <AssignmentTurnedInIcon style={{ color: '#da251e', cursor: 'pointer' }} />
                                            </IconButton>
                                        </Tooltip>
                                    </Pane>
                                )

                            }}
                            options={state.options}
                            selected={state.selected}
                            onSelect={item => {
                                const selected = [...state.selected, item.value]
                                this.setState({ roles_id: selected })
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
                                setState({ selected, selectedNames })
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
                                this.setState({ roles_id: selectedItems })
                            }}
                        >
                            <Button onMouseOver={() => {
                                setState({ selected: this.props.permitions })
                                
                            }}  >{state.name || <LockOpenIcon />}</Button>
                        </SelectMenu>
                    )}
                </Component>
            </div>
        );
    }
}
export default Permitions;