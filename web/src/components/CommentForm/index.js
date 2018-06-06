// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import Input from '../Input';
import InputCheckbox from '../InputCheckbox';
import { connect } from 'react-redux';
import { showCommentModal, showEditCommentModal } from '../../actions/modal';
import MultiSelectField  from '../MultiSelectField';

type Props = {
  initialValues: Object,
  submitting: boolean,
  isEditCommentModalOpen: boolean,
  isCommentModalOpen: boolean,
  onSubmit: () => void,
  handleSubmit: () => void,
  showModal: () => void,
};

class CommentForm extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  props: Props;

  dontClose       = (e)    => e.stopPropagation();
  handleAllSubmit = (data) => this.props.isEditCommentModalOpen ? this.props.onEditSubmit(data) : this.props.onNewSubmit(data);

  handleModal() {
    if (this.props.isEditCommentModalOpen) {
      this.props.showEditCommentModal(this.props.isEditCommentModalOpen, this.props.initialValues);
    } else {
      this.props.showCommentModal(this.props.isCommentModalOpen);
    }
  }

  render() {
    const { handleSubmit, submitting  } = this.props;

    return (
      <div className="modal" onClick={this.handleModal.bind(this)}>
        <div className="modal-overlay"></div>
        <form className="modal-form" onClick={this.dontClose} onSubmit={handleSubmit(this.handleAllSubmit.bind(this))}>
          <div className="input-group">
            <Field
              style={{marginBottom: '5px'}}
              name="body"
              type="textarea"
              placeholder="Comment..."
              component="textarea"
              className="form-control"
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

CommentForm = reduxForm({
  form: 'editComment',
  enableReinitialize: true,
})(CommentForm);

CommentForm = connect(
  state => ({
    isCommentModalOpen: state.modal.isCommentModalOpen,
    isEditCommentModalOpen: state.modal.isEditCommentModalOpen,
    initialValues: state.modal.initialValues,
  }),
  { showCommentModal, showEditCommentModal }
)(CommentForm);

export default CommentForm;