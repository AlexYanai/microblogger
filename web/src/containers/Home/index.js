// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Category, Citation } from '../../types';
import Navbar from '../../containers/Navbar';
import { logout } from '../../actions/session';
import { showModal } from '../../actions/modal';
import { endOfCitations, fetchPaginatedCitations, fetchCitation, createCitation, deleteCitation, editCitation } from '../../actions/citations';
import CitationListItem from '../../components/CitationListItem';
import NewCitationForm from '../../components/NewCitationForm';
import EditCitationForm from '../../components/EditCitationForm';

type Props = {
  currentUser: Object,
  paginatedCitations: any,
  currentUserCitations: Array<Citation>,
  allCitations: Array<Citation>,
  categories: Array<Category>,
  isAuthenticated: boolean,
  isModalOpen: boolean,
  reachedEnd: boolean,
  isEditModalOpen: boolean,
  fetchPaginatedCitations: () => void,
  createCitation: () => void,
  deleteCitation: () => void,
  editCitation: () => void,
  showModal: () => void,
  editFormData: Citation
};

class Home extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  componentDidMount() {
    this.props.fetchPaginatedCitations(this.props.currentUser.id, {page: 1, id: this.props.currentUser.id});
  }

  props: Props

  handleLogout            =  ()  => this.props.logout(this.context.router);
  showCitationModal       =  ()  => this.props.showModal(this.props.isModalOpen);
  handleNewCitationSubmit = data => this.props.createCitation(data, this.context.router, this.props.currentUser);
  handleDeleteCitation    = data => this.props.deleteCitation(this.context.router, this.props.currentUser, data);
  handleEditCitation      = data => this.props.editCitation(this.context.router, this.props.currentUser, data, false);

  fetchPaginated() {
    var page_num = this.props.pagination.page_number;

    if (this.props.pagination.total_pages > this.props.pagination.page_number) {
      page_num += 1;
      this.props.fetchPaginatedCitations(this.props.currentUser.id, {page: page_num, id: this.props.currentUser.id}, this.props.paginatedCitations);
    } else {
      this.props.endOfCitations();
    }
  }

  renderCitations(pagCitations) {
    if (pagCitations === undefined) {
      return null;
    }

    return pagCitations.map(citation =>
      <CitationListItem
        key={citation.data.id}
        citation={citation.data}
        isEditModalOpen={this.isEditModalOpen}
        showCitationModal={this.showCitationModal}
        handleDeleteCitation={this.handleDeleteCitation}
      />
    );
  }

  render() {
    const { isAuthenticated, isModalOpen, isEditModalOpen, currentUser } = this.props;
    const modalProps = { isAuthenticated, isModalOpen, isEditModalOpen, currentUser };
    
    console.log("IN HOME");

    return (
      <div style={{ flex: '1', overflow: 'scroll' }}>
        <Navbar currentUser={this.props.currentUser} />
        <div className="citations-list-container">
          <div className="citations-button-row">
            <div className="citations-ask-box" onClick={this.showCitationModal} >
              <div className="citations-link-div"><a href="#">Save Something New...</a></div>
            </div>
          </div>

          {isModalOpen &&
            <NewCitationForm onSubmit={this.handleNewCitationSubmit} categories={this.props.categories} {...modalProps}  />
          }

          {isEditModalOpen &&
            <EditCitationForm onSubmit={this.handleEditCitation} categories={this.props.categories} citation={this.props.editFormData} {...modalProps} />
          }

          {this.renderCitations(this.props.paginatedCitations)}

          <button className="btn btn-link" onClick={this.fetchPaginated.bind(this)}>
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
    categories: state.citations.categories,
    currentUserCitations: state.citations.currentUserCitations,
    paginatedCitations: state.citations.paginatedCitations,
    pagination: state.citations.pagination,
    reachedEnd: state.citations.reachedEnd,
    editFormData: state.modal.editFormData,
    initialValues: state.modal.initialValues,
    isModalOpen: state.modal.isModalOpen,
    isEditModalOpen: state.modal.isEditModalOpen,
  }),
  { logout, endOfCitations, fetchPaginatedCitations, fetchCitation, createCitation, deleteCitation, editCitation, showModal }
)(Home);
