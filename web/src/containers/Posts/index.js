// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Category, Post } from '../../types';
import Navbar from '../../containers/Navbar';
import { logout } from '../../actions/session';
import { showModal } from '../../actions/modal';
import { fetchPaginatedPosts, showSearchForm, endOfPosts, fetchPost, createPost, deletePost, editPost } from '../../actions/posts';
import PostListItem from '../../components/PostListItem';
import PostForm from '../../components/PostForm';
import SearchForm from '../../components/SearchForm';

type Props = {
  currentUser: Object,
  paginatedPosts: Array<Post>,
  categories: Array<Category>,
  isAuthenticated: boolean,
  isModalOpen: boolean,
  isSearchFormOpen: boolean,
  reachedEnd: boolean,
  isEditModalOpen: boolean,
  createPost: () => void,
  deletePost: () => void,
  editPost: () => void,
  showModal: () => void,
  showSearchForm: () => void,
  editFormData: Post
};

class Posts extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.fetchPaginatedPosts({page: 1, id: this.props.currentUser.id, route: 'public'});
      this.props.showSearchForm(true);
    }
  }

  props: Props

  handleLogout        =  ()  => this.props.logout(this.context.router);
  showPostModal       =  ()  => this.props.showModal(this.props.isModalOpen);
  handleNewPostSubmit = data => this.props.createPost(data, this.context.router, this.props.currentUser);
  handleDeletePost    = data => this.props.deletePost(this.context.router, this.props.currentUser, data);
  handleEditPost      = data => this.props.editPost(this.context.router, this.props.currentUser, data, true);
  showSearch          = ()   => this.props.showSearchForm(this.props.isSearchFormOpen);

  handleSearch(isSearch, data = {}) {
    var page_num   = isSearch ? 0 : this.props.pagination.page_number;
    var categories = data.categories !== undefined ? data.categories : [];

    if (categories.length === 0 && this.props.searchCategories !== undefined) {
      categories = this.props.searchCategories;
    }

    if (this.props.pagination.total_pages > page_num || isSearch) {
      page_num += 1;

      const cites  = isSearch ? [] : this.props.paginatedPosts;
      const params = {
        id: this.props.currentUser.id,
        page: page_num, 
        categories: categories,
        route: 'public'
      }

      this.props.fetchPaginatedPosts(params, cites);
    } else {
      this.props.endOfPosts();
    }
  }

  renderPosts(pagPosts) {
    if (pagPosts === undefined) {
      return null;
    }

    return pagPosts.map(post =>
      <PostListItem
        key={post.data.id}
        post={post.data}
        pagPosts={pagPosts}
        currentUser={this.props.currentUser}
        showPostModal={this.showPostModal}
        handleDeletePost={this.handleDeletePost}
      />
    );
  }

  render() {
    const { isAuthenticated, isModalOpen, isEditModalOpen, currentUser } = this.props;
    const modalProps = { isAuthenticated, isModalOpen, isEditModalOpen, currentUser };

    return (
      <div style={{ flex: '1', overflow: 'scroll' }}>
        <Navbar currentUser={this.props.currentUser} />
        <div className="posts-list-container">
          <div className="posts-button-row">
            <div className="posts-ask-box" onClick={this.showPostModal} >
              <div className="posts-link-div"><a>Save Something New...</a></div>
            </div>
          </div>

          {this.props.isSearchFormOpen && 
            <SearchForm 
              onSubmit={this.handleSearch.bind(this, true)} 
              categories={this.props.categories} 
              showSearch={this.props.showSearch} />
          }

          {!this.props.isSearchFormOpen && 
            <button className="btn btn-link" onClick={this.showSearch}>
              Filter by category
            </button>
          }

          {(this.props.isModalOpen || this.props.isEditModalOpen) &&
            <PostForm 
              onNewSubmit={this.handleNewPostSubmit} 
              onEditSubmit={this.handleEditPost} 
              showModal={this.showPostModal} 
              categories={this.props.categories} 
              post={this.props.editFormData} {...modalProps} />
          }

          {this.renderPosts(this.props.paginatedPosts)}

          <button className="btn btn-link" onClick={this.handleSearch.bind(this, false)}>
            {this.props.reachedEnd ? "You've reached the end" : 'More...'}
          </button>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    isAuthenticated: state.session.isAuthenticated,
    currentUser: state.session.currentUser,
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
  { logout, fetchPaginatedPosts, showSearchForm, endOfPosts, fetchPost, createPost, deletePost, editPost, showModal }
)(Posts);
