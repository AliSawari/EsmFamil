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
			name: null
		}
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
        this.setState({name});
        saveLocal(newName);
      }
    }
  }

  render(){
    let {name} = this;
    return <div className="jumbotron">
      <h2>This is the Origin Component</h2>
      <h3 className="small">Currently the Name is: <b>{name}</b></h3>
    </div>
  }
}

export default Origin;
