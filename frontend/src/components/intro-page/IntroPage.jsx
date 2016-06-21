import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import MenuList from '../menu-list/MenuList.jsx';
import SearchBar from '../search-bar/SearchBar.jsx';


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
  menus: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      id: React.PropTypes.string.isRequired,
      name: React.PropTypes.string.isRequired,
      chef: React.PropTypes.string.isRequired,
      description: React.PropTypes.string.isRequired,
      image: React.PropTypes.string.isRequired,
      tagWords: React.PropTypes.arrayOf(
        React.PropTypes.string.isRequired
      ).isRequired,
    }).isRequired
  ).isRequired,
};

export const mapStateToProps = state => {
  let menus;
  if (state.form && state.form.searchBar) {
    menus = state.menus.filter(menu => {
      const searchText = state.form.searchBar.searchText.value.toLowerCase();
      const matchName = menu.name.toLowerCase().includes(searchText);
      const matchDescription = menu.description.toLowerCase().includes(searchText);
      return (matchName || matchDescription);
    });
    menus = menus.filter(menu => {
      const searchCuisine = state.form.searchBar.searchCuisine.value;
      return searchCuisine === 'all' || menu.tagWords.includes(searchCuisine);
    });
  } else {
    menus = state.menus;
  }
  return { menus };
};

export default connect(mapStateToProps)(IntroPage);
