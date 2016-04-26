import React from 'react';
import { connect } from 'react-redux';
import R from 'ramda';
import { goToPageActionCreator } from '../sticky-layout/goToPageAction.js';

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

const mapStateToProps = () => {return {};};
const mapDispatchToProps = dispatch => ({
  changePage: R.pipe(goToPageActionCreator, dispatch),
});

const baseConnect = connect(mapStateToProps, mapDispatchToProps);

export { BaseChangePageComponent, baseConnect };
