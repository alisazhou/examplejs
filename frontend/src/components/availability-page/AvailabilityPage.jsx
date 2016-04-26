import React from 'react';
import { BaseChangePageComponent, baseConnect } from '../sticky-layout/BaseChangePageComponent.jsx';

class AvailabilityPage extends BaseChangePageComponent {
  render () {
    return (
      <div>
        <p>Choose your peeps</p>
      </div>
    );
  }
}

export default baseConnect(AvailabilityPage);
export { AvailabilityPage };
