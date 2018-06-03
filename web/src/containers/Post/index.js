// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Navbar from '../../containers/Navbar';
import { fetchPost } from '../../actions/posts';
import PostListItem from '../../components/PostListItem';
import PostForm from '../../components/PostForm';
import { showModal } from '../../actions/modal';
import { deletePost, editPost } from '../../actions/posts';


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

  post: {
    id: number,
    title: string,
    source: string,
    is_public: boolean,
    quote: string,
    user_id: number
  }
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
    }
  }

  props: Props;

  handleDeletePost = data => this.props.deletePost(this.context.router, this.props.currentUser, data, true);
  handleEditPost   = data => this.props.editPost(this.context.router, this.props.currentUser, data, true, true);
  showPostModal    =  ()  => this.props.showModal(this.props.isModalOpen);
  isCurrentUser    =  ()  => this.props.currentUser.id === this.props.profileUser.id;

  render() {
    const { isModalOpen, isEditModalOpen, isAuthenticated, currentUser, post } = this.props;
    const formProps = { isModalOpen, isEditModalOpen, isAuthenticated, currentUser, post };

    return (
      <div style={{ flex: '1', overflow: 'scroll' }}>
        <Navbar currentUser={this.props.currentUser} />
        <div className="posts-list-container">
          <div className="posts-button-row">
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
          </div>
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
    post: state.posts.post
  }),
  {  deletePost, editPost, showModal, fetchPost }
)(Post);
