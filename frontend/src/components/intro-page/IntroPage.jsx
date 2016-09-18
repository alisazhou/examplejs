import React from 'react';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';

import MenuList from '../menu-list/MenuList.jsx';
import SearchBar from '../search-bar/SearchBar.jsx';
import { combineFilters } from './introPageSelector.js';
import Navbar from '../navbar/Navbar.jsx';
import HowItWorks from '../how-it-works/HowItWorks.jsx';


class IntroPage extends React.Component {
  render () {
    return (
      <div>
        <Navbar />
        <HowItWorks />
        <SearchBar />
        <MenuList menus={this.props.menus} />
      </div>
    );
  }
}

IntroPage.propTypes = {
  menus: React.PropTypes.array,
};

const mapStateToProps = state => {
  const selector = formValueSelector('searchBar');
  const { searchText, searchCuisine } = selector(state, 'searchText', 'searchCuisine');
  return { menus: combineFilters(state.menus, searchText, searchCuisine) };
};

export default connect(mapStateToProps)(IntroPage);
export { IntroPage };
