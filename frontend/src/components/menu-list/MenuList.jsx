import React from 'react';
import MenuListItem from './MenuListItem.jsx';


class MenuList extends React.Component {
  render () {
    return (
      <div className='menu-list'>
        {this.props.menus.map(menu =>
          <MenuListItem key={menu.id} menu={menu}/>
        )}
      </div>
    );
  }
}

MenuList.propTypes = {
  menus: React.PropTypes.array.isRequired,
};

export default MenuList;
