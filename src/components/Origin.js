import React, {Component} from 'react';
import {connect} from 'react-redux';
import {saveLocal, getLocal, isThere} from './../actions';
const socket = io();

class Origin extends Component {
  constructor(props){
    super(props);

    socket.on('update', (users) => {
      this.setState({
        userList: users
      });
    });

    // binders :
  }

  mapUsers(){
    let {name, userList} = this.state;
    return userList.map((u, k) => {
      return <li key={k} className="list-group-item"><b>{u.name}</b>
      {u.name === name ? <span className="badge badge-success">You</span> : null}</li>
    });
  }

  render(){
    let {name, userList} = this.state;
    return <div className="jumbotron">
      <h3>Welcome to the game <b>{name}</b></h3>
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

export default connect(s => {
  return s
})(Origin);
