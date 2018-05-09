import React, {Component} from 'react';
import socket from './../socket';

class Origin extends Component {
  constructor(props){
    super(props);

    this.state = {
      userList: [],
      myName: undefined,
      alerted: false,
      alertMsg: undefined
    }

    socket.on('update', (users) => {
      this.setState({
        userList: users
      });
    });

    socket.on('join_success', (name) => {
      this.setState({myName: name});
      this.setState({alerted: 'success', alertMsg: "Successfuly Joined!"});
    });


    // binders :
    this.mapUsers = this.mapUsers.bind(this);
    this.alert = this.alert.bind(this);
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

  mapUsers(){
    let {myName, userList} = this.state;
    if(userList){
      return userList.map((u, k) => {
        return <li key={k} className="list-group-item"><b>{u.name}</b>
        {u.name === myName ? <span className="badge badge-success">You</span> : null}</li>
      });
    }
  }

  render(){
    let {myName, userList} = this.state;

    return <div className="jumbotron">
      <h1>EsmFamil</h1>
      {myName ? <h3>Welcome to the game <b>{myName}</b></h3> : <h3>Please choose a name</h3>}
      {this.alert()}
      <hr />
        <button type="button" className="btn btn-primary">
          Online <span className="badge badge-light">{userList.length}</span>
        </button>
        <h3>Players list : </h3>
        <ul className="list-group">
          {this.mapUsers()}
        </ul>
    </div>
  }
}

export default Origin;
