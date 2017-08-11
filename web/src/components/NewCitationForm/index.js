// @flow
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Input from '../Input';

type Props = {
  handleSubmit: () => void,
  onSubmit: () => void,
  submitting: boolean,
  errors: any,
};

class NewCitationForm extends Component {
  props: Props

  handleSubmit = (data) => this.props.onSubmit(data);

  render() {
    const { handleSubmit, submitting, errors } = this.props;

    return (
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
