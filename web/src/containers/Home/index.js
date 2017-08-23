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

  ask: {
    display: 'flex',
    backgroundColor: '#fff',
    maxWidth: '1500px',
    height: '55px',
    margin: 'auto',
    textAlign: 'left',
    alignItems: 'center',
    width: '100%',
    fontSize: '20px',
    fontWeight: '300',
    opacity: '0.9',
    boxShadow: '0 1px 0 var(--palette-gray-blue)',
    border: '1px solid var(--palette-gray-blue)',
    verticalAlign: 'middle' 
  },

  linkDiv: {
    marginLeft: '15px',

    ':hover': {
      color: 'var(--palette-med-blue)',
    },

    ':focus': {
      color: 'var(--palette-med-blue)',
    },
  }
});

type Category = {
  id: number,
  name: string,
  description: string
};

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
        <div className={`citationListContainer ${css(styles.citationListContainer)}`}>
          <div className={`buttonRow ${css(styles.buttonRow)}`}>
            <div className={`ask ${css(styles.ask)}`} onClick={this.showCitationModal} >
              <div className={`linkDiv ${css(styles.linkDiv)}`}><a href="#">Save Something New...</a></div>
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
