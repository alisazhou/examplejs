import React from 'react';
import { connect } from 'react-redux';
import R from 'ramda';

import { goToPageActionCreator } from '../sticky-layout/goToPageAction.js';

class Footer extends React.Component {
  clickThroughTo (targetPage) {
    return e => {
      e.preventDefault();  // don't append # at end of url
      this.props.changePage(targetPage);
    };
  }
  render () {
    return (
      <div>
        <div>
          <a href='#' onClick={this.clickThroughTo('intro')}>Main Page </a>
        </div>
        <div>
          <a href='#' onClick={this.clickThroughTo('contact')}>Contact Us</a>
        </div>
      </div>
    );
  }
}

Footer.propTypes = {
  changePage: React.PropTypes.func.isRequired,
};

const mapStateToProps = () => {return {};};

const mapDispatchToProps = dispatch => ({
  changePage: R.pipe(goToPageActionCreator, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
export { Footer };
