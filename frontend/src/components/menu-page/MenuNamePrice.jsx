import React from 'react';


class MenuNamePrice extends React.Component {
  render () {
    return (
      <div className='menudescription-text__div'>
        <h3 className='menudescription-text__left'>{this.props.menu.name}</h3>
        <h3 className='menudescription-text__right'>{this.props.menu.price}</h3>
      </div>
    );
  }
}

MenuNamePrice.propTypes = {
  menu: React.PropTypes.shape({
    id: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    image: React.PropTypes.string.isRequired,
    price: React.PropTypes.string.isRequired,
    chef: React.PropTypes.string.isRequired,
    description: React.PropTypes.string.isRequired,
  }).isRequired,
};

export default MenuNamePrice;
