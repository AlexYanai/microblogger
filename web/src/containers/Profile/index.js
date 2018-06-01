// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Gravatar from 'react-gravatar';
import Navbar from '../../containers/Navbar';
import ProfileForm from '../../components/ProfileForm';
import { editBio, showEditBioForm, getUserInfo } from '../../actions/profile';

type Props = {
  editBio: () => void,
  showEditBioForm: () => void,
  currentUser: Object,
  profileUser: Object,
  isBioFormOpen: boolean,
  isAuthenticated: boolean
};

class Profile extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  componentDidMount() {
    if (window.location && window.location.pathname) {
      this.props.getUserInfo(this.context.router, window.location.pathname.split("/").pop());
    }
  }

  props: Props;

  handleEditBio = data => this.props.editBio(this.context.router, this.props.currentUser, data);
  isCurrentUser = ()   => this.props.currentUser.id === this.props.profileUser.id;
  showBioForm   = ()   => this.props.showEditBioForm(this.context.router, this.props.isBioFormOpen);

  render() {
    const { isAuthenticated, currentUser, isBioFormOpen } = this.props;
    const formProps = { isAuthenticated, currentUser, isBioFormOpen };

    return (
      <div style={{ flex: '1', overflow: 'scroll' }}>
        <Navbar currentUser={this.props.currentUser} />
        <div className="profile-container">
          <div className="profile-row">
            <div className="profile-picture-container">
              <Gravatar className="profile-picture" email={this.props.profileUser.email} size={125} />
            </div>
            
            <div className="profile-bio-container">
              <div style={{flex: '0 0 auto', display: 'inline-flex', width: '100%'}} >
                <h3>{this.props.profileUser.username}</h3>
                {this.props.isCurrentUser &&
                  <button className="btn btn-link" onClick={this.showBioForm}>{this.props.isBioFormOpen ? 'Close' : 'Edit'}</button>
                }
              </div>

              <div style={{ flex: 'auto', paddingLeft: '4px', width: '100%' }}>
                {!this.props.isBioFormOpen &&
                  <p>{this.props.profileUser.bio}</p>
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
    profileUser: state.profile.profileUser,
    initialValues: state.session.currentUser,
  }),
  { getUserInfo, showEditBioForm, editBio }
)(Profile);
