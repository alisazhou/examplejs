import React from 'react';

import LinkButton from '../link-button/LinkButton.jsx';
import MenuSummary from '../order-summary/MenuSummary.jsx';
import ProgressBar from '../progress-bar/ProgressBar.jsx';
import ReservationForm from './ReservationForm.jsx';


class ReservationPage extends React.Component {
  render () {
    return (
      <div>
        <ProgressBar/>
        <MenuSummary />
        <ReservationForm />
        <LinkButton linkTo='/payment' content='Next' />
      </div>
    );
  }
}

export default ReservationPage;
