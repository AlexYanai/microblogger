// @flow
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { css, StyleSheet } from 'aphrodite';
import Navbar from '../../containers/Navbar';
import { logout } from '../../actions/session';
import { showModal } from '../../actions/modal';
import { fetchCitation, createCitation, deleteCitation } from '../../actions/citations';
import CitationListItem from '../../components/CitationListItem';
import NewCitationForm from '../../components/NewCitationForm';

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
  createCitation: () => void,
  deleteCitation: () => void,
  showModal: () => void,
  cit: Citation
};

class Home extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  props: Props

  handleLogout            = ()    => this.props.logout(this.context.router);
  showCitationModal       = ()    => this.props.showModal(this.context.router, this.props.isModalOpen);
  handleNewCitationSubmit = data => this.props.createCitation(data, this.context.router, this.props.currentUser);
  handleDeleteCitation    = (data) => this.props.deleteCitation(this.context.router, this.props.currentUser, data);

  renderCitations() {
    const currentUserCitationIds = [];
    this.props.currentUserCitations.map(citation => currentUserCitationIds.push(citation.id));

    return this.props.currentUserCitations.map(citation =>
      <CitationListItem
        key={citation.id}
        citation={citation}
        handleDeleteCitation={this.handleDeleteCitation}
        currentUserCitationIds={currentUserCitationIds}
      />
    );
  }

  render() {
    const { isAuthenticated, isModalOpen } = this.props;
    const authProps = { isAuthenticated, isModalOpen };

    console.log("IN HOME");
    console.log("isModalOpen");
    console.log(this.props.isModalOpen);

    return (
      <div style={{ flex: '1', overflow: 'scroll' }}>
          <Navbar />
          <div className={`citationListContainer ${css(styles.citationListContainer)}`}>
            <h3 style={{ marginBottom: '2rem', textAlign: 'center' }}>Home</h3>

            <div className={`buttonRow ${css(styles.buttonRow)}`}>
              <button className="btn btn-primary" onClick={this.showCitationModal} >
                New Citation
              </button>
              
              <div className="search">
                <input type="search" className="form-control" placeholder='Search..'/>
              </div>
            </div>

            {isModalOpen &&
              <NewCitationForm onSubmit={this.handleNewCitationSubmit} {...authProps}  />
            }

            {this.renderCitations()}

            {!isAuthenticated && 
              <ul>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/signup">Signup</Link></li>
              </ul>
            }
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
    isModalOpen: state.modal.isModalOpen,
  }),
  { logout, fetchCitation, createCitation, deleteCitation, showModal }
)(Home);
