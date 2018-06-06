// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Category, Post, Comment } from '../../types';
import { logout } from '../../actions/session';
import { showCommentModal, showEditCommentModal } from '../../actions/modal';
import { createComment, editComment, deleteComment } from '../../actions/comments';
import CommentListItem from '../../components/CommentListItem';
import CommentForm from '../../components/CommentForm';

type Props = {
  currentUser: Object,
  isCommentModalOpen: boolean,
  isEditCommentModalOpen: boolean,
  comments: Array<Comment>,
  createComment: () => void,
  deleteComment: () => void,
  editComment: () => void,
  showCommentModal: () => void,
  editFormData: Comment
};

class Comments extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  componentDidMount() {
    if (this.props.isAuthenticated) {
      // this.props.fetchPaginatedPosts({page: 1, id: this.props.currentUser.id, route: 'public'});
      this.props.showCommentModal(true);
    }
  }

  props: Props

  handleLogout           =  ()  => this.props.logout(this.context.router);
  handleNewCommentSubmit = data => this.props.createComment(data, this.context.router, this.props.currentUser, this.props.post);
  handleEditComment      = data => this.props.editComment(this.context.router, this.props.currentUser, data, true);
  handleDeleteComment    = data => this.props.deleteComment(this.context.router, this.props.currentUser, data);
  showCommentModal       =  ()  => this.props.showCommentModal(this.props.isCommentModalOpen);

  renderComments(comments) {
    if (comments === undefined) {
      return null;
    }

    return comments.map(comment =>
      <CommentListItem
        key={comment.id}
        comment={comment}
        currentUser={this.props.currentUser}
      />
    );
  }

  render() {
    const { isAuthenticated, isCommentModalOpen, isEditCommentModalOpen, currentUser, comments, post } = this.props;
    const modalProps = { isAuthenticated, isCommentModalOpen, isEditCommentModalOpen, currentUser, comments, post };
    console.log(comments);
    console.log(post);

    return (
      <div>
        <div className="posts-ask-box" onClick={this.showCommentModal} >
          <div className="posts-link-div"><a>Save Something New...</a></div>
        </div>

        {(this.props.isCommentModalOpen || this.props.isEditCommentModalOpen) &&
          <CommentForm 
            onNewSubmit={this.handleNewCommentSubmit} 
            onEditSubmit={this.handleEditComment} 
            showModal={this.showCommentModal} 
            comment={this.props.editFormData} {...modalProps} 
        />}

        {this.renderComments(comments)}
      </div>
    );
  }
}

export default connect(
  state => ({
    isAuthenticated: state.session.isAuthenticated,
    currentUser: state.session.currentUser,
    comments: state.comments.comments,
    categories: state.posts.categories,
    paginatedPosts: state.posts.paginatedPosts,
    searchCategories: state.posts.searchCategories,
    pagination: state.posts.pagination,
    reachedEnd: state.posts.reachedEnd,
    editFormData: state.modal.editFormData,
    initialValues: state.modal.initialValues,
    isCommentModalOpen: state.modal.isCommentModalOpen,
    isEditCommentModalOpen: state.modal.isEditCommentModalOpen,
    isSearchFormOpen: state.posts.isSearchFormOpen
  }),
  { logout, createComment, editComment, deleteComment, showCommentModal, showEditCommentModal }
)(Comments);
