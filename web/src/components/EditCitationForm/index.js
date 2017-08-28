// @flow
import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import Input from '../Input';
import InputCheckbox from '../InputCheckbox';
import { connect } from 'react-redux';
import { showEditModal } from '../../actions/modal';
import MultiSelectField  from '../MultiSelectField';

type Props = {
  citation: Object,
  editFormData: Object,
  initialValues: Object,
  handleSubmit: () => void,
  onSubmit: () => void,
  submitting: boolean,
  isEditModalOpen: boolean,
  showEditModal: () => void,
};

class EditCitationForm extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  props: Props;

  handleSubmit          = data => this.props.onSubmit(data);
  showEditCitationModal = ()   => this.props.showEditModal(this.props.isEditModalOpen, this.props.initialValues);

  dontClose(e) {
    e.stopPropagation();
  }

  render() {
    const { handleSubmit, submitting } = this.props;
    const categoryNames = this.props.categories.map(function(x) { return x.name });

    return (
      <div className="modal" onClick={this.showEditCitationModal.bind(this)}>
        <form className="modalForm" onClick={this.dontClose} onSubmit={handleSubmit(this.handleSubmit)}>
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
            component={MultiSelectField}
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