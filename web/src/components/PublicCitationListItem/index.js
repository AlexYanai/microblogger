import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { showModal, showEditModal } from '../../actions/modal';
import { deleteCitation, editCitation } from '../../actions/citations';

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
      <div key={this.props.citation.id} className="citation-list-item-card">
        <div className="button-row">
          <div style={{width: '25%'}}></div>
          
          <div className="citation-list-item-link">
            <h2><a href="#">{this.props.citation.title}</a></h2>
          </div>
          
          {this.ownedByCurrentUser() &&
            <div className="citation-list-item-buttons">
              <button type="button" className="btn btn-link" onClick={this.showEditCitationModal}>
                <div className="citation-list-item-badge">
                  <span className="fa fa-pencil" />
                </div>
              </button>
              
              <button type="button" className="citation-list-item-logout-button" onClick={this.handleDeleteCitation}>
                <div className="citation-list-item-badge">
                  <span className="fa fa-trash" />
                </div>
              </button>
            </div>
          }
          
          {!this.ownedByCurrentUser() &&
            <div className="citation-list-item-buttons">
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
