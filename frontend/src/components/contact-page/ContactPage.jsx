import React from 'react';

class ContactPage extends React.Component {
  render () {
    return (
      <div className={ this.props.visible ? '' : 'hidden' }>
        <p>Contact Us: +852 12345678</p>
      </div>
    );
  }
}
ContactPage.propTypes = {
  visible: React.PropTypes.bool,
};
ContactPage.defaultProps = {
  visible: true,
};

export default ContactPage;
