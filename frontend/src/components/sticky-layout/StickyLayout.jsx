import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import { connect } from 'react-redux';

import IntroPage from '../intro-page/IntroPage.jsx';
import ContactPage from '../contact-page/ContactPage.jsx';
import ReservationPage from '../reservation-page/ReservationPage.jsx';
import AvailabilityPage from '../availability-page/AvailabilityPage.jsx';
import Footer from '../footer/Footer.jsx';


// other files that need to click through to pages will  import these constants
// to make sure that there are no mispellings etc
const INTRO = 'intro-y';
const CONTACT = 'contact-y';
const BOOK = 'book-y';
const CHOICE = 'choice-y';

const pageMapping = new Map([
  [ INTRO, IntroPage ],
  [ CONTACT, ContactPage ],
  [ BOOK, ReservationPage ],
  [ CHOICE, AvailabilityPage ],
]);


class StickyLayout extends React.Component {
  // pure render
  shouldComponentUpdate (nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render () {
    const CurrentPage = pageMapping.get(this.props.currentPage);
    return (
      <div>
        <div className='sticky-layout--body'>
          <CurrentPage/>
        </div>
        <div className='sticky-layout--footer'>
          <Footer/>
        </div>
      </div>
    );
  }
}

StickyLayout.propTypes = {
  currentPage: React.PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  currentPage: state.currentPage,
});
const mapDispatchToProps = () => ({});
export default connect(mapStateToProps, mapDispatchToProps)(StickyLayout);
export { pageMapping, StickyLayout, INTRO, CONTACT, BOOK, CHOICE };
