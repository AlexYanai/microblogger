// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Gravatar from 'react-gravatar';
import Navbar from '../../containers/Navbar';
import ProfileForm from '../../components/ProfileForm';
import { editBio, showEditBioForm } from '../../actions/profile';

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
        <div className="profile-container">
          <div className="profile-row">
            <div className="profile-picture-container">
              <Gravatar className="profile-picture" email={this.props.currentUser.email} size={125} />
            </div>
            
            <div className="profile-bio-container">
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
