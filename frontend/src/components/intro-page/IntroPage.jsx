import React from 'react';
import { Link } from 'react-router';


export default class IntroPage extends React.Component {
  render () {
    return <div>
      <p>iChef</p>
      <input type='search' id='search' placeholder='search' /><br/>
      <Link to='/menus/0' id='menu_0' className='router-link'>purdy pic uno</Link><br/>
      <Link to='/menus/1' id='menu_1' classname='router-link'>purdy pic dos</Link><br/>
      <Link to='/reservation'>Book Now</Link>
    </div>;
  }
}
