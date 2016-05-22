import React from 'react';
import { BaseChangePageComponent, baseConnect } from '../sticky-layout/BaseChangePageComponent.jsx';
import { BOOK } from '../sticky-layout/pageMapping.js';


class IntroPage extends BaseChangePageComponent {
  render () {
    return <div>
      <p>Welcome</p>
      <button onClick={this.clickThroughTo(BOOK)}>Book Now</button>
    </div>;
  }
}

export default baseConnect(IntroPage);
export { IntroPage };
