/* eslint-disable react/prop-types */
import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  PageBar: {
    display: 'flex',
    justifyContent: 'center',
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function PageBar({
  totalPages,
  pageNo,
  onPageChange,
}) {
  const classes = useStyles();
  // only render pagination if there are more than 1 page
  if (totalPages > 1) {
    return (
      <div className={classes.PageBar}>
        <Pagination
          shape="rounded"
          count={totalPages}
          page={pageNo + 1}
          onChange={
            (_event, newPageNo) => onPageChange(newPageNo)
          }
        />
      </div>
    );
  }
  return null;
}
