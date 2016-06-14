import React from 'react';
import { connect } from 'react-redux';
import R from 'ramda';


export class MenuPage extends React.Component {
  render () {
    return (
      <div>
        <h1>{this.props.menu.name}</h1>
        <p>dummy description</p>
        <p>dummy filters</p>
      </div>
    );
  }
}

MenuPage.propTypes = {
  params: React.PropTypes.shape({
    menuId: React.PropTypes.string.isRequired,
  }),
  menu: React.PropTypes.shape({
    id: React.PropTypes.string.isRequired,
    chef: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    description: React.PropTypes.string.isRequired,
    image: React.PropTypes.string.isRequired,
    tagWords: React.PropTypes.arrayOf(
      React.PropTypes.string.isRequired
    ).isRequired,
  }),
};

const mapStateToProps = (state, ownProps) => ({
  menu: R.find(R.propEq('id', ownProps.params.menuId))(state.menus),
});
export default connect(mapStateToProps)(MenuPage);
