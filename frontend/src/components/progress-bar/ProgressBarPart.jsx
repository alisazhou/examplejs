import React from 'react';
import R from 'ramda';

import { baseConnect, BaseChangePageComponent } from '../sticky-layout/BaseChangePageComponent.jsx';

class ProgressBarPart extends BaseChangePageComponent {
  render () {
    return (
      <div
        className='progressBar--part'
        onClick={ this.clickThroughTo(this.props.page) }
      >
        { this.props.page }
      </div>
    );
  }
}

ProgressBarPart.propTypes = R.merge(
  BaseChangePageComponent.propTypes,
  { page: React.PropTypes.string.isRequired }
);


export default baseConnect(ProgressBarPart);
export { ProgressBarPart };
