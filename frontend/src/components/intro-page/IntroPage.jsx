import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import MenuList from '../menu-list/MenuList.jsx';


export class IntroPage extends React.Component {
  render () {
    return <div>
      <p>iChef</p>
      <input type='search' id='search' placeholder='search' /><br/>
      <MenuList menus={this.props.menus} />
      <Link to='/reservation'>Book Now</Link>
    </div>;
  }
}

IntroPage.propTypes = {
  menus: React.PropTypes.array,
};

const mapStateToProps = state => ({
  menus: state.menus,
});

export default connect(mapStateToProps)(IntroPage);
