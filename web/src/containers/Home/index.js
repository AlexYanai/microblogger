// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router';
import { css, StyleSheet } from 'aphrodite';
import { fetchCitations } from '../../actions/citations';
import Navbar from '../../components/Navbar';
import CitationListItem from '../../components/CitationListItem';

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
};

class Home extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  props: Props

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
    // const { currentUser, isAuthenticated, currentUserCitations } = this.props;
    console.log(this.props.currentUserCitations);
    
    return (
      <div style={{ flex: '1', overflow: 'scroll' }}>
        <Navbar />
        <div className={`citationListContainer ${css(styles.citationListContainer)}`}>
          <h3 style={{ marginBottom: '2rem', textAlign: 'center' }}>Citation</h3>
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
  }),
  { fetchCitations }
)(Home);
