import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import './Article.css';
import Axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { serverUrl } from '../../util';

const useStyles = makeStyles((theme) => ({
  mainFeaturedPost: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    height: '300px',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  mainFeaturedPostContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(1),
    },
  },
}));

function Article() {
  const classes = useStyles();
  const [data, setState] = useState({
    title: '',
    image: '',
    article: '',
  });

  useEffect(() => {
    Axios({
      method: 'GET',
      url: `${serverUrl}/article`,
    }).then((x) => {
      setState({
        title: x.data.title,
        image: x.data.img,
        article: x.data.article,
      });
    });
  }, []);

  return (
    <div className="article">
      <Container maxWidth="lg">
        <Paper className={classes.mainFeaturedPost} />
        <div className={classes.mainFeaturedPostContent}>
          <Typography component="h1" variant="h3" color="inherit" gutterBottom>
            {data.title}
          </Typography>
          <Typography variant="body1" color="inherit" gutterBottom>
            {data.article}
          </Typography>
        </div>
      </Container>
    </div>
  );
}

export default Article;
