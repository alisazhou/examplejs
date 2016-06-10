import React from 'react';
import { Link } from 'react-router';

import MenuList from '../menu-list/MenuList.jsx';


export default class IntroPage extends React.Component {
  render () {
    return <div>
      <p>iChef</p>
      <input type='search' id='search' placeholder='search' /><br/>
      <MenuList />
      <Link to='/reservation'>Book Now</Link>
    </div>;
  }
}
