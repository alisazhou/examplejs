import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import { connect } from 'react-redux';


import { pageMapping } from './pageMapping.js';
import Footer from '../footer/Footer.jsx';

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
export default connect(mapStateToProps, null)(StickyLayout);
export { pageMapping, StickyLayout };
