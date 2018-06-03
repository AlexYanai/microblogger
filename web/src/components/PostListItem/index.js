import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showModal, showEditModal } from '../../actions/modal';
import { favorite, unfavorite } from '../../actions/favorites';
import { deletePost, editPost } from '../../actions/posts';
import { Post } from '../../types';
import { Link } from 'react-router-dom';

type Props = {
  post: Post,
  dateOptions: Object,
  editFormData: Object,
  handleDeletePost: () => void,
  showEditPostModal: () => void,
  favoritePost: () => void,
  isEditModalOpen: boolean,
};

class PostListItem extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  props: Props;

  showEditPostModal =  ()  => this.props.showEditModal(this.props.isEditModalOpen, this.props.post);
  handleDeletePost  = data => this.props.deletePost(this.context.router, this.props.post.user_id, this.props.post.id, this.props.pagPosts);
  handleEditPost    = data => this.props.editPost(this.context.router, this.props.currentUser, data);
  formatDateString  = data => (new Date(this.props.post.inserted_at)).toLocaleDateString('en-US', data);

  favoritePost() {
    if (this.props.post.is_favorite) {
      this.props.unfavorite(this.context.router, this.props.post, this.props.pagPosts);
    } else {
      this.props.favorite(this.context.router, this.props.post, this.props.pagPosts);
    }
  }

  ownedByCurrentUser() {
    return this.props.post.user_id === this.props.currentUser.id;
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
      <div key={this.props.post.id} className="post-list-item-card">
        <div className="button-row">
          <div className="post-list-item-author">
            <div className="post-list-item-author-name">
             <Link to={`/profile/${this.props.post.user_id}`}>
                <p style={{margin: 'auto'}}>{this.props.post.username}</p>
              </Link>
            </div>
          </div>
          
          <div style={{paddingTop: 0}} className="post-list-item-link">
            <Link to={`/users/${this.props.post.user_id}/posts/${this.props.post.id}`}>
                <h3>{this.props.post.title}</h3>
             </Link>
          </div>
          
          <div className="post-list-item-buttons">
            <button type="button" className="btn btn-link" onClick={this.favoritePost.bind(this)}>
              <div className={this.props.post.is_favorite ? "post-list-item-fave" : "post-list-item-not-fave"}>
                <span className="fa fa-heart" />
              </div>
            </button>

            {this.ownedByCurrentUser() &&
              <div style={{display: 'inline-flex'}}>
                <button type="button" className="btn btn-link" onClick={this.showEditPostModal}>
                  <div className="post-list-item-edit">
                    <span className="fa fa-pencil" />
                  </div>
                </button>
                
                <button type="button" className="post-list-item-logout-button" onClick={this.handleDeletePost}>
                  <div className="post-list-item-delete">
                    <span className="fa fa-times" />
                  </div>
                </button>
              </div>
            }
          </div>
        </div>

        <div className="post-list-item-source">{this.props.post.source}</div>
        <hr style={{ borderTop: '1px solid var(--palette-gray-blue)', width: '50%' }} />
        <div className="post-list-item-quote">{this.props.post.quote}</div>
        <div className="post-list-item-date">{this.formatDateString(dateOptions)}</div>
      </div>
    )
  }
}

export default connect(
  state => ({
    isEditModalOpen: state.modal.isEditModalOpen,
    editFormData: state.modal.editFormData,
    initialValues: state.modal.initialValues,
  }),
  { favorite, unfavorite, deletePost, editPost, showModal, showEditModal }
)(PostListItem);
