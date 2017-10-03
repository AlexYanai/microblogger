// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Navbar from '../../containers/Navbar';
import { Citation } from '../../types';
import { logout } from '../../actions/session';
import { showEditModal } from '../../actions/modal';
import { fetchPaginatedCitations, createCitation, deleteCitation, editCitation } from '../../actions/citations';
import CitationListItem from '../../components/CitationListItem';
import EditCitationForm from '../../components/EditCitationForm';

type Props = {
  currentUser: Object,
  currentCitations: Array<Citation>,
  paginatedCitations: Array<Citation>,
  isAuthenticated: boolean,
  isModalOpen: boolean,
  isEditModalOpen: boolean,
  deleteCitation: () => void,
  editCitation: () => void,
  showModal: () => void,
  editFormData: Citation
};

class Favorites extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  componentDidMount() {
    if (this.props.isAuthenticated) {
      const params = {
        id: this.props.currentUser.id,
        route: 'favorites',
        page: 1
      }

      this.props.fetchPaginatedCitations(params);
    }
  }

  props: Props

  handleLogout         =  ()  => this.props.logout(this.context.router);
  showCitationModal    =  ()  => this.props.showModal(this.props.isModalOpen);
  handleDeleteCitation = data => this.props.deleteCitation(this.context.router, this.props.currentUser, data);
  handleEditCitation   = data => this.props.editCitation(this.context.router, this.props.currentUser, data, true);

  renderCitations(pagCitations) {
    if (pagCitations === undefined || pagCitations.length === []) {
      return null;
    }

    return pagCitations.map(citation =>
      <CitationListItem
        key={citation.data.id}
        citation={citation.data}
        currentUser={this.props.currentUser}
        isEditModalOpen={this.isEditModalOpen}
        showCitationModal={this.showCitationModal}
        handleDeleteCitation={this.handleDeleteCitation}
      />
    );
  }

  render() {
    const { isAuthenticated, isModalOpen, isEditModalOpen, currentUser } = this.props;
    const modalProps = { isAuthenticated, isModalOpen, isEditModalOpen, currentUser };

    return (
      <div style={{ flex: '1', overflow: 'scroll' }}>
        <Navbar currentUser={this.props.currentUser} />
        <div className="citations-list-container">
          <div className="citations-button-row">
            <h3 style={{ margin: 'auto' }}>Favorites</h3>
          </div>

          {isEditModalOpen &&
            <EditCitationForm 
              onSubmit={this.handleEditCitation} 
              categories={this.props.categories} 
              citation={this.props.editFormData} {...modalProps} />
          }

          {this.renderCitations(this.props.paginatedCitations)}
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    isAuthenticated: state.session.isAuthenticated,
    currentUser: state.session.currentUser,
    currentCitations: state.citations.currentCitations,
    paginatedCitations: state.citations.paginatedCitations,
    categories: state.citations.categories,
    editFormData: state.modal.editFormData,
    initialValues: state.modal.initialValues,
    isModalOpen: state.modal.isModalOpen,
    isEditModalOpen: state.modal.isEditModalOpen,
  }),
  { logout, fetchPaginatedCitations, createCitation, deleteCitation, editCitation, showEditModal }
)(Favorites);
