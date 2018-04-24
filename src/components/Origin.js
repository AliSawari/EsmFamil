import React, {Component} from 'react';
const socket = io();

function saveLocal(name){
  localStorage.setItem('name', name);
}

function getLocal(){
  return localStorage.getItem('name');
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
    var name = getLocal();
    if(name){
      socket.emit('join', name);
      this.setState({name});
    } else {
      var newName = prompt("please type your name...");
      if(newName){
        socket.emit('join', newName);
        this.setState({name: newName});
        saveLocal(newName);
      }
    }
  }

  mapUsers(){
    let {userList} = this.state;
    return userList.map((u, k) => {
      return <li key={k} className="list-group-item">{u.name}</li>
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
