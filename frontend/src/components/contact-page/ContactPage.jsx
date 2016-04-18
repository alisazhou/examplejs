import React from 'react';

class ContactPage extends React.Component {
  render () {
    return (
      <div>
        <p>Contact Us: +852 12345678</p>
      </div>
    );
  }
}
ContactPage.propTypes = {
  visible: React.PropTypes.bool,
};

export default ContactPage;
