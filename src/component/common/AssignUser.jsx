import React from 'react';
import { SelectMenu, Button } from "evergreen-ui";
import Component from "@reactions/component";
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import axios from "axios";
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import Host from "../../assets/js/Host";
const cookies = new Cookies();
class AssingUser extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

            data: [],
            id:''

        };
    }

    assign_user() {
        var headers = {
            jwt: cookies.get("token")
        };
        axios({
            url: Host + `tasks/assign/${this.props.id}`,
            method: "POST",
            headers: headers,
            data: {
                user_id: this.state.id,

            },
        })

            .then(res => {
                console.log(res.data);
               
                if (res.data.status===true) {

                        const { onProfileDelete } = this.props
                        onProfileDelete()
                        toast.success("user assigned successfully")
                } else if(res.data.status===false) {
                    toast.error(res.data.data.message.text)
                }

            })
            .catch(function (error) {

            });
    }





    render() {
        return (
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }} >
                <Component
                    initialState={{

                        selected: '',name:''
                    }}
                >
                    {({ state, setState }) => (
                        <SelectMenu
                            isMultiSelect
                            title="Select multiple names"
                            options={this.props.users}
                            selected={state.selected}
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
                                    selectedNames ,name:item.label
                                })

                                setTimeout(() => {
                                    console.log(this.state.id);
                                }, 200);

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
                                this.setState({
                                    id: selectedItems
                                })
                                setTimeout(() => {
                                    console.log(this.state.id);
                                }, 200);
                            }}
                        >
                            <Button>{state.name || <SupervisorAccountIcon />}</Button>
                        </SelectMenu>
                    )}
                </Component>

                <Tooltip style={{ marginLeft: 20}} title="Assigned" onClick={() => {
                    this.assign_user();
                }}   >
                          <IconButton aria-label="Assigned">
                          <AssignmentTurnedInIcon style={{ color: '#da251e', cursor: 'pointer' }}/>
                          </IconButton>
                        </Tooltip>

              
            </div>
        );
    }
}

export default AssingUser;
