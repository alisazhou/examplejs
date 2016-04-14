import React from 'react';
import IntroPage from '../intro-page/IntroPage.jsx';
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
        </div>
        <StickyFooter/>
      </div>
    );
  }
}

export default StickyLayout;
