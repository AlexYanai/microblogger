// @flow
// import React, { Component } from 'react';
// import { css, StyleSheet } from 'aphrodite';
// import Navbar from '../../components/Navbar';
// import { fetchCitations } from '../../actions/citations';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../Home';
import Login from '../Login';
import NotFound from '../../components/NotFound';
import Signup from '../Signup';

const App = () => (
  <Router>
    <div style={{ display: 'flex', flex: '1' }}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
)

export default App;