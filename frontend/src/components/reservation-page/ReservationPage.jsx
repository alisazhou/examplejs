import React from 'react';

import NextButton from '../next-button/NextButton.jsx';
import ReservationForm from './ReservationForm.jsx';
import { CHOICE } from '../sticky-layout/pageMapping.js';


class ReservationPage extends React.Component {
  handleSubmit (data) {
    console.log('SUBMITTED', data);
  }
  
  render () {
    return (
      <div>
        <ReservationForm onSubmit={this.handleSubmit.bind(this)} />
        <NextButton toPage={CHOICE}/>
      </div>
    );
  }
}

export default ReservationPage;
