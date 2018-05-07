import React, {Component} from 'react';
import {connect} from 'react-redux';
const socket = io();

class RegName extends Component {
  constructor(props){
    super(props);
  }

  handle(e){
    let {myName} = this.props;
    e.prevendDefault();
    let name = e.target.name.value;

    if(!myName){
      if(name.length > 2){
        socket.emit('join', name);
      } else {
        alert("Name should be more than 2 characters");
      }
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

export default connect(state => {
  return state;
})(RegName);
