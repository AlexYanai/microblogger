import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showCommentModal, showEditCommentModal } from '../../actions/modal';
import { editComment, deleteComment } from '../../actions/comments';
import { Post } from '../../types';
import Gravatar from 'react-gravatar';
import { Link } from 'react-router-dom';

type Props = {
  post: Post,
  dateOptions: Object,
  editFormData: Object,
  currentUser: Object,
  deleteComment: () => void,
  editComment: () => void,
  showCommentModal: () => void,
  showEditCommentModal: () => void,
  isCommentModalOpen: boolean,
  isEditCommentModalOpen: boolean,
};

class CommentListItem extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  props: Props;

  handleEditComment    = data => this.props.editComment(this.context.router, this.props.currentUser, data, true);
  handleDeleteComment  = data => this.props.deleteComment(this.context.router, this.props.comment, data);
  showCommentModal     =  ()  => this.props.showCommentModal(this.props.isCommentModalOpen);
  showEditCommentModal =  ()  => this.props.showEditCommentModal(this.props.isCommentModalOpen, this.props.comment);
  formatDateString     = data => (new Date(this.props.comment.inserted_at)).toLocaleDateString('en-US', data);

  ownedByCurrentUser() {
    return this.props.comment.user_id === this.props.currentUser.id;
  }

  render() {
    const dateOptions = { 
      weekday: 'long', 
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    };

    return (
      <div key={this.props.comment.id} className="comment-list-item-card">
        <div className="comment-list-item-author">
          <div className="comment-picture-container">
            <Gravatar className="comment-picture" email={this.props.comment.email} size={30} />
          </div>

         <Link to={`/profile/${this.props.comment.user_id}`}>
            <div style={{margin: 'auto'}}>{this.props.comment.username}</div>
          </Link>

          {this.ownedByCurrentUser() &&
            <div style={{display: 'inline-flex'}}>
              <button type="button" className="btn btn-link" onClick={this.showEditCommentModal}>
                <div className="post-list-item-edit">
                  <span className="fa fa-pencil" />
                </div>
              </button>
              
              <button type="button" className="post-list-item-logout-button" onClick={this.handleDeleteComment}>
                <div className="post-list-item-delete">
                  <span className="fa fa-times" />
                </div>
              </button>
            </div>
          }

          <div className="comment-list-item-quote">
            {this.props.comment.body}
          </div>
        </div>
          
        <div className="comment-list-item-date">
          {this.formatDateString(dateOptions)}
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    currentUser: state.session.currentUser,
    isAuthenticated: state.session.isAuthenticated,
    isCommentModalOpen: state.modal.isCommentModalOpen,
    editFormData: state.modal.editFormData,
    initialValues: state.modal.initialValues,
    isEditCommentModalOpen: state.modal.isEditCommentModalOpen,
  }),
  { editComment, deleteComment, showCommentModal, showEditCommentModal }
)(CommentListItem);
