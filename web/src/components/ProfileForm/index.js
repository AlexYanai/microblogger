// @flow
import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { editBio, showEditBioForm } from '../../actions/profile';

type Props = {
  handleSubmit: () => void,
  showEditBioForm: () => void,
  currentUser: Object,
  isBioFormOpen: boolean,
  editBio: () => void,
};

class ProfileForm extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  props: Props;

  handleSubmit = data => this.props.onSubmit(data);

  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <div >
        <form onSubmit={handleSubmit(this.handleSubmit)}>
          <div className="input-group">
            <Field
              style={{marginBottom: '5px'}}
              name="bio"
              type="textarea"
              placeholder="Bio"
              component="textarea"
              className="form-control"
            />

            <button type="submit" className="btn btn-primary" style={{ float: 'right' }} disabled={submitting}>
              {submitting ? 'Saving...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

ProfileForm = reduxForm({
  form: 'editBio',
  enableReinitialize: true,
})(ProfileForm);

ProfileForm = connect(
  state => ({
    isBioFormOpen: state.profile.isBioFormOpen,
    currentUser: state.session.currentUser,
    initialValues: state.session.currentUser,
  }),
  { showEditBioForm, editBio }
)(ProfileForm);

export default ProfileForm;