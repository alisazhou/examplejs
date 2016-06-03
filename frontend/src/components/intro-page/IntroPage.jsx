import React from 'react';
import { Link } from 'react-router';

import { BaseChangePageComponent, baseConnect } from '../sticky-layout/BaseChangePageComponent.jsx';
import { BOOK } from '../sticky-layout/pageMapping.js';


class IntroPage extends BaseChangePageComponent {
  render () {
    return <div>
      <p>iChef</p>
      <input type='search' id='search' placeholder='search' /><br/>
      <Link to='/menus/0' id='menu_0' className='router-link'>purdy pic uno</Link><br/>
      <Link to='/menus/1' id='menu_1' classname='router-link'>purdy pic dos</Link><br/>
      <button onClick={this.clickThroughTo(BOOK)}>Book Now</button>
    </div>;
  }
}

export default baseConnect(IntroPage);
export { IntroPage };
