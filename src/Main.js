import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Origin} from './components';
import store from './store';
import {Provider} from 'react-redux';

const Render = C => {
	return ReactDOM.render(<C/>, document.getElementById('root'));
}

class Main extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return <div className="container">
			<Provider store={store}>
				<h1>Esm Famil</h1>
				<p>welcome to guess-the-name game</p><hr />
				<Origin/>
			</Provider>
		</div>
  }
}

Render(Main);
