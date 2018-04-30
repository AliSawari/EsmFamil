import React, {Component} from 'react';
import {saveLocal, getLocal} from './../actions';
const socket = io();

function find(name, list){
  for(let x in list) {
    if(name === list[x].name){
      return true;
    }
  }
}

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

  componentWillMount(){
    var {userList} = this.state;
    var name = getLocal();
    if(name){
      if(!find(name, userList)){
        socket.emit('join', name);
        this.setState({name});
      } else {
        alert("User Name already Taken");
      }
    } else {
      var newName = prompt("please type your name...");
      if(newName){
        if(!find(newName, userList)){
          socket.emit('join', newName);
          this.setState({name: newName});
          saveLocal(newName);
        } else {
          alert("User Name already Taken");
        }
      } else {
        window.location.href = "/err_choose_name";
      }
    }
  }

  mapUsers(){
    let {userList} = this.state;
    return userList.map((u, k) => {
      return <li key={k} className="list-group-item"><b>{u.name}</b></li>
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
