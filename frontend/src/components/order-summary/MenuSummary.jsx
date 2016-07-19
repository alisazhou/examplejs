import React from 'react';
import { connect } from 'react-redux';
import R from 'ramda';


class MenuSummary extends React.Component {
  render () {
    return (
      <div className='menu_summary'>
        <p>{`Menu: ${this.props.menuName}`}</p>
        <p>{`Number of guests: ${this.props.partySize}`}</p>
        <p>{`Time: ${this.props.dateTime}`}</p>
      </div>
    );
  }
}

MenuSummary.propTypes = {
  dateTime: React.PropTypes.string.isRequired,
  menuName: React.PropTypes.string.isRequired,
  partySize: React.PropTypes.string.isRequired,
};

const mapStateToProps = state => {
  const { dateTime, menuId, partySize } = state.order;
  const menu = R.find(R.propEq('id', menuId))(state.menus);
  return { dateTime, menuName: menu.name, partySize };
};

export default connect(mapStateToProps)(MenuSummary);
export { MenuSummary };
