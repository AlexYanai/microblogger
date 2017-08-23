// @flow
import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import Input from '../Input';
import InputCheckbox from '../InputCheckbox';
import { css, StyleSheet } from 'aphrodite';
import { connect } from 'react-redux';
import { showModal } from '../../actions/modal';
import Multiselect from 'react-widgets/lib/Multiselect'

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

  multiselect: {
    width: '100%',
  },

  rwMultiselectWrapper: {
    width: '100%',

  },

  card: {
    zIndex: '9998',
    padding: '3rem 4rem',
    margin: '2rem auto',
    width: '40%'
  }
});

const renderMultiselect = ({ input, data, valueField, textField }) =>
  <Multiselect {...input}
    onBlur={() => input.onBlur()}
    value={input.value || []}
    placeholder="Tags..." 
    data={data}
    valueField={valueField}
    textField={textField}
  />

class NewCitationForm extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  props: Props

  handleSubmit      = data => this.props.onSubmit(data);
  showCitationModal = ()   => this.props.showModal(this.context.router, this.props.isModalOpen);

  dontClose(e) {
    e.stopPropagation();
  }

  render() {
    const { handleSubmit, submitting } = this.props;
    const categoryNames = this.props.categories.map(function(x) { return x.name });

    return (
      <div className={`modal ${css(styles.modal)}`} onClick={this.showCitationModal.bind(this)}>
        <form className={`card ${css(styles.card)}`} onClick={this.dontClose} onSubmit={handleSubmit(this.handleSubmit)}>
          <div className="input-group">
            <Field
              style={{marginBottom: '5px'}}
              name="title"
              type="string"
              placeholder="Title"
              component={Input}
            />
            <Field
              style={{marginBottom: '5px'}}
              name="source"
              type="text"
              placeholder="Source"
              component={Input}
            />
            <Field
              style={{marginBottom: '5px'}}
              name="quote"
              type="textarea"
              placeholder="Quote"
              component="textarea"
              className="form-control"
            />
            <Field 
              style={{display: 'inline-flex', marginTop: '5px', marginLeft: '5px'}} 
              className="" 
              label="Public: " 
              htmlFor="public" 
              name="is_public" 
              component={InputCheckbox} 
              type="checkbox"/>
            <Field
              name="categories"
              label="Category" 
              className="multiselect"
              component={renderMultiselect}
              data={categoryNames}/>

            <button type="submit" className="btn btn-block btn-primary" style={{marginTop: '45px'}} disabled={submitting}>
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