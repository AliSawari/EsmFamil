import React, {Component} from 'react';
import socket from './../socket';

export default class RegName extends Component {
  constructor(props){
    super(props);
    this.state = {
      named: false
    };


    socket.on('join_success', () => {
      this.setState({
        named: true
      });
    });

    socket.on('join_fail', (name) => {
      window.location.href = `/err?msg=username_already_taken?username=${name}`;
    });



    // binders:
    this.handle = this.handle.bind(this);
  }

  handle(event){
    event.preventDefault();
    let {named} = this.state;
    let name = event.target.name.value;
    if(!named){
      if(name.length > 2){
        socket.emit('join', name);
        event.target.name.value = '';
      } else {
        alert("Name should be more than 2 characters");
        event.target.name.value = '';
      }
    } else {
      alert('You have already joined the game');
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
