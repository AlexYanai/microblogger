// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Navbar from '../../containers/Navbar';
import { fetchPost } from '../../actions/posts';

type Props = {
  isAuthenticated: boolean,
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
    const userId = this.props.match.params.id;
    const postId = this.props.match.params.post_id;

    console.log("here");
    console.log("userId: ", userId);
    console.log("postId: ", postId);

    if (userId && postId) {
      this.props.fetchPost(userId, postId);
    }
  }

  props: Props;

  isCurrentUser = ()   => this.props.currentUser.id === this.props.profileUser.id;

  render() {
    const { isAuthenticated, currentUser } = this.props;
    const formProps = { isAuthenticated, currentUser };
    console.log(isAuthenticated)
    console.log(currentUser)
    const userId = this.props.match.params.id;
    const postId = this.props.match.params.post_id;

    return (
      <div style={{ flex: '1', overflow: 'scroll' }}>
        <Navbar currentUser={currentUser} />
        <div className="profile-container">
          <div style={{ flex: '1' }}>
            <h2>Post</h2>
            <span>{userId}</span><br/>
            <span>{postId}</span>
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
    post: state.posts.post
  }),
  { fetchPost }
)(Post);
