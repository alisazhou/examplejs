import React from 'react';


class MenuDescription extends React.Component {
  render() {
    return (
      <div>
        <h3>{this.props.menu.chef}</h3>
        <p>{this.props.menu.description}</p>
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
