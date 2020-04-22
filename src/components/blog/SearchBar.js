/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import { getQueryString } from './PageBar';

export default function SearchBar({
  searchTextProp,
  state: { state, setState },
  history,
}) {
  const [searchBarText, setSearchBarText] = useState(searchTextProp);
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
            // handle search
            const newUrl = `blog?${getQueryString(encodeURI(searchBarText), 0)}`;
            // eslint-disable-next-line react/prop-types
            history.push(newUrl);
            setState({ searchText: searchBarText, pageNo: 0 });
            event.preventDefault();
          }
        }}
      />
    </div>
  );
}
