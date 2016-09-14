import React from 'react';
import R from 'ramda';
import { reduxForm } from 'redux-form';

const fields = [ 'searchText', 'searchCuisine' ];


class SearchBar extends React.Component {
  generateOptionsJsx () {
    const optionsList = R.map(
      cuisine => (<option key={cuisine.id} value={cuisine.name}>
                    {cuisine.name}
                  </option>),
      this.props.cuisines
    );
    const allOption = (<option value='all'>All Cuisines</option>);
    return R.append(allOption, optionsList);
  }

  render () {
    const { fields: { searchText, searchCuisine }} = this.props;
    return (
      <div className='searchbar__background'>
        <form className='searchbar-form'>
          <div className='searchbar-form__search-field-div'>
            <input
              type='search'
              placeholder='I feel like having...'
              className='searchbar-form__search-field'
              {...searchText}
            />
          </div>
          <div className='searchbar-form__search-field-div'>
            <select
              className='searchbar-form__search-field'
              {...searchCuisine}
              value={searchCuisine.value||''}
            >
              { this.generateOptionsJsx() }
            </select>
          </div>
        </form>
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
