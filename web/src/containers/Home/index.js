// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { css, StyleSheet } from 'aphrodite';
import Navbar from '../../components/Navbar';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/session';
import { fetchCitations } from '../../actions/citations';
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

// class Home extends Component {
//   static contextTypes = {
//     router: PropTypes.object,
//   }

//   props: Props

  // renderCitations() {
  //   const currentUserCitationIds = [];
  //   this.props.currentUserCitations.map(citation => currentUserCitationIds.push(citation.id));

  //   return this.props.currentUserCitations.map(citation =>
  //     <CitationListItem
  //       key={citation.id}
  //       citation={citation}
  //       currentUserCitationIds={currentUserCitationIds}
  //     />
  //   );
  // }

//   render() {
//     // const { currentUser, isAuthenticated, currentUserCitations } = this.props;
//     console.log(this.props.currentUserCitations);

//     return (
//       <div style={{ flex: '1', overflow: 'scroll' }}>
//         <Navbar />
//         <div className={`citationListContainer ${css(styles.citationListContainer)}`}>
//           <h3 style={{ marginBottom: '2rem', textAlign: 'center' }}>Citation</h3>
//           {this.renderCitations()}
//         </div>
//       </div>
//     );
//   }
// }

// export default connect(
//   state => ({
//     isAuthenticated: state.session.isAuthenticated,
//     currentUser: state.session.currentUser,
//     currentUserCitations: state.citations.currentUserCitations,
//   }),
//   { fetchCitations }
// )(Home);

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

  handleLogout = () => this.props.logout(this.context.router);


  render() {
    const { currentUser, isAuthenticated } = this.props;

    return (
      <div style={{ flex: '1', overflow: 'scroll' }}>
        <Navbar />
        <div className={`citationListContainer ${css(styles.citationListContainer)}`}>
          <h3 style={{ marginBottom: '2rem', textAlign: 'center' }}>Home</h3>
          {this.renderCitations()}

          <ul>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
          </ul>

          {isAuthenticated &&
            <div>
              <span>{currentUser.username}</span>
              <button type="button" onClick={this.handleLogout}>Logout</button>
            </div>
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
  { logout }
)(Home);
