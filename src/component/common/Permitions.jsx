import React from 'react';
import {SelectMenu ,Pane, Button } from 'evergreen-ui';
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
const cookies = new Cookies();



class Permitions extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            spin: false,
            data: [],
            roles:[],
          
        };
    }

    handleChange = date => {
        this.setState({
            startDate: date
        });
    };



    setrols() {
        this.setState({ spin: true })
        var headers = {
            jwt: cookies.get("token"),
        };
        axios({
            url: Host + `users/permissions/${this.props.ids}`,
            method: "POST",
            headers: headers,
            data:{
                roles_id:this.state.roles
            }
        })
            .then(response => {
            //   console.log('tok', response.data.data);
              var arr =[];
              for (let i = 0; i < response.data.data.length; i++) {
                let obj = {
                    value: response.data.data[i],
                  }
                  arr.push(obj);
                  
              }
              this.setState({ data: arr })
                this.setState({ spin: false })
                
            })
            .catch(function (error) {
                
                this.setState({ spin: true })
            });

    }


    



    render() {
        

        return (
            <div   >
           
           <Component
                    initialState={{

                        selected: []
                    }}
                >
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
                                            this.setrols();
                                        }}   >
                                            <IconButton aria-label="Set">
                                                <AssignmentTurnedInIcon style={{ color: '#da251e', cursor: 'pointer' }} />
                                            </IconButton>
                                        </Tooltip>
                                    </Pane>
                                )
                              
                            }}
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
                            <Button>{state.name || <LockOpenIcon />}</Button>
                        </SelectMenu>
                    )}
                </Component>


            </div>
        );
    }
}
export default Permitions;