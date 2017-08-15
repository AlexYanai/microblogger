// @flow
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Input from '../Input';
import { css, StyleSheet } from 'aphrodite';

type Props = {
  handleSubmit: () => void,
  onSubmit: () => void,
  submitting: boolean,
  errors: any,
};

const styles = StyleSheet.create({
  modal: {
    display: 'flex',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    background: 'rgba(0, 0, 0, 0.15)'
  },
});

class NewCitationForm extends Component {
  props: Props

  handleSubmit = (data) => this.props.onSubmit(data);

  render() {
    const { handleSubmit, submitting, errors } = this.props;

    return (
      <div className={`modal ${css(styles.modal)}`}>
        <form onSubmit={handleSubmit(this.handleSubmit)}>
          <div className="input-group">
            <Field
              name="title"
              type="string"
              placeholder="Title"
              component={Input}
              className="form-control"
            />
            <Field
              name="source"
              type="text"
              placeholder="Source"
              component={Input}
              className="form-control"
            />
            <Field
              name="quote"
              type="text"
              placeholder="Quote"
              component={Input}
              className="form-control"
            />

            <div className="input-group-btn">
              <button type="submit" className="btn btn-primary" disabled={submitting}>
                {submitting ? 'Saving...' : 'Submit'}
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const validate = (values) => {
  const errors = {};
  
  if (!values.title) {
    errors.title = 'Required';
  }
  
  if (!values.source) {
    errors.source = 'Required';
  }
  
  if (!values.quote) {
    errors.quote = 'Required';
  }

  return errors;
};

export default reduxForm({
  form: 'newCitation',
  validate,
})(NewCitationForm);
