import React, { Component } from 'react';
import socket from './../socket';

export default class Msg extends Component {
  constructor(props){
    super(props);
    this.state = {
      alerted: false,
      alertMsg: undefined
    }

    socket.on('join_success', (name) => {
      this.setState({alerted: 'success', alertMsg: "Successfuly Joined!"});
    });
  }

  alert(){
    let {alerted, alertMsg} = this.state;

    const clearAlert = () => {
      setTimeout(() => {
        this.setState({
          alerted: false, alertMsg: undefined
        });
      }, 5000);
    }


    if(alerted){
      if(alerted === 'success'){
        clearAlert();
        return <div className="alert alert-success" role="alert">
          <b>{alertMsg}</b>
        </div>
      } else if(alerted === 'fail'){
        clearAlert();
        return <div className="alert alert-danger" role="alert">
          <b>{alertMsg}</b>
        </div>
      }
    }
  }


  render(){
    return this.alert()
  }
}

