import React from 'react';

import LinkButton from '../link-button/LinkButton.jsx';
import MenuSummary from '../order-summary/MenuSummary.jsx';
import ReservationForm from './ReservationForm.jsx';


class ReservationPage extends React.Component {
  render () {
    return (
      <div>
        <MenuSummary />
        <ReservationForm />
        <LinkButton linkTo='/payment' content='Next' />
      </div>
    );
  }
}

export default ReservationPage;
