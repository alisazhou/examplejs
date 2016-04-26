import React from 'react';
import { BaseChangePageComponent, baseConnect } from '../sticky-layout/BaseChangePageComponent.jsx';

class Footer extends BaseChangePageComponent {
  render () {
    return (
      <div>
        <div>
          <a href='#' onClick={this.clickThroughTo('intro')}>Main Page </a>
        </div>
        <div>
          <a href='#' onClick={this.clickThroughTo('contact')}>Contact Us</a>
        </div>
      </div>
    );
  }
}

export default baseConnect(Footer);
export { Footer };
