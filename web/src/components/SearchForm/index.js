// @flow
import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import MultiSelectField  from '../MultiSelectField';
import { showSearchForm } from '../../actions/citations';

type Props = {
  handleSubmit: () => void,
  onSubmit: () => void,
  showSearchForm: () => void,
  submitting: boolean,
  isSearchFormOpen: boolean,
};

class SearchForm extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  props: Props

  handleSubmit = data => this.props.onSubmit(data);
  showSearch = () => this.props.showSearchForm(this.props.isSearchFormOpen);

  dontClose(e) {
    e.stopPropagation();
  }

  render() {
    const { handleSubmit, submitting } = this.props;
    const categoryNames = this.props.categories.map(function(x) { return x.name });

    return (
      <div className="search-form">
        <button type="button" className="search-logout-button" onClick={this.showSearch}>
          <div className="search-delete">
            <span className="fa fa-times" />
          </div>
        </button>

        <form onSubmit={handleSubmit(this.handleSubmit)}>
          <div className="input-group">
            <Field
              name="categories"
              label="Category" 
              className="multiselect"
              placeholder="Select Tags..."
              component={MultiSelectField}
              data={categoryNames}/>

            <button type="submit" className="btn btn-primary btn-search-form" disabled={submitting}>
              {submitting ? 'Saving...' : 'Search'}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

SearchForm = reduxForm({
  form: 'search'
})(SearchForm);

SearchForm = connect(
  state => ({
    isSearchFormOpen: state.citations.isSearchFormOpen,
  }),
  { showSearchForm }
)(SearchForm);

export default SearchForm;