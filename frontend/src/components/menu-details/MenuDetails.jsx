import React from 'react';


class MenuDetails extends React.Component {
  render () {
    return (
      <div>Demo Menu {this.props.params.menuId}</div>
    );
  }
}

MenuDetails.propTypes = {
  params: React.PropTypes.shape({
    menuId: React.PropTypes.number.isRequired,
  }),
};

export default MenuDetails;
