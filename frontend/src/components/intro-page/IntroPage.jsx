import React from 'react';
import { Link } from 'react-router';

import { BaseChangePageComponent, baseConnect } from '../sticky-layout/BaseChangePageComponent.jsx';
import { BOOK } from '../sticky-layout/pageMapping.js';


class IntroPage extends BaseChangePageComponent {
  render () {
    return <div>
      <p>iChef</p>
      <input type='search' id='search' placeholder='search' />
      <Link to='/' className='router-link'>purdy pic uno</Link>&nbsp;
      <Link to='/' className='router-link'>purdy pic dos</Link>
      <button onClick={this.clickThroughTo(BOOK)}>Book Now</button>
    </div>;
  }
}

export default baseConnect(IntroPage);
export { IntroPage };
