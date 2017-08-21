// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { css, StyleSheet } from 'aphrodite';
import Navbar from '../../containers/Navbar';
import { logout } from '../../actions/session';
import { showEditModal } from '../../actions/modal';
import { fetchCitations, createCitation, deleteCitation, editCitation } from '../../actions/citations';
import PublicCitationListItem from '../../components/PublicCitationListItem';
import NewCitationForm from '../../components/NewCitationForm';
import EditCitationForm from '../../components/EditCitationForm';

const styles = StyleSheet.create({
  citationListContainer: {
    maxWidth: '1000px',
    padding: '4rem 4rem',
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
  is_public: boolean,
  user_id: number
};

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
    this.props.fetchCitations();
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
        <div className={`citationListContainer ${css(styles.citationListContainer)}`}>
          <div className={`buttonRow ${css(styles.buttonRow)}`}>
            <h3 style={{ margin: 'auto' }}>All</h3>
          </div>

          {isEditModalOpen &&
            <EditCitationForm onSubmit={this.handleEditCitation} citation={this.props.editFormData} {...modalProps} />
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
    editFormData: state.modal.editFormData,
    initialValues: state.modal.initialValues,
    isModalOpen: state.modal.isModalOpen,
    isEditModalOpen: state.modal.isEditModalOpen,
  }),
  { logout, fetchCitations, createCitation, deleteCitation, editCitation, showEditModal }
)(Citations);