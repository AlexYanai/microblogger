// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Navbar from '../../containers/Navbar';
import { Citation } from '../../types';
import { logout } from '../../actions/session';
import { showEditModal } from '../../actions/modal';
import { fetchCitations, createCitation, deleteCitation, editCitation } from '../../actions/citations';
import PublicCitationListItem from '../../components/PublicCitationListItem';
import EditCitationForm from '../../components/EditCitationForm';

type Props = {
  currentUser: Object,
  currentCitations: Array<Citation>,
  isAuthenticated: boolean,
  isModalOpen: boolean,
  isEditModalOpen: boolean,
  deleteCitation: () => void,
  editCitation: () => void,
  showModal: () => void,
  editFormData: Citation
};

class Citations extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.fetchCitations();
    }
  }

  props: Props

  handleLogout         =  ()  => this.props.logout(this.context.router);
  showCitationModal    =  ()  => this.props.showModal(this.context.router, this.props.isModalOpen);
  handleDeleteCitation = data => this.props.deleteCitation(this.context.router, this.props.currentUser, data);
  handleEditCitation   = data => this.props.editCitation(this.context.router, this.props.currentUser, data, true);

  renderCitations() {
    return this.props.currentCitations.map(citation =>
      <PublicCitationListItem
        key={citation.id}
        citation={citation}
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
            <h3 style={{ margin: 'auto' }}>All</h3>
          </div>

          {isEditModalOpen &&
            <EditCitationForm 
              onSubmit={this.handleEditCitation} 
              categories={this.props.categories} 
              citation={this.props.editFormData} {...modalProps} />
          }

          {this.renderCitations()}
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
    categories: state.citations.categories,
    editFormData: state.modal.editFormData,
    initialValues: state.modal.initialValues,
    isModalOpen: state.modal.isModalOpen,
    isEditModalOpen: state.modal.isEditModalOpen,
  }),
  { logout, fetchCitations, createCitation, deleteCitation, editCitation, showEditModal }
)(Citations);
