import React from 'react';


class MenuDescription extends React.Component {
  render () {
    return (
      <div className='menudescription-div'>
        <div className='menudescription-div__div'>
          <img src={this.props.menu.image} alt='menu image'/>
          <div className='menudescription-text__div'>
            <h3 className='menudescription-text__left'>{this.props.menu.name}</h3>
            <h3 className='menudescription-text__right'>{this.props.menu.price}</h3>
          </div>
          <h3>{this.props.menu.chef}</h3>
          <p>{this.props.menu.description}</p>
        </div>
      </div>
    );
  }
}

MenuDescription.propTypes = {
  menu: React.PropTypes.shape({
    id: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    image: React.PropTypes.string.isRequired,
    price: React.PropTypes.string.isRequired,
    chef: React.PropTypes.string.isRequired,
    description: React.PropTypes.string.isRequired,
  }).isRequired,
};

export default MenuDescription;
