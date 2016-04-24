import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import { connect } from 'react-redux';

import IntroPage from '../intro-page/IntroPage.jsx';
import ContactPage from '../contact-page/ContactPage.jsx';
import ReservationPage from '../reservation-page/ReservationPage.jsx';
import Footer from '../footer/Footer.jsx';

const pageMapping = {
  'intro': IntroPage,
  'contact': ContactPage,
  'book': ReservationPage,
};

class StickyLayout extends React.Component {
  // pure render
  shouldComponentUpdate (nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render () {
    const CurrentPage = pageMapping[this.props.currentPage];
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

function mapStateToProps (state) {
  return { currentPage: state.currentPage };
}
const mapDispatchToProps = () => {return {};};
export default connect(mapStateToProps, mapDispatchToProps)(StickyLayout);
export { pageMapping, StickyLayout };
