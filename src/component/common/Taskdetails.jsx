import React from 'react';
import { Pane, Dialog, Button } from 'evergreen-ui';
import {Table} from 'react-bootstrap';
import Component from '@reactions/component';
import axios from "axios";
import Cookies from "universal-cookie";
import Host from "../../assets/js/Host";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import Lottie from "lottie-react-web";
import loading from '../../assets/js/loading.json';
import CategoryIcon from '@material-ui/icons/Category';
const cookies = new Cookies();



class Taskdetails extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            spin: false,
            data: [],
            new: [],
            inprogress: [],
            closed: [],
            approved: [],
            rejected: [],
            statuses: [],
            archived: [],
        };
    }

    handleChange = date => {
        this.setState({
            startDate: date
        });
    };



    callcomm() {
        this.setState({ spin: true })
        var headers = {
            jwt: cookies.get("token"),
        };
        axios({
            url: Host + `tasks/user_tasks/${this.props.id}`,
            method: "GET",
            headers: headers,
        })
            .then(response => {
                console.log('tok', response.data.data);

                this.setState({ data: response.data.data })
                this.setState({ spin: false })
                let data = response.data.data

                let newdata = data.filter(f =>
                    f.status === 'new'
                )
                this.setState({
                    new: newdata
                })

                let assignedata = data.filter(f =>
                    f.status === "archived")
                this.setState({
                    archived: assignedata
                })
                let inprogressdata = data.filter(f =>
                    f.status === "in progress")
                this.setState({
                    inprogress: inprogressdata
                })
                let closeddata = data.filter(f =>
                    f.status === "closed")
                this.setState({
                    closed: closeddata
                })
                let approveddata = data.filter(f =>
                    f.status === "approved")
                this.setState({ approved: approveddata })

                let rejecteddata = data.filter(f =>
                    f.status === "rejected")
                this.setState({ rejected: rejecteddata })


            })
            .catch(function (error) {

                this.setState({ spin: true })
            });

    }






    render() {


        return (
            <div   >

                <Component initialState={{ isShown: false }}>
                    {({ state, setState }) => (
                        <Pane>
                            <Dialog
                                isShown={state.isShown}
                                hasHeader={false}
                                onCloseComplete={() => setState({ isShown: false })}
                                hasFooter={false}
                                topOffset={180}
                                width={900}
                                height={300}
                            >

<Table striped bordered hover>
  <thead>
    <tr>
      <th>All Tasks</th>
      <th>New Tasks</th>
      <th>In Progress Tasks</th>
      <th>Closed Tasks</th>
      <th>Approved Tasks</th>
      <th>Rejected Tasks</th>
      <th>Archived Tasks</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>{this.state.data.length} </td>
      <td>{this.state.new.length}</td>
      <td>{this.state.inprogress.length}</td>
      <td>{this.state.closed.length}</td>
      <td>{this.state.approved.length}</td>
      <td>{this.state.rejected.length}</td>
      <td>{this.state.archived.length}</td>
    </tr>
   
  
  </tbody>
</Table>

                               
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
                            </Dialog>

                            <Button onClick={() => {
                                setState({ isShown: true })
                                this.callcomm();
                            }}
                               > <CategoryIcon /> </Button>
                        </Pane>
                    )}
                </Component>



            </div>
        );
    }
}
export default Taskdetails;