import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import './Article.css';
import Axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Markdown from 'react-markdown/with-html';
import { SnakeGame } from 'react-game-snake';
import { serverUrl, processImageLink } from '../../util';
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

function Article({ match }) {
  const classes = useStyles();
  const [data, setData] = useState({
    title: '',
    date: '',
    image: '',
    article: '',
    loaded: false,
  });
  const clickThreshold = 5;
  const [clickCount, setClickCount] = useState(0);

  const { articleId } = match.params;

  useEffect(() => {
    Axios({
      method: 'GET',
      url: `${serverUrl}/posts/${articleId}`,
    }).then((response) => {
      const x = response.data;
      setData({
        title: x.title,
        image: processImageLink(
          x.image.formats
            ? (x.image.formats.medium && x.image.formats.medium.url)
            || (x.image.formats.small && x.image.formats.small.url)
            || (x.image.formats.thumbnail && x.image.formats.thumbnail.url)
            : x.image.url,
        ),
        date: new Date(x.created_at).toDateString(),
        article: x.article,
        loaded: true,
      });
    }).catch((error) => {
      console.error(error);
      console.log('failed to load article');
      setData({
        title: 'Article Not Found',
        loaded: false,
      });
    });
  }, [articleId]);

  if (clickCount < 0) {
    return (
      <div className="tribute" style={{ padding: '20px' }}>
        <center>
          <a href="https://github.com/SaminYaser/" style={{ textDecoration: 'none' }}>
            <Typography variant="h3" color="textSecondary">
              Creativo
            </Typography>
          </a>
          <br />
          <a href="https://github.com/hoenchioma/" style={{ textDecoration: 'none' }}>
            <Typography variant="h3" color="textSecondary">
              hoenchioma
            </Typography>
          </a>
          <br />
          <a href="https://github.com/Viper4717/" style={{ textDecoration: 'none' }}>
            <Typography variant="h3" color="textSecondary">
              Viper4717
            </Typography>
          </a>
        </center>
      </div>
    );
  } if (clickCount >= clickThreshold) {
    return (
      <center style={{ paddingTop: '50px' }}>
        <SnakeGame
          colors={{
            field: '#bdc3c7',
            food: '#9b59b6',
            snake: '#3498db',
          }}
          countOfHorizontalFields={20}
          countOfVerticalFields={20}
          fieldSize={20}
          loopTime={150}
          pauseAllowed
          onLoose={(context) => {
            setClickCount((prevCount) => {
              if (prevCount >= 0) {
                // eslint-disable-next-line no-alert
                alert(`You lost with ${context.game.points} points.`);
              }
              return -1;
            });
          }}
          onWin={(context) => {
            setClickCount((prevCount) => {
              if (prevCount >= 0) {
                // eslint-disable-next-line no-alert
                alert(`You lost with ${context.game.points} points.`);
              }
              return -1;
            });
          }}
        />
      </center>
    );
  }
  return (
    <div className="article">
      <Container maxWidth="lg">
        <Paper
          className={classes.articleHeading}
          style={{ backgroundImage: `url(${data.image})` }}
          onClick={() => {
            if (!data.loaded) {
              setClickCount((prevCount) => prevCount + 1);
            }
          }}
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
