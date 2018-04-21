import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Origin, About} from './components';

function gebi(id) {
	return document.getElementById(id);
}

const Render = C => {
	return ReactDOM.render(<C/>, gebi('root'));
}

class Hello extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return <div className="container">
			<h1>Hello React</h1>
			<Origin/>
			<About/>
		</div>
  }
}

Render(Hello);

require('./socket.js');
