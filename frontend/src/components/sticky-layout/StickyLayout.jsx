import React from 'react';
import IntroPage from '../intro-page/IntroPage.jsx';
import ContactPage from '../contact-page/ContactPage.jsx';
import StickyFooter from './StickyFooter.jsx';

/*
const pages = {
  intro: introPage,
  contact: contactPage,
};
*/

class StickyLayout extends React.Component {
  constructor (props) {
    super(props);
    this.state = {currentPage: 'intro'};
  }

  render () {
    return (
      <div>
        <div className='sticky-layout--body'>
          <IntroPage
            visible={this.state.currentPage === 'intro'}/>
          <ContactPage
            visible={this.state.currentPage === 'contact'}/>
        </div>
        <StickyFooter/>
      </div>
    );
  }
}

export default StickyLayout;
