// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Navbar from '../../containers/Navbar';
import { fetchPost, deletePost, editPost } from '../../actions/posts';
import { fetchComments } from '../../actions/comments';
import { Comment } from '../../types';
import PostListItem from '../../components/PostListItem';
import CommentListItem from '../../components/CommentListItem';
import PostForm from '../../components/PostForm';
import Comments from '../../components/Comments';
import { showModal } from '../../actions/modal';


type Props = {
  isAuthenticated: boolean,
  currentUser: Object,
  isModalOpen: boolean,
  isSearchFormOpen: boolean,
  isEditModalOpen: boolean,
  deletePost: () => void,
  editPost: () => void,
  showModal: () => void,
  editFormData: Object,
  comments: Array<Comment>
};

class Post extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  componentDidMount() {
    var userId;
    var postId;
    var path = window.location.pathname.split("/");

    if (path && path.length === 5) {
      userId = parseInt(path[2], 10);
      postId = parseInt(path[4], 10);
    }

    if (userId && postId) {
      this.props.fetchPost(userId, postId);
      this.props.fetchComments(postId);
    }
  }

  props: Props;

  handleDeletePost = data => this.props.deletePost(this.context.router, this.props.currentUser, data, true);
  handleEditPost   = data => this.props.editPost(this.context.router, this.props.currentUser, data, true, true);
  showPostModal    =  ()  => this.props.showModal(this.props.isModalOpen);
  isCurrentUser    =  ()  => this.props.currentUser.id === this.props.profileUser.id;

  render() {
    const { isModalOpen, isEditModalOpen, isAuthenticated, currentUser, post, comments } = this.props;
    const formProps = { isModalOpen, isEditModalOpen, isAuthenticated, currentUser, post, comments };

    return (
      <div style={{ flex: '1', overflow: 'scroll' }}>
        <Navbar currentUser={this.props.currentUser} />
        <div className="posts-list-container">
            {(this.props.isModalOpen || this.props.isEditModalOpen) &&
              <PostForm 
                onEditSubmit={this.handleEditPost} 
                showModal={this.showPostModal} 
                categories={this.props.post.categories} 
                post={this.props.editFormData} {...formProps} />
            }

            {this.props.post &&
            <PostListItem
              key={this.props.post.id}
              post={this.props.post}
              currentUser={this.props.currentUser}
              showPostModal={this.showPostModal}
              handleDeletePost={this.handleDeletePost}
            />}

            <hr style={{ borderTop: '2px solid var(--palette-gray-blue)', width: '50%' }} />

            {(comments && comments[0]) &&
            <Comments
              comments={comments}
              post={this.props.post}
            />}
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    isAuthenticated: state.session.isAuthenticated,
    currentUser: state.session.currentUser,
    editFormData: state.modal.editFormData,
    initialValues: state.modal.initialValues,
    isModalOpen: state.modal.isModalOpen,
    isEditModalOpen: state.modal.isEditModalOpen,
    post: state.posts.post,
    comments: state.comments.comments
  }),
  {  deletePost, editPost, showModal, fetchPost, fetchComments }
)(Post);
