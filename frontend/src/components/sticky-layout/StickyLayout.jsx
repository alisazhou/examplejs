import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';

import Footer from '../footer/Footer.jsx';


class StickyLayout extends React.Component {
  // pure render
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <div>
        <div className='sticky-layout--body'>
          { this.props.children || 'Loading...' }
        </div>
        <div className='sticky-layout--footer'>
          <Footer/>
        </div>
      </div>
    );
  }
}

StickyLayout.propTypes = {
  children: React.PropTypes.node,
};

export default StickyLayout;
