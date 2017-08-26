// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { css, StyleSheet } from 'aphrodite';
import Navbar from '../../containers/Navbar';
import ProfileForm from '../../components/ProfileForm';
import { editBio, showEditBioForm } from '../../actions/profile';

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
    width: '100%',
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
    width: '100%',
    justifyContent: 'center',
    paddingLeft: '10px'
  }
});

type Props = {
  editBio: () => void,
  showEditBioForm: () => void,
  currentUser: Object,
  isBioFormOpen: boolean,
  isAuthenticated: boolean
};

class Profile extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  props: Props;

  handleEditBio = data => this.props.editBio(this.context.router, this.props.currentUser, data);
  showBioForm   = ()   => this.props.showEditBioForm(this.context.router, this.props.isBioFormOpen);

  render() {
    const { isAuthenticated, currentUser, isBioFormOpen } = this.props;
    const formProps = { isAuthenticated, currentUser, isBioFormOpen };

    return (
      <div style={{ flex: '1', overflow: 'scroll' }}>
        <Navbar currentUser={this.props.currentUser} />
        <div className={`profileContainer ${css(styles.profileContainer)}`}>
          <div className={`profileRow ${css(styles.profileRow)}`}>
            <div className={`profilePictureContainer ${css(styles.profilePictureContainer)}`}>
              <img className={`profilePicture ${css(styles.profilePicture)}`} src={require("./temp_prof.jpg")} alt="Default profile" />
            </div>
            
            <div className={`bioContainer ${css(styles.bioContainer)}`}>
              <div style={{flex: '0 0 auto', display: 'inline-flex', width: '100%'}} >
                <h3>{this.props.currentUser.username}</h3>
                <button className="btn btn-link" onClick={this.showBioForm}>{this.props.isBioFormOpen ? 'Close' : 'Edit'}</button>
              </div>

              <div style={{ flex: 'auto', paddingLeft: '4px', width: '100%' }}>
                {!this.props.isBioFormOpen &&
                  <p>{this.props.currentUser.bio}</p>
                }

                {this.props.isBioFormOpen &&
                  <ProfileForm onSubmit={this.handleEditBio} showBioForm={this.showBioForm} {...formProps} />
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    isBioFormOpen: state.profile.isBioFormOpen,
    isAuthenticated: state.session.isAuthenticated,
    currentUser: state.session.currentUser,
    initialValues: state.session.currentUser,
  }),
  { showEditBioForm, editBio }
)(Profile);
