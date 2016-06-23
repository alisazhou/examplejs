import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import MenuList from '../menu-list/MenuList.jsx';
import SearchBar from '../search-bar/SearchBar.jsx';
import { combineFilters } from './introPageSelector.js';


export class IntroPage extends React.Component {
  render () {
    return <div>
      <p>iChef</p>
      <SearchBar />
      <MenuList menus={this.props.menus} />
      <Link to='/reservation'>Book Now</Link>
    </div>;
  }
}

IntroPage.propTypes = {
  menus: React.PropTypes.array,
};

const mapStateToProps = state => ({
  menus: combineFilters(state.menus, state.form),
});

export default connect(mapStateToProps)(IntroPage);
