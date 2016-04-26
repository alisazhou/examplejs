import React from 'react';
import { BaseChangePageComponent, baseConnect } from '../sticky-layout/BaseChangePageComponent.jsx';
import { INTRO, CONTACT } from '../sticky-layout/StickyLayout.jsx';

class Footer extends BaseChangePageComponent {
  render () {
    return (
      <div>
        <div>
          <a href='#' onClick={this.clickThroughTo(INTRO)}>Main Page </a>
        </div>
        <div>
          <a href='#' onClick={this.clickThroughTo(CONTACT)}>Contact Us</a>
        </div>
      </div>
    );
  }
}

export default baseConnect(Footer);
export { Footer };
