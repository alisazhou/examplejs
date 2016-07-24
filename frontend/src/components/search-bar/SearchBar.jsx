import React from 'react';
import { reduxForm } from 'redux-form';

const fields = [ 'searchText', 'searchCuisine' ];


class SearchBar extends React.Component {
  render () {
    const { fields: { searchText, searchCuisine }} = this.props;
    return (
      <div className='clearfix pt2 pl1 search-bg'>
        <div className='max-lg mx-auto'>
          <form className='search-bar'>
            <div className='col col-12 md-col-4 pr1 pb2 mx-auto'>
              <input
                type='search'
                placeholder='I feel like having...'
                className='col col-12 field'
                {...searchText}
              />
            </div>
            <div className='col col-12 md-col-4 pr1 pb2 mx-auto'>
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
            </div>
          </form>
        </div>
      </div>
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
