import React from 'react';
import { BaseChangePageComponent, baseConnect } from '../sticky-layout/BaseChangePageComponent.jsx';

class ReservationPage extends BaseChangePageComponent {
  render () {
    return (
      <div>
        <p>Customize your Reservation Details</p>
        Address: <input name='address'/>
        <input type='button' value='next' onClick={ this.clickThroughTo('choice') }/>
      </div>
    );
  }
}

export default baseConnect(ReservationPage);
export { ReservationPage };
