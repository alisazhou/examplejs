import React from 'react';
import Select from 'react-select';


export default class SearchBar extends React.Component {
  render () {
    const options = [
      {value: '0', label: 'Demo Menu 0'},
      {value: '1', label: 'Demo Menu 1'},
    ];
    return (
      <div className='search-bar'>
        <Select
          options={options}
          placeholder='Search menu'
        />
      </div>
    );
  }
}
