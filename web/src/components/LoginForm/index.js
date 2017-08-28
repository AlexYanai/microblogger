// @flow
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import Input from '../Input';

type Props = {
  onSubmit: () => void,
  handleSubmit: () => void,
  submitting: boolean,
};

class LoginForm extends Component {
  props: Props

  handleSubmit = data => this.props.onSubmit(data);

  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <form
        className="signup-form-main"
        onSubmit={handleSubmit(this.handleSubmit)}>
        
        <h3 style={{ marginBottom: '2rem', textAlign: 'center' }}>
          Login to Cite
        </h3>

        <Field 
          name="email" 
          type="text" 
          component={Input} 
          placeholder="Email"
        />
        <Field 
          name="password" 
          type="password" 
          component={Input} 
          placeholder="Password"
        />
        <button
          type="submit"
          disabled={submitting}
          className="btn btn-block btn-primary">
          {submitting ? 'Logging in...' : 'Login'}
        </button>

        <hr style={{ margin: '2rem 0' }} />

        <Link to="/signup" className="btn btn-block btn-secondary">
          Create a new account
        </Link>
      </form>
    );
  }
}

export default reduxForm({
  form: 'login',
})(LoginForm);