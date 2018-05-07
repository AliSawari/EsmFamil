import React, {Component} from 'react';
import {connect} from 'react-redux';
const socket = io();

export default class RegName extends Component {
  constructor(props){
    super(props);
  }

  handle(event){
    event.preventDefault();
    let name = event.target.name.value;
    if(name.length > 2){
      socket.emit('join', name);
    } else {
      alert("Name should be more than 2 characters");
    }
  }


  render(){
    return <form onSubmit={this.handle}>
      <label htmlFor="ex1">Type in your name to join the game</label>
      <input type="text" name="name" id="ex1" className="form-control" placeholder="your name goes here" />
      <button type="submit" className="btn btn-success">Join</button>
    </form>
  }
}

// export default connect(s => s)(RegName);
