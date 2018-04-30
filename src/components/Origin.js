import React, {Component} from 'react';
import {saveLocal, getLocal, isThere} from './../actions';
const socket = io();

class Origin extends Component {
  constructor(props){
    super(props);
    this.state = {
			name: null,
      userList: []
		}
    socket.on('update', (users) => {
      this.setState({
        userList: users
      });
    });

    // binders :
  }

  componentDidMount(){
    var {userList} = this.state;
    var name = getLocal();

    if(name){
      if(isThere(userList, 'name', name)){
        return window.location.href = `/err?msg=username_already_taken?username=${name}`;
      } else {
        socket.emit('join', name);
        this.setState({name});
      }
    } else {
      var newName = prompt("please type your name...");
      newName = newName.toString();
      if(newName){
        if(isThere(userList, 'name', newName)){
          return window.location.href = `/err?msg=username_already_taken?username=${newName}`;
        } else {
          socket.emit('join', newName);
          this.setState({name: newName});
        }
      } else {
        window.location.href = "/err?msg=choose_name";
      }
    }
  }

  mapUsers(){
    let {name, userList} = this.state;
    return userList.map((u, k) => {
      return <li key={k} className="list-group-item"><b>{u.name}</b>
      {u.name === name ? <span className="badge badge-success">It's You</span> : null}</li>
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

export default Origin;
