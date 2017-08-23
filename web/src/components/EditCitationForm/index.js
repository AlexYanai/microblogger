// @flow
import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import Input from '../Input';
import InputCheckbox from '../InputCheckbox';
import { css, StyleSheet } from 'aphrodite';
import { connect } from 'react-redux';
import { showEditModal } from '../../actions/modal';
import Multiselect from 'react-widgets/lib/Multiselect'

type Props = {
  citation: Object,
  editFormData: Object,
  initialValues: Object,
  handleSubmit: () => void,
  onSubmit: () => void,
  submitting: boolean,
  isEditModalOpen: boolean,
  errors: any,
  showEditModal: () => void,
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

const renderMultiselect = ({ input, data, valueField, textField }) =>
  <Multiselect {...input}
    onBlur={() => input.onBlur()}
    value={input.value || []}
    placeholder="Tags..." 
    data={data}
    valueField={valueField}
    textField={textField}
  />

class EditCitationForm extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  props: Props;

  handleSubmit          = data => this.props.onSubmit(data);
  showEditCitationModal = ()   => this.props.showEditModal(this.context.router, this.props.isEditModalOpen, this.props.initialValues);

  dontClose(e) {
    e.stopPropagation();
  }

  render() {
    const { handleSubmit, submitting } = this.props;
    const categoryNames = this.props.categories.map(function(x) { return x.name });
    console.log("this.props.citation");
    console.log(this.props.citation);
    return (
      <div className={`modal ${css(styles.modal)}`} onClick={this.showEditCitationModal.bind(this)}>
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

EditCitationForm = reduxForm({
  form: 'editCitation',
  enableReinitialize: true,
})(EditCitationForm);

EditCitationForm = connect(
  state => ({
    isModalOpen: state.modal.isModalOpen,
    isEditModalOpen: state.modal.isEditModalOpen,
    initialValues: state.modal.initialValues,
  }),
  { showEditModal }
)(EditCitationForm);

export default EditCitationForm;