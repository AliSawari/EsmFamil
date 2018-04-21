import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';

class Origin extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return <h2>this is the origin component</h2>
  }
}

export default Origin;
