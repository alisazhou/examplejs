import React from 'react';
import IntroPage from '../intro-page/IntroPage.jsx';
import ContactPage from '../contact-page/ContactPage.jsx';
import Footer from '../footer/Footer.jsx';

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

  changePageFunctor (page) {
    function changePage () {
      this.setState({currentPage: page});
    }
    return changePage.bind(this);
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
        <div className='sticky-layout--footer'>
          <Footer changeToContactPage={this.changePageFunctor('contact')}/>
        </div>
      </div>
    );
  }
}

export default StickyLayout;
