import React from 'react';
import { reduxForm } from 'redux-form';

export const fields = [ 'searchText' ];


export class SearchBar extends React.Component {
  render () {
    const { fields: { searchText}} = this.props;
    return (
      <form className='search-bar'>
        <input
          type='search'
          placeholder='I feel like having...'
          {...searchText}
        />
      </form>
    );
  }
}

SearchBar.propTypes = {
  fields: React.PropTypes.shape({
    searchText: React.PropTypes.shape({
      value: React.PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default reduxForm({
  form: 'searchBar',
  fields,
  initialValues: { searchText: '' },
})(SearchBar);
