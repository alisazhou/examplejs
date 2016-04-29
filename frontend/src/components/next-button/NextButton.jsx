import React from 'react';

import { baseConnect, BaseChangePageComponent } from '../sticky-layout/BaseChangePageComponent.jsx';

class NextButton extends BaseChangePageComponent {
  render () { return <input type='button'/>; }
}

export default baseConnect(NextButton);
export { NextButton };
