import React from 'react';
import StickyBody from './sticky-body.jsx';
import StickyFooter from './sticky-footer.jsx';

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
          <StickyBody
            visible={this.state.currentPage === 'intro'}/>
        </div>
        <StickyFooter/>
      </div>
    );
  }
}

export default StickyLayout;
