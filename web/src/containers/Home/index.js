// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Category, Citation } from '../../types';
import Navbar from '../../containers/Navbar';
import { logout } from '../../actions/session';
import { showModal } from '../../actions/modal';
import { fetchCitation, createCitation, deleteCitation, editCitation } from '../../actions/citations';
import CitationListItem from '../../components/CitationListItem';
import NewCitationForm from '../../components/NewCitationForm';
import EditCitationForm from '../../components/EditCitationForm';

type Props = {
  currentUser: Object,
  currentUserCitations: Array<Citation>,
  categories: Array<Category>,
  isAuthenticated: boolean,
  isModalOpen: boolean,
  isEditModalOpen: boolean,
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

  props: Props

  handleLogout            =  ()  => this.props.logout(this.context.router);
  showCitationModal       =  ()  => this.props.showModal(this.context.router, this.props.isModalOpen);
  handleNewCitationSubmit = data => this.props.createCitation(data, this.context.router, this.props.currentUser);
  handleDeleteCitation    = data => this.props.deleteCitation(this.context.router, this.props.currentUser, data);
  handleEditCitation      = data => this.props.editCitation(this.context.router, this.props.currentUser, data, false);

  renderCitations() {
    return this.props.currentUserCitations.map(citation =>
      <CitationListItem
        key={citation.id}
        citation={citation}
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
    categories: state.citations.categories,
    currentUserCitations: state.citations.currentUserCitations,
    editFormData: state.modal.editFormData,
    initialValues: state.modal.initialValues,
    isModalOpen: state.modal.isModalOpen,
    isEditModalOpen: state.modal.isEditModalOpen,
  }),
  { logout, fetchCitation, createCitation, deleteCitation, editCitation, showModal }
)(Home);
