import React from 'react';
import Noti from '../common/Noti';


class Notifications extends React.Component{
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
    
       data:[
        
         {name:'2020/4/15',id:'33'},
         {name:'2020/4/20',id:'33'}
       ]
      

     
    };
  }

render() {
  return (
  <div>


{this.state.data.map((p,i) => (
  <div key={i}  >  
    <Noti name={p.name} />
  </div>
))}

  </div>
  );
}}

export default Notifications;
