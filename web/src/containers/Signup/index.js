// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signup } from '../../actions/session';
import SignupForm from '../../components/SignupForm';
import Navbar from '../../containers/Navbar';

type Props = {
  signup: () => void,
};

class Signup extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  props: Props

  handleSignup = data => this.props.signup(data, this.context.router);

  render() {
    return (
      <div style={{ flex: '1' }}>
        <Navbar />
        <SignupForm onSubmit={this.handleSignup} />
      </div>
    );
  }
}

export default connect(null, { signup })(Signup);