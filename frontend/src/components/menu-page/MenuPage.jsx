import React from 'react';


class MenuPage extends React.Component {
  render () {
    return (
      <div>Demo Menu {this.props.params.menuId}</div>
    );
  }
}

MenuPage.propTypes = {
  params: React.PropTypes.shape({
    menuId: React.PropTypes.number.isRequired,
  }),
};

export default MenuPage;
