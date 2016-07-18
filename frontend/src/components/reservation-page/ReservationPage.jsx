import React from 'react';
import { Link } from 'react-router';

import MenuSummary from './MenuSummary.jsx';
import ProgressBar from '../progress-bar/ProgressBar.jsx';
import ReservationForm from './ReservationForm.jsx';


class ReservationPage extends React.Component {
  handleSubmit (data) {
    console.log('SUBMITTED', data);
  }

  render () {
    return (
      <div>
        <ProgressBar/>
        <MenuSummary />
        <ReservationForm onSubmit={this.handleSubmit.bind(this)} />
        <Link to='/availability'>next</Link>
      </div>
    );
  }
}

export default ReservationPage;
