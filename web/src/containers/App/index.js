// @flow
import React, { Component } from 'react';
import { BrowserRouter, Miss } from 'react-router';
import { connect } from 'react-redux';
import { authenticate, unauthenticate, logout } from '../../actions/session';
import Home from '../Home';
import NotFound from '../../components/NotFound';
import Login from '../Login';
import Signup from '../Signup';
import MatchAuthenticated from '../../components/MatchAuthenticated';
import RedirectAuthenticated from '../../components/RedirectAuthenticated';
import Sidebar from '../../components/Sidebar';

type Citation = {
  id: number,
  title: string,
  source: string,
  quote: string,
  user_id: number
};

type Props = {
  authenticate: () => void,
  unauthenticate: () => void,
  logout: () => void,
  isAuthenticated: boolean,
  willAuthenticate: boolean,
  currentUserCitations: Array<Citation>,
};

class App extends Component {
  componentDidMount() {
    const token = localStorage.getItem('token');

    if (token) {
      this.props.authenticate();
    } else {
      this.props.unauthenticate();
    }
  }

  props: Props

  handleLogout = router => this.props.logout(router);

  render() {
    const { isAuthenticated, willAuthenticate, currentUserCitations } = this.props;
    const authProps = { isAuthenticated, willAuthenticate };

    return (
      <BrowserRouter>
        {({ router }) => (
          <div style={{ display: 'flex', flex: '1' }}>
            {isAuthenticated &&
              <Sidebar
                router={router}
                rooms={currentUserCitations}
                onLogoutClick={this.handleLogout}
              />
            }
            <MatchAuthenticated exactly pattern="/" component={Home} {...authProps} />
            <RedirectAuthenticated pattern="/login" component={Login} {...authProps} />
            <RedirectAuthenticated pattern="/signup" component={Signup} {...authProps} />
            <Miss component={NotFound} />
          </div>
        )}
      </BrowserRouter>
    );
  }
}

export default connect(
  state => ({
    isAuthenticated: state.session.isAuthenticated,
    willAuthenticate: state.session.willAuthenticate,
    currentUserCitations: state.citations.currentUserCitations,
  }),
  { authenticate, unauthenticate, logout }
)(App);