/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';

export default function SearchBar({
  initialSearchText,
  onSearch,
}) {
  const [searchBarText, setSearchBarText] = useState(initialSearchText);
  return (
    <div
      className="searchBox"
      style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '20px',
      }}
    >
      <SearchIcon style={{ marginTop: '3px' }} />
      <TextField
        id="full-width-text-field"
        fullWidth
        autoFocus
        style={{ marginLeft: '10px', maxWidth: '400px' }}
        placeholder="খুঁজুন"
        value={searchBarText}
        onChange={(event) => setSearchBarText(event.target.value)}
        onKeyPress={(event) => {
          if (event.key === 'Enter') {
            onSearch(searchBarText);
            event.preventDefault();
          }
        }}
      />
    </div>
  );
}
