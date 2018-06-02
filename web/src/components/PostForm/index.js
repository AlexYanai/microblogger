// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import Input from '../Input';
import InputCheckbox from '../InputCheckbox';
import { connect } from 'react-redux';
import { showEditModal } from '../../actions/modal';
import MultiSelectField  from '../MultiSelectField';

type Props = {
  initialValues: Object,
  submitting: boolean,
  isEditModalOpen: boolean,
  isModalOpen: boolean,
  onSubmit: () => void,
  handleSubmit: () => void,
  showModal: () => void,
  showEditModal: () => void,
};

class PostForm extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  props: Props;

  dontClose       = (e)    => e.stopPropagation();
  handleAllSubmit = (data) => this.props.isEditModalOpen ? this.props.onEditSubmit(data) : this.props.onNewSubmit(data);

  handleModal() {
    if (this.props.isEditModalOpen) {
      this.props.showEditModal(this.props.isEditModalOpen, this.props.initialValues);
    } else {
      this.props.showModal(this.props.isModalOpen);
    }
  }

  render() {
    const { handleSubmit, submitting  } = this.props;
    const categoryNames = this.props.categories.map(function(x) { return x.name });

    return (
      <div className="modal" onClick={this.handleModal.bind(this)}>
        <div className="modal-overlay"></div>
        <form className="modal-form" onClick={this.dontClose} onSubmit={handleSubmit(this.handleAllSubmit.bind(this))}>
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
              placeholder="Subheader"
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
              type="checkbox"
            />
            <Field
              name="categories"
              label="Category" 
              className="multiselect"
              placeholder="tags..."
              component={MultiSelectField}
              data={categoryNames}
            />

            <button type="submit" className="btn btn-block btn-primary" style={{marginTop: '45px'}} disabled={submitting}>
              {submitting ? 'Saving...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

PostForm = reduxForm({
  form: 'editPost',
  enableReinitialize: true,
})(PostForm);

PostForm = connect(
  state => ({
    isModalOpen: state.modal.isModalOpen,
    isEditModalOpen: state.modal.isEditModalOpen,
    initialValues: state.modal.initialValues,
  }),
  { showEditModal }
)(PostForm);

export default PostForm;