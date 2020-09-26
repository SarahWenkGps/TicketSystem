import React from 'react';
import { Pane, Dialog, Button } from 'evergreen-ui';
import Component from '@reactions/component';
import axios from "axios";
import Cookies from "universal-cookie";
import Host from "../../../assets/js/Host";
import "react-datepicker/dist/react-datepicker.css";
import Lottie from "lottie-react-web";
import loading from '../../../assets/js/loading.json';
import { toast } from "react-toastify";
const cookies = new Cookies();



class Comments extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            spin: false,
            data: [],
          
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
            url: Host + `activities/task/${this.props.id}`,
            method: "GET",
            headers: headers,
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
            .catch(err => {
                toast.error("Network Error")
             
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
                                topOffset={100}
                            >



{this.state.data.map((item,i)=>(
    <div key={i} style={{fontSize:15,padding:5,display:'flex',alignItems:'center'}} >
<div style={{width:6,height:6,backgroundColor:'#2e6b95',borderRadius:300,marginRight:5}}  />
<div  >{item.value}</div>
</div>
))}
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
                                id='coment1' >Activites </Button>
                        </Pane>
                    )}
                </Component>



            </div>
        );
    }
}
export default Comments;