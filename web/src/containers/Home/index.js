// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { css, StyleSheet } from 'aphrodite';
import Navbar from '../../containers/Navbar';
import { logout } from '../../actions/session';
import { showModal } from '../../actions/modal';
import { fetchCitation, createCitation, deleteCitation, editCitation } from '../../actions/citations';
import CitationListItem from '../../components/CitationListItem';
import NewCitationForm from '../../components/NewCitationForm';
import EditCitationForm from '../../components/EditCitationForm';

const styles = StyleSheet.create({
  citationListContainer: {
    maxWidth: '1500px',
    padding: '3rem 4rem',
    marginRight: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
  },

  buttonRow: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    marginLeft: '2px',
    marginBottom: '20px'
  },

  search: {
    flex: '1',
    width: '40%',
    marginLeft: '10%'
  }
});

type Citation = {
  id: number,
  title: string,
  source: string,
  quote: string,
  user_id: number
};

type Props = {
  currentUser: Object,
  currentUserCitations: Array<Citation>,
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
  handleEditCitation      = data => this.props.editCitation(this.context.router, this.props.currentUser, data);

  renderCitations() {
    const currentUserCitationIds = [];
    this.props.currentUserCitations.map(citation => currentUserCitationIds.push(citation.id));

    return this.props.currentUserCitations.map(citation =>
      <CitationListItem
        key={citation.id}
        citation={citation}
        isEditModalOpen={this.isEditModalOpen}
        showCitationModal={this.showCitationModal}
        handleDeleteCitation={this.handleDeleteCitation}
        currentUserCitationIds={currentUserCitationIds}
      />
    );
  }

  render() {
    const { isAuthenticated, isModalOpen, isEditModalOpen } = this.props;
    const authProps = { isAuthenticated, isModalOpen, isEditModalOpen };

    return (
      <div style={{ flex: '1', overflow: 'scroll' }}>
        <Navbar />
        <div className={`citationListContainer ${css(styles.citationListContainer)}`}>
          <h3 style={{ marginBottom: '2rem', textAlign: 'center' }}>Home</h3>

          <div className={`buttonRow ${css(styles.buttonRow)}`}>
            <button className="btn btn-primary" onClick={this.showCitationModal} >
              New Citation
            </button>
          </div>

          {isModalOpen &&
            <NewCitationForm onSubmit={this.handleNewCitationSubmit} {...authProps}  />
          }

          {isEditModalOpen &&
            <EditCitationForm onSubmit={this.handleEditCitation} citation={this.props.editFormData} {...authProps} />
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
    currentUserCitations: state.citations.currentUserCitations,
    editFormData: state.modal.editFormData,
    initialValues: state.modal.initialValues,
    isModalOpen: state.modal.isModalOpen,
    isEditModalOpen: state.modal.isEditModalOpen,
  }),
  { logout, fetchCitation, createCitation, deleteCitation, editCitation, showModal }
)(Home);
