import React from 'react';
import { BaseChangePageComponent, baseConnect } from '../sticky-layout/BaseChangePageComponent.jsx';
import { CHOICE } from '../sticky-layout/StickyLayout.jsx';

class ReservationPage extends BaseChangePageComponent {
  render () {
    return (
      <div>
        <p>Customize your Reservation Details</p>
        Address: <input name='address'/>
        <input type='button' value='next' onClick={ this.clickThroughTo(CHOICE) }/>
      </div>
    );
  }
}

export default baseConnect(ReservationPage);
export { ReservationPage };
