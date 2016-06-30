import React from 'react';

import AuthBlock from './AuthBlock.jsx';


class Navbar extends React.Component {
  render () {
    return (
      <div className='navbar'>
        <AuthBlock />
      </div>
    );
  }
}

export default Navbar;
