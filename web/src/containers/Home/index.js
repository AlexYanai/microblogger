// @flow
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { css, StyleSheet } from 'aphrodite';
import Navbar from '../../containers/Navbar';
import { logout } from '../../actions/session';
import { showModal } from '../../actions/modal';
import { fetchCitation, createCitation } from '../../actions/citations';
import CitationListItem from '../../components/CitationListItem';
import NewCitationForm from '../../components/NewCitationForm';
import ModalRoot from '../../components/ModalRoot';

const styles = StyleSheet.create({
  citationListContainer: {
    maxWidth: '1500px',
    padding: '3rem 4rem',
    marginRight: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
  },
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
  showModal: () => void,
  cit: Citation
};

class Home extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  componentDidMount() {
    // this.props = { isModalOpen: false };
  }

  props: Props

  handleLogout = () => this.props.logout(this.context.router);
  
  showCitationModal = () => this.props.showModal(this.context.router, this.props.isModalOpen);

  handleNewCitationSubmit = data => this.props.createCitation(data, this.context.router, this.props.currentUser);

  renderCitations() {
    const currentUserCitationIds = [];
    this.props.currentUserCitations.map(citation => currentUserCitationIds.push(citation.id));

    return this.props.currentUserCitations.map(citation =>
      <CitationListItem
        key={citation.id}
        citation={citation}
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

            <button className="btn btn-primary" onClick={this.showCitationModal} >
              New Citation
            </button>

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
  { logout, fetchCitation, createCitation, showModal }
)(Home);
