import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { showModal, showEditModal } from '../../actions/modal';
import { favorite, unfavorite } from '../../actions/favorites';
import { deleteCitation, editCitation } from '../../actions/citations';
import { Citation } from '../../types';
import Gravatar from 'react-gravatar';

type Props = {
  citation: Citation,
  dateOptions: Object,
  editFormData: Object,
  handleDeleteCitation: () => void,
  showEditCitationModal: () => void,
  favoriteCitation: () => void,
  isEditModalOpen: boolean,
};

class CitationListItem extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  props: Props;

  showEditCitationModal =  ()  => this.props.showEditModal(this.props.isEditModalOpen, this.props.citation);
  handleDeleteCitation  = data => this.props.deleteCitation(this.context.router, this.props.citation.user_id, this.props.citation.id, this.props.pagCitations);
  handleEditCitation    = data => this.props.editCitation(this.context.router, this.props.currentUser, data);
  formatDateString      = data => (new Date(this.props.citation.inserted_at)).toLocaleDateString('en-US', data);

  favoriteCitation() {
    if (this.props.citation.is_favorite) {
      this.props.unfavorite(this.context.router, this.props.citation, this.props.pagCitations);
    } else {
      this.props.favorite(this.context.router, this.props.citation, this.props.pagCitations);
    }
  }

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
          <div className="citation-list-item-author">
            <Gravatar className="citation-list-item-author-picture" email={this.props.citation.email} size={30} />
            <div className="citation-list-item-author-name">
              <p style={{margin: 'auto'}}>{this.props.citation.username}</p>
            </div>
          </div>
          
          <div className="citation-list-item-link">
            <h3><a href="#">{this.props.citation.title}</a></h3>
          </div>
          
          <div className="citation-list-item-buttons">
            <button type="button" className="btn btn-link" onClick={this.favoriteCitation.bind(this)}>
              <div className={this.props.citation.is_favorite ? "citation-list-item-fave" : "citation-list-item-not-fave"}>
                <span className="fa fa-heart" />
              </div>
            </button>

            {this.ownedByCurrentUser() &&
              <div style={{display: 'inline-flex'}}>
                <button type="button" className="btn btn-link" onClick={this.showEditCitationModal}>
                  <div className="citation-list-item-edit">
                    <span className="fa fa-pencil" />
                  </div>
                </button>
                
                <button type="button" className="citation-list-item-logout-button" onClick={this.handleDeleteCitation}>
                  <div className="citation-list-item-delete">
                    <span className="fa fa-times" />
                  </div>
                </button>
              </div>
            }
          </div>
        </div>

        <div className="citation-list-item-source">{this.props.citation.source}</div>
        <hr style={{ borderTop: '1px solid var(--palette-gray-blue)', width: '50%' }} />
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
  { favorite, unfavorite, deleteCitation, editCitation, showModal, showEditModal }
)(CitationListItem);
