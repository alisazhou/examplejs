import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Select from 'react-select';


export class SearchBar extends React.Component {
  render () {
    const goToMenu = (menu) => {
      browserHistory.push(`/menus/${menu.value}`);
    };
    return (
      <div className='search-bar'>
        <Select
          options={this.props.menus}
          placeholder='Search menu'
          onChange={goToMenu}
        />
      </div>
    );
  }
}

SearchBar.propTypes = {
  menus: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      value: React.PropTypes.string.isRequired,
      label: React.PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

const mapStateToProps = state => ({
  menus: state.menus.map(menu => ({
    value: menu.id, label: menu.name,
  })),
});
export default connect(mapStateToProps)(SearchBar);
