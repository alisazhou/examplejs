import React from 'react';
import { reduxForm } from 'redux-form';

export const fields = [ 'searchText', 'searchCuisine' ];


export class SearchBar extends React.Component {
  render () {
    const { fields: { searchText, searchCuisine }} = this.props;
    return (
      <form className='search-bar'>
        <input
          type='search'
          placeholder='I feel like having...'
          {...searchText}
        />
        <select
          {...searchCuisine}
          value={searchCuisine.value||''}>
          <option value='all'>All</option>
          <option value='American'>American</option>
          <option value='Chinese'>Chinese</option>
          <option value='French'>French</option>
          <option value='Indian'>Indian</option>
        </select>
      </form>
    );
  }
}

SearchBar.propTypes = {
  fields: React.PropTypes.shape({
    searchCuisine: React.PropTypes.shape({
      value: React.PropTypes.string.isRequired,
    }).isRequired,
    searchText: React.PropTypes.shape({
      value: React.PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default reduxForm({
  form: 'searchBar',
  fields,
  initialValues: { searchText: '', searchCuisine: 'all' },
})(SearchBar);
