import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import './Article.css';
import Axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Markdown from 'react-markdown/with-html';
import { serverUrl } from '../../util';
import 'typeface-roboto';

const useStyles = makeStyles((theme) => ({
  articleHeading: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    height: '350px',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  articleContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(1),
    },
  },
}));

const errorImage = 'https://media.istockphoto.com/vectors/vector-realistic-isolated-404-not-found-error-lettering-with-glitch-vector-id990584628';

function Article(props) {
  const classes = useStyles();
  const [data, setData] = useState({
    title: '',
    date: '',
    image: '',
    article: '',
  });
  const { articleId } = props.match.params;

  useEffect(() => {
    Axios({
      method: 'GET',
      url: `${serverUrl}/posts/${articleId}`,
    }).then((response) => {
      const x = response.data;
      setData({
        title: x.title,
        image: `${serverUrl}${x.image.formats ? x.image.formats.medium.url : x.image.url}`,
        date: new Date(x.created_at).toDateString(),
        article: x.article,
      });
    }).catch((error) => {
      console.log(error);
      setData({
        title: 'Article Not Found',
        image: errorImage,
      });
    });
  }, []);

  console.log(data.image);
  return (
    <div className="article">
      <Container maxWidth="lg">
        <Paper
          className={classes.articleHeading}
          style={{ backgroundImage: `url(${data.image})` }}
        />
        <div className={classes.articleContent}>
          <Typography
            component="h1"
            variant="h3"
            color="inherit"
            gutterBottom
          >
            {data.title}
          </Typography>
          <Typography
            component="subtitle1"
            variant="h5"
            color="textSecondary"
          >
            {data.date}
          </Typography>
          <div style={{ fontFamily: 'Roboto' }}>
            <Markdown
              source={data.article}
              escapeHtml={false}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Article;
