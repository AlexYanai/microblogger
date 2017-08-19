// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Navbar from '../../containers/Navbar';
import { fetchCitation } from '../../actions/citations';

type Props = {
  currentUser: Object,
  isAuthenticated: boolean,
  citation: {
    id: number,
    title: string,
    source: string,
    quote: string,
    user_id: number
  }
};

class Citation extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  componentDidMount() {
    const userId     = this.props.match.params.id;
    const citationId = this.props.match.params.citation_id;

    if (userId && citationId) {
      this.props.fetchCitation(userId, citationId);
    }
  }

  props: Props;

  render() {
    const userId     = this.props.match.params.id;
    const citationId = this.props.match.params.citation_id;

    return (
      <div style={{ flex: '1' }}>
        <Navbar />
        <h2>Citation</h2>
        <span>{userId}</span><br/>
        <span>{citationId}</span>
      </div>
    );
  }
}

export default connect(
  state => ({
    // isAuthenticated: state.session.isAuthenticated,
    // currentUser: state.session.currentUser,
    citation: state.citations.citation
  }),
  { fetchCitation }
)(Citation);
