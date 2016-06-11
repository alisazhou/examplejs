import React from 'react';
import { Link } from 'react-router';


export default class MenuListItem extends React.Component {
  render () {
    return (
      <li>
        <Link
          id={`menu_${this.props.menu.id}`}
          to={`/menus/${this.props.menu.id}`}
          className='menu-list'>
          {this.props.menu.name}
        </Link>
      </li>
    );
  }
}

MenuListItem.propTypes = {
  menu: React.PropTypes.shape({
    id: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    chef: React.PropTypes.string.isRequired,
  }).isRequired,
};
