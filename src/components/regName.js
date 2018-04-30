import React, {Component} from 'react';

class regName extends Component {
  constructor(props){
    super(props);
    this.state = {}
  }

  handle(e){
    e.prevendDefault();
  }


  render(){
    return <form onSubmit={this.handle}>
      <label for="ex1">Type in your name to join the game</label>
      <input type="text" name="name" id="ex1"
        className="form-control" placeholder="your name goes here"/>
        <button type="submit" className="btn btn-success">Join</button>
    </form>
  }
}
