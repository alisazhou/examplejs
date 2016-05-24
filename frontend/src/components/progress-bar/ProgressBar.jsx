import React from 'react';
import R from 'ramda';

import { BOOK, CHOICE, CONFIRM } from '../sticky-layout/pageMapping.js';
import ProgressBarPart from './ProgressBarPart.jsx';


class ProgressBar extends React.Component {
  render () {
    // somehow this needs to be inside render function
    // otherwise progressStages = [undefined, undefined, undefined]
    // if declared at module level (maybe some weird browserify thing)
    const progressStages = [ BOOK, CHOICE, CONFIRM ];
    return (
      <div>
        { R.map(
          stage => {
            return <ProgressBarPart key={stage} page={stage}/>;
          },
          progressStages
        )}
      </div>
    );
  }
}

export default ProgressBar;
