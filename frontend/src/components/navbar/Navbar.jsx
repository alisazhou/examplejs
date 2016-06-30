import React from 'react';
import { connect } from 'react-redux';

import AuthBlock from './AuthBlock.jsx';
import ProfileButton from './ProfileButton.jsx';


class Navbar extends React.Component {
  render () {
    return (
      <div className='navbar'>
      { this.props.isAuthenticated ? <ProfileButton /> : <AuthBlock /> }
      </div>
    );
  }
}

Navbar.propTypes = {
  isAuthenticated: React.PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Navbar);
export { Navbar };
