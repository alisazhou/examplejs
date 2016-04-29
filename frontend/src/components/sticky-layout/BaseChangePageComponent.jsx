import React from 'react';
import { connect } from 'react-redux';
import R from 'ramda';
import { goToPageActionCreator } from '../sticky-layout/goToPageAction.js';

// dumb component
class BaseChangePageComponent extends React.Component {
  clickThroughTo (targetPage) {
    return e => {
      e.preventDefault();  // don't append # at end of url
      this.props.changePage(targetPage);
    };
  }
}

BaseChangePageComponent.propTypes = {
  changePage: React.PropTypes.func.isRequired,
};


// smart redux stuff
const baseMapStateToProps = null;
const baseMapDispatchToProps = dispatch => ({
  changePage: R.pipe(goToPageActionCreator, dispatch),
});

const baseConnect = connect(baseMapStateToProps, baseMapDispatchToProps);

export {
  BaseChangePageComponent, baseConnect,
  baseMapStateToProps, baseMapDispatchToProps,
};
