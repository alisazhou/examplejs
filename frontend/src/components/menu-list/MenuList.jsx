import React from 'react';
import { Link } from 'react-router';


export default class MenuList extends React.Component {
  render () {
    return (
      <div>
        <Link to='/menus/0' id='menu_0' className='menu-list'>purdy pic uno</Link><br/>
        <Link to='/menus/1' id='menu_1' classname='menu-list'>purdy pic dos</Link><br/>
      </div>
    );
  }
}
