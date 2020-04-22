/* eslint-disable react/prop-types */
import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  pageNum: {
    display: 'flex',
    justifyContent: 'center',
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export function getQueryString(searchText, pageNo) {
  const searchUri = searchText ? `s=${searchText}&` : '';
  const pageUri = pageNo ? `p=${pageNo}&` : '';
  return pageUri + searchUri;
}

export function PageBar({
  totalPages,
  state: { state, setState },
  history,
}) {
  const classes = useStyles();
  // only render pagination if there are more than 1 page
  if (totalPages > 1) {
    return (
      <div className={classes.pageNum}>
        <Pagination
          shape="rounded"
          count={totalPages}
          page={state.pageNo + 1}
          onChange={(_event, newPage) => {
            // handle page change
            const newUrl = `blog?${getQueryString(state.searchText, newPage - 1)}`;
            // eslint-disable-next-line react/prop-types
            history.push(newUrl);
            setState((prevState) => ({ ...prevState, pageNo: newPage - 1 }));
          }}
        />
      </div>
    );
  }
  return null;
}
