import React from 'react';
import { reduxForm } from 'redux-form';

const fields = [ 'searchText', 'searchCuisine' ];


class SearchBar extends React.Component {
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
          {this.props.cuisines.map(cuisine =>
            <option key={cuisine.id} value={cuisine.name}>
              {cuisine.name}
            </option>
          )}
        </select>
      </form>
    );
  }
}

SearchBar.propTypes = {
  cuisines: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      name: React.PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  fields: React.PropTypes.shape({
    searchCuisine: React.PropTypes.shape({
      value: React.PropTypes.string.isRequired,
    }).isRequired,
    searchText: React.PropTypes.shape({
      value: React.PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  cuisines: state.cuisines,
});

export default reduxForm({
  form: 'searchBar',
  fields,
  initialValues: { searchText: '', searchCuisine: 'all' },
}, mapStateToProps)(SearchBar);
export { fields, SearchBar };
