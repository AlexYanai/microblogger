// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { logout } from '../../actions/session';
import Navbar from '../../components/Navbar';

type Citation = {
  id: number,
  title: string,
  source: string,
  quote: string,
  user_id: number
};

type Props = {
  logout: () => void,
  currentUser: Object,
  currentUserCitations: Array<Citation>,
  isAuthenticated: boolean,
};

class Home extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  props: Props

  render() {
    const { currentUser, isAuthenticated, currentUserCitations } = this.props;
    
    return (
      <div style={{ flex: '1' }}>
        <Navbar />
        {isAuthenticated &&
          <div>
            <ul>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Signup</Link></li>
            </ul>
            <span>{currentUser.username}</span>
            <button type="button" onClick={this.handleLogout}>Logout</button>
          </div>
        }
      </div>
    );
  }
}

export default connect(
  state => ({
    isAuthenticated: state.session.isAuthenticated,
    currentUser: state.session.currentUser,
    currentUserCitations: state.citations.currentUserCitations,
  }),
  { logout }
)(Home);