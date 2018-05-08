import React, {Component} from 'react';
import {render} from 'react-dom';
import {Origin, RegName} from './components';

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
      <Container>
        <Origin/>
        <RegName/>
      </Container>
  </div>
  }
}


render(<Main/>, document.getElementById('root'));