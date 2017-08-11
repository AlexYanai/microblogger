// @flow
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { css, StyleSheet } from 'aphrodite';
import Navbar from '../../containers/Navbar';
import { logout } from '../../actions/session';
import { fetchCitation, createCitation } from '../../actions/citations';
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
  createCitation: () => void,
  cit: Citation
};

class Home extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  props: Props

  handleLogout = () => this.props.logout(this.context.router);

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
    const { isAuthenticated } = this.props;
    const authProps = { isAuthenticated };

    return (
      <div style={{ flex: '1', overflow: 'scroll' }}>
          <Navbar />
          <div className={`citationListContainer ${css(styles.citationListContainer)}`}>
            <h3 style={{ marginBottom: '2rem', textAlign: 'center' }}>Home</h3>
            <NewCitationForm onSubmit={this.handleNewCitationSubmit} {...authProps}  />
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
  }),
  { logout, fetchCitation, createCitation }
)(Home);
