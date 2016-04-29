import React from 'react';
import R from 'ramda';

import { baseConnect, BaseChangePageComponent } from '../sticky-layout/BaseChangePageComponent.jsx';

class NextButton extends BaseChangePageComponent {
  render () {
    return <input type='button' value='next' onClick={ this.clickThroughTo(this.props.toPage) }/>;
  }
}

NextButton.propTypes = R.merge(
  BaseChangePageComponent.propTypes,
  {toPage: React.PropTypes.string.isRequired}
);

export default baseConnect(NextButton);
export { NextButton };
