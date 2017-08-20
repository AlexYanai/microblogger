// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { css, StyleSheet } from 'aphrodite';
import Navbar from '../../containers/Navbar';

const styles = StyleSheet.create({
  profileContainer: {
    maxWidth: '1000px',
    padding: '4rem 4rem',
    marginRight: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
  },

  profileRow: {
    maxWidth: '1000px',
    display: 'inline-flex',
    margin: 'auto',
  },

  profilePictureContainer: {
    height: '150px',
    maxHeight: '150px',
  },

  profilePicture: {
    height: '150px',
    width: '150px',
    border: '1px #f2f2f2 solid',
    borderRadius: '50%',
  },

  bioContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    justifyContent: 'center',
    paddingLeft: '10px'
  }
});

type Props = {
  currentUser: Object,
  isAuthenticated: boolean
};

class Profile extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  props: Props;

  render() {
    return (
      <div style={{ flex: '1', overflow: 'scroll' }}>
        <Navbar currentUser={this.props.currentUser} />
        <div className={`profileContainer ${css(styles.profileContainer)}`}>
          <div className={`profileRow ${css(styles.profileRow)}`}>
            <div className={`profilePictureContainer ${css(styles.profilePictureContainer)}`}>
              <img className={`profilePicture ${css(styles.profilePicture)}`} src={require("./temp_prof.jpg")} alt="Default profile" />
            </div>
            
            <div className={`bioContainer ${css(styles.bioContainer)}`}>
              <h3>{this.props.currentUser.username}</h3>
              <p>{this.props.currentUser.bio}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    isAuthenticated: state.session.isAuthenticated,
    currentUser: state.session.currentUser
  }),
  { }
)(Profile);
