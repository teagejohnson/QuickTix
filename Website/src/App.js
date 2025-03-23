import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Login from './components/pages/Login.js';
import PrivateRoute from './components/pages/PrivateRoute.js';
import Privacy from './components/pages/Privacy.js';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path = '/' component = {PrivateRoute} />
          <Route exact path = '/login' component = {Login} />
          <Route exact path = '/privacy' component = {Privacy} />
        </Switch>
      </BrowserRouter>
    )
  }
};

export default App
