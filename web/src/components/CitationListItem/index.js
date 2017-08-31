import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { showModal, showEditModal } from '../../actions/modal';
import { deleteCitation, editCitation } from '../../actions/citations';

type Props = {
  citation: Object,
  dateOptions: Object,
  editFormData: Object,
  handleDeleteCitation: () => void,
  showEditCitationModal: () => void,
  isEditModalOpen: boolean,
};

class CitationListItem extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  props: Props;

  showEditCitationModal =  ()  => this.props.showEditModal(this.props.isEditModalOpen, this.props.citation);
  handleDeleteCitation  = data => this.props.deleteCitation(this.context.router, this.props.citation.user_id, this.props.citation.id);
  handleEditCitation    = data => this.props.editCitation(this.context.router, this.props.currentUser, data);
  formatDateString      = data => (new Date(this.props.citation.inserted_at)).toLocaleDateString('en-US', data);

  ownedByCurrentUser() {
    return this.props.citation.user_id === this.props.currentUser.id;
  }

  render() {
    const dateOptions = { 
      weekday: 'long', 
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    };

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
                <div className="citation-list-item-badge citation-list-item-edit">
                  <span className="fa fa-pencil" />
                </div>
              </button>
              
              <button type="button" className="citation-list-item-logout-button" onClick={this.handleDeleteCitation}>
                <div className="citation-list-item-badge citation-list-item-delete">
                  <span className="fa fa-times" />
                </div>
              </button>
            </div>
          }
          
          {!this.ownedByCurrentUser() &&
            <div className="citation-list-item-buttons">
            </div>
          }
        </div>

        <div className="citation-list-item-source">{this.props.citation.source}</div>
        <hr style={{ borderTop: '1px solid var(--palette-gray-blue)', width: '50%',  }} />
        <div className="citation-list-item-quote">{this.props.citation.quote}</div>
        <div className="citation-list-item-date">{this.formatDateString(dateOptions)}</div>
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
)(CitationListItem);
