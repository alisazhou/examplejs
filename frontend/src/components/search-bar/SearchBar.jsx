import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { renderInput, renderSelect } from '../formHelpers.js';



class SearchBar extends React.Component {
  render () {
    return (
      <div className='searchbar__background'>
        <form className='searchbar-form'>
          <div className='searchbar-form__search-field-div'>
            <Field component={renderInput}
              className='searchbar-form__search-field'
              name='searchText'
              placeholder='I feel like having...'
              type='search'
            />
          </div>
          <div className='searchbar-form__search-field-div'>
            <Field component={renderSelect}
              className='searchbar-form__search-field'
              name='searchCuisine'
              options={this.props.cuisines}
            />
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
};

const mapStateToProps = state => ({
  cuisines: state.cuisines,
});

const StoreConnectedBar = connect(mapStateToProps)(SearchBar);

export default reduxForm({
  form: 'searchBar',
})(StoreConnectedBar);

export { StoreConnectedBar, SearchBar };
