import React from 'react';
import { connect } from 'react-redux';

import AuthBlock from './AuthBlock.jsx';
import ProfileButton from './ProfileButton.jsx';


class Navbar extends React.Component {
  render () {
    return (
      <div className='navbar'>
        <div className='navbar-buttons'>
          <div className='navbar-buttons__home-div'>
            <button className='navbar-buttons__home-btn' type='button'>iChef</button>
          </div>
          <div className='navbar-buttons__title-div'/>
          { this.props.isAuthenticated ? <ProfileButton /> : <AuthBlock /> }
        </div>
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
