import React from 'react';
import { Link } from 'react-router';


class Footer extends React.Component {
  render () {
    return (
      <div>
        <Link to='/'>Main Page</Link>
        <Link to='/contact/'>Contact Us</Link>
      </div>
    );
  }
}

export default Footer;
