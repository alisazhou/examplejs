import React from 'react';
import { Link } from 'react-router';


class MenuListItem extends React.Component {
  render() {
    return (
      <div className='menu-list__item-div'>
        <div className='menu-list__item-border'>
          <Link
            id={`menu_${this.props.menu.id}`}
            to={`/menus/${this.props.menu.id}/`}
          >
            <img src={this.props.menu.image} alt='Menu image'/>
            <div className='menu-list__item-name-and-price-div'>
              <div className='clearfix mb1'>
                <h4 className='left overflow-hidden m0'>{this.props.menu.name}</h4>
                <h4 className='right m0'>{`$${this.props.menu.price}`}</h4>
              </div>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

MenuListItem.propTypes = {
  menu: React.PropTypes.shape({
    id: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    image: React.PropTypes.string.isRequired,
    price: React.PropTypes.string.isRequired,
  }).isRequired,
};

export default MenuListItem;
