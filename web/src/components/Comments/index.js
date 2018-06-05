// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Category, Post, Comment } from '../../types';
import { logout } from '../../actions/session';
import CommentListItem from '../../components/CommentListItem';

type Props = {
  currentUser: Object,
  comments: Array<Comment>,
};

class Comments extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  // componentDidMount() {
  //   if (this.props.isAuthenticated) {
  //     this.props.fetchPaginatedPosts({page: 1, id: this.props.currentUser.id, route: 'public'});
  //     this.props.showSearchForm(true);
  //   }
  // }

  props: Props

  handleLogout = () => this.props.logout(this.context.router);

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
    const { isAuthenticated, isModalOpen, isEditModalOpen, currentUser, comments } = this.props;
    const modalProps = { isAuthenticated, isModalOpen, isEditModalOpen, currentUser, comments };
    console.log(comments);
    return (
      <div >
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
    isModalOpen: state.modal.isModalOpen,
    isSearchFormOpen: state.posts.isSearchFormOpen,
    isEditModalOpen: state.modal.isEditModalOpen,
  }),
  { logout }
)(Comments);
