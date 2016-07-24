import React from 'react';


class ValidationError extends React.Component {
  render () {
    return (
      <div>
        {this.props.invalid ? this.props.error : ''}
      </div>
    );
  }
}

ValidationError.propTypes = {
  error: React.PropTypes.string.isRequired,
  invalid: React.PropTypes.bool.isRequired,
};

export default ValidationError;
