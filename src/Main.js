import React, {Component} from 'react';
import {render} from 'react-dom';
import {Origin, RegName} from './components';
import store from './store';
import {Provider} from 'react-redux';

class Container extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return <div className="container">
      {this.props.children}
    </div>
  }
}

class Main extends Component {
  render(){
    return <div>
    <Provider store={store}>
      <Container>
        <Origin/>
        <RegName/>
      </Container>
    </Provider>
  </div>
  }
}


render(<Main/>, document.getElementById('root'));