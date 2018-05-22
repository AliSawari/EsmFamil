import React, {Component} from 'react';
import {render} from 'react-dom';
import {Origin, RegName, Container} from './components';

const Main = () => (
  <div>
    <Container>
      <Origin/>
      <RegName/>
    </Container>
  </div>
);

render(<Main/>, document.getElementById('root'));

export default Main; 
