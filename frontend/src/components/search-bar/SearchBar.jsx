import React from 'react';
import R from 'ramda';
import { reduxForm } from 'redux-form';

import { updateOrderActionCreator } from '../../actions/orderActions.js';


const fields = [ 'searchDate', 'searchText', 'searchCuisine' ];


class SearchBar extends React.Component {
  generateOptionsJsx () {
    const optionsList = R.map(
      cuisine => (<option key={cuisine.id} value={cuisine.name}>
                    {cuisine.name}
                  </option>),
      this.props.cuisines
    );
    const allOption = (<option value='all' key='all'>All Cuisines</option>);
    return R.append(allOption, optionsList);
  }

  render () {
    const { fields: { searchDate, searchText, searchCuisine }} = this.props;
    return (
      <div className='searchbar__background'>
        <form className='searchbar-form'>
          <div className='searchbar-form__search-field-div'>
            <input
              type='date'
              className='searchbar-form__search-field'
              {...searchDate}
              onBlur={e => this.props.updateOrderDate({dateTime: e.target.value})}
            />
          </div>
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
    searchDate: React.PropTypes.shape({
      value: React.PropTypes.string.isRequired,
    }).isRequired,
    searchCuisine: React.PropTypes.shape({
      value: React.PropTypes.string.isRequired,
    }).isRequired,
    searchText: React.PropTypes.shape({
      value: React.PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  updateOrderDate: React.PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  cuisines: state.cuisines,
});

const mapDispatchToProps = dispatch => ({
  updateOrderDate: R.compose(dispatch, updateOrderActionCreator),
});

export default reduxForm({
  form: 'searchBar',
  fields,
  destroyOnUnmount: false,
  initialValues: { searchText: '', searchCuisine: 'all' },
}, mapStateToProps, mapDispatchToProps)(SearchBar);
export { fields, SearchBar };
