import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showModal, showEditModal } from '../../actions/modal';
import { favorite, unfavorite } from '../../actions/favorites';
import { Post } from '../../types';
import Gravatar from 'react-gravatar';
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

class CommentListItem extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  props: Props;

  formatDateString  = data => (new Date(this.props.comment.inserted_at)).toLocaleDateString('en-US', data);

  // ownedByCurrentUser() {
  //   return this.props.comment.user_id === this.props.currentUser.id;
  // }

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
  }),
  {}
)(CommentListItem);
