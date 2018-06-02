// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Navbar from '../../containers/Navbar';
import { fetchPost } from '../../actions/posts';

type Props = {
  currentUser: Object,
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
    const userId     = this.props.match.params.id;
    const postId = this.props.match.params.post_id;

    if (userId && postId) {
      this.props.fetchPost(userId, postId);
    }
  }

  props: Props;

  render() {
    const userId     = this.props.match.params.id;
    const postId = this.props.match.params.post_id;

    return (
      <div style={{ flex: '1' }}>
        <Navbar />
        <h2>Post</h2>
        <span>{userId}</span><br/>
        <span>{postId}</span>
      </div>
    );
  }
}

export default connect(
  state => ({
    // isAuthenticated: state.session.isAuthenticated,
    // currentUser: state.session.currentUser,
    post: state.posts.post
  }),
  { fetchPost }
)(Post);
