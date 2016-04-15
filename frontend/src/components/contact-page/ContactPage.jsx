import React from 'react';

import wrapPage from '../page-wrapper/PageWrapper.jsx';

class ContactPage extends React.Component {
  render () {
    return (
      <p>Contact Us: +852 12345678</p>
    );
  }
}
ContactPage.propTypes = {
  visible: React.PropTypes.bool,
};
ContactPage.defaultProps = {
  visible: true,
};

export default wrapPage(ContactPage);
