import React, { Component, PropTypes } from 'react';
import { css, StyleSheet } from 'aphrodite';
import { connect } from 'react-redux';
import { showModal, showEditModal } from '../../actions/modal';
import { deleteCitation, editCitation } from '../../actions/citations';

const styles = StyleSheet.create({
  link: {
    color: 'var(--palette-med-gray)',
    fontSize: '22px',
    fontWeight: 'bold',
    width: '45%',
    textAlign: 'center',
    ':hover': {
      textDecoration: 'none',
    },

    ':focus': {
      textDecoration: 'none',
    },
  },

  card: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '1500px',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },

  left: {
    width: '25%',
  },

  buttons: {
    width: '25%',
    textAlign: 'right',
    padding: '0',
    background: 'transparent',
    border: '0',
    cursor: 'pointer',
  },

  logoutButton: {
    background: 'transparent',
    border: '0',
    cursor: 'pointer',
  },

  badge: {
    justifyContent: 'center',
    color: 'var(--palette-med-gray)',
    background: 'rgba(255,255,255,.2)',
    borderRadius: '5px',
  }
});

type Props = {
  citation: Object,
  editFormData: Object,
  handleDeleteCitation: () => void,
  showEditCitationModal: () => void,
  isEditModalOpen: boolean,
};

class PublicCitationListItem extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  props: Props;

  showEditCitationModal =  ()  => this.props.showEditModal(this.context.router, this.props.isEditModalOpen, this.props.citation);
  handleDeleteCitation  = data => this.props.deleteCitation(this.context.router, this.props.citation.user_id, this.props.citation.id);
  handleEditCitation    = data => this.props.editCitation(this.context.router, this.props.currentUser, data);

  ownedByCurrentUser() {
    return this.props.citation.user_id === this.props.currentUser.id;
  }

  render() {
    return (
      <div key={this.props.citation.id} className={`card ${css(styles.card)}`}>
        <div className={`buttonRow ${css(styles.buttonRow)}`} >
          <div className={`left ${css(styles.left)}`}></div>
          
          <div className={css(styles.link)}>
            <h2><a href="#">{this.props.citation.title}</a></h2>
          </div>
          
          {this.ownedByCurrentUser() &&
            <div className={css(styles.buttons)}>
              <button type="button" className={css(styles.logoutButton)} onClick={this.showEditCitationModal}>
                <div className={css(styles.badge)}>
                  <span className="fa fa-pencil" />
                </div>
              </button>
              
              <button type="button" className={css(styles.logoutButton)} onClick={this.handleDeleteCitation}>
                <div className={css(styles.badge)}>
                  <span className="fa fa-trash" />
                </div>
              </button>
            </div>
          }
          
          {!this.ownedByCurrentUser() &&
            <div className={css(styles.buttons)}>
            </div>
          }
        </div>

        <span>{this.props.citation.source}</span>
        <span>{this.props.citation.quote}</span>
      </div>
    )
  }
}

export default connect(
  state => ({
    isEditModalOpen: state.modal.isEditModalOpen,
    editFormData: state.modal.editFormData,
    initialValues: state.modal.initialValues,
  }),
  { deleteCitation, editCitation, showModal, showEditModal }
)(PublicCitationListItem);
