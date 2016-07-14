import React from 'react';


class MenuSummary extends React.Component {
  render () {
    const { partySize, dateTime } = this.props.formData;
    return (
      <div>
        <p>{`Number of guests: ${partySize.value}`}</p>
        <p>{`Time: ${dateTime.value}`}</p>
      </div>
    );
  }
}

MenuSummary.propTypes = {
  formData: React.PropTypes.shape({
    partySize: React.PropTypes.shape({
      value: React.PropTypes.string.isRequired,
    }).isRequired,
    dateTime: React.PropTypes.shape({
      value: React.PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default MenuSummary;
