import React, {Component} from 'react';
import { WSAENAMETOOLONG } from 'constants';
import socket from './../socket';

class Origin extends Component {
  constructor(props){
    super(props);

    this.state = {
      userList: [],
      myName: undefined
    }

    socket.on('update', (users) => {
      this.setState({
        userList: users
      });
    });

    socket.on('join_success', (name) => {
      console.log("Success");
      this.setState({myName: name});
    });


    // binders :
    this.mapUsers = this.mapUsers.bind(this); 
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
      <hr />
        <button type="button" className="btn btn-primary">
          Online <span className="badge badge-light">{userList ? userList.length : 0}</span>
        </button>
        <h3>Players list : </h3>
        <ul className="list-group">
          {this.mapUsers()}
        </ul>
    </div>
  }
}

export default Origin;
