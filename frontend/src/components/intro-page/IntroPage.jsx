import React from 'react';

import wrapPage from '../page-wrapper/PageWrapper.jsx';


class IntroPage extends React.Component {
  render () {
    return <div>
      <p>Welcome</p>
    </div>;
  }
}

export default wrapPage(IntroPage);
