// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Navbar from '../../components/Navbar';

type Citation = {
  id: number,
  title: string,
  source: string,
  quote: string,
  user_id: number
};

type Props = {
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
            <span>Welcome, {currentUser.username}!</span>
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
  {}
)(Home);