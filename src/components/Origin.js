import React, {Component} from 'react';
import {connect} from 'react-redux';
import {saveLocal, getLocal, isThere, updateOnline} from './../actions';
const socket = io();

class Origin extends Component {
  constructor(props){
    super(props);

    socket.on('update', (users) => {
      // this.setState({
      //   userList: users
      // });
      updateOnline(users);
    });

    // binders :
    this.mapUsers = this.mapUsers.bind(this); 
  }

  mapUsers(){
    let {myName, online} = this.props;
    if(online){
      return online.map((u, k) => {
        return <li key={k} className="list-group-item"><b>{u.name}</b>
        {u.name === myName ? <span className="badge badge-success">You</span> : null}</li>
      });
    }
  }

  render(){
    let {myName, online} = this.props;
    return <div className="jumbotron">
      <h1>EsmFamil</h1>
      {myName ? <h3>Welcome to the game <b>{myName}</b></h3> : <h3>Please choose a name</h3>}
      <hr />
        <button type="button" className="btn btn-primary">
          Online <span className="badge badge-light">{online ? online.length : 0}</span>
        </button>
        <h3>Players list : </h3>
        <ul className="list-group">
          {this.mapUsers()}
        </ul>
    </div>
  }
}

export default connect(s => s)(Origin);
