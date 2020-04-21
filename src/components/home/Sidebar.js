import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  sidebar: {
  },
  reportButton: {
    minWidth: '100%',
    maxWidth: 380,
    height: '70px',
    display: 'flex',
    backgroundColor: '#04b376',
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: theme.spacing(3),
  },
  sidebarAboutBox: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[200],
  },
  sidebarSection: {
    marginTop: theme.spacing(3),
  },
}));

export default function Sidebar(props) {
  const { reportButtonText, reportButtonDesc } = props;
  const classes = useStyles();

  return (
    <Grid
      item
      className={classes.sidebar}
    >
      <center>
        <Button
          className={classes.reportButton}
          variant="contained"
        >
          {reportButtonText}
        </Button>
        <Paper elevation={0} className={classes.sidebarAboutBox}>
          <Typography>{reportButtonDesc}</Typography>
        </Paper>
      </center>
    </Grid>
  );
}

Sidebar.propTypes = {
  reportButtonText: PropTypes.string,
  reportButtonDesc: PropTypes.string,
};
