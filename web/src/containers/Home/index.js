// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router';
import { css, StyleSheet } from 'aphrodite';
import { fetchUserCitations } from '../../actions/citations';
import Navbar from '../../components/Navbar';
import CitationListItem from '../../components/CitationListItem';

const styles = StyleSheet.create({
  card: {
    maxWidth: '500px',
    padding: '3rem 4rem',
    margin: '2rem auto',
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

  componentDidMount() {
    this.props.fetchUserCitations(1);
    console.log(this.props.currentUserCitations);
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
    console.log(this.renderCitations());
    
    return (
      <div style={{ flex: '1' }}>
        <Navbar />
        <div className={`card ${css(styles.card)}`}>
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
  { fetchUserCitations }
)(Home);
