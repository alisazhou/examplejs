import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';

import Footer from '../footer/Footer.jsx';
import IntroPage from '../intro-page/IntroPage.jsx';

export default class StickyLayout extends React.Component {
  // pure render
  shouldComponentUpdate (nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render () {
    return (
      <div>
        <div className='sticky-layout--body'>
          <IntroPage/>
        </div>
        <div className='sticky-layout--footer'>
          <Footer/>
        </div>
      </div>
    );
  }
}
