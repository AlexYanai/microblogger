// @flow
import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import Input from '../Input';
import { css, StyleSheet } from 'aphrodite';
import { connect } from 'react-redux';
import { showModal } from '../../actions/modal';

type Props = {
  handleSubmit: () => void,
  onSubmit: () => void,
  submitting: boolean,
  errors: any,
  showModal: () => void,
};

const styles = StyleSheet.create({
  modal: {
    display: 'flex',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.3)'
  },

  card: {
    zIndex: '9998',
    padding: '3rem 4rem',
    margin: '2rem auto',
    width: '40%'
  }
});

class NewCitationForm extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  props: Props

  handleSubmit = (data) => this.props.onSubmit(data);

  showCitationModal = () => this.props.showModal(this.context.router, this.props.isModalOpen);

  dontClose(e) {
    e.stopPropagation();
  }

  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <div className={`modal ${css(styles.modal)}`} onClick={this.showCitationModal.bind(this)}>
        <form className={`card ${css(styles.card)}`} onClick={this.dontClose} onSubmit={handleSubmit(this.handleSubmit)}>
          <div className="input-group">
            <Field
              name="title"
              type="string"
              placeholder="Title"
              component={Input}
            />
            <Field
              name="source"
              type="text"
              placeholder="Source"
              component={Input}
            />
            <Field
              name="quote"
              type="textarea"
              placeholder="Quote"
              component="textarea"
              className="form-control"
            />
            <Field style={{display: 'inline-flex'}} 
                   className="" 
                   label="Public" 
                   htmlFor="public" 
                   name="is_public" 
                   component={Input} 
                   type="checkbox"/>

            <button type="submit" className="btn btn-block btn-primary" disabled={submitting}>
              {submitting ? 'Saving...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

NewCitationForm = reduxForm({
  form: 'newCitation'
})(NewCitationForm);

NewCitationForm = connect(
  state => ({
    isModalOpen: state.modal.isModalOpen
  }),
  { showModal }
)(NewCitationForm);

export default NewCitationForm;