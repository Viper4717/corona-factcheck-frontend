import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import { Badge } from '@material-ui/core';
import { green, orange } from '@material-ui/core/colors';

const statusCardHeight = '30px';
const statusCardWidth = '60px';
const statusCardInsetY = '20px';
const statusCardInsetX = '50px';

const cardMediaWidth = '60%';

const useStyles = makeStyles({
  card: {
    padding: 10,
    width: '100%',
  },
  cardDetails: {
    width: '100%',
  },
  cardMedia: {
    width: cardMediaWidth,
  },
  statusCard: {
    height: statusCardHeight,
    width: statusCardWidth,
    marginRight: statusCardInsetX,
    marginTop: statusCardInsetY,
    padding: '5px',
  },
  statusText: {
    fontSize: '15px',
    fontWeight: 'bolder',
    color: 'white',
  },
});

const statusText = {
  true: 'সত্য',
  false: 'মিথ্যা',
};

export default function Post(props) {
  const classes = useStyles();
  const { post, height, maxChars } = props;

  return (
    <CardActionArea component="a" href={post.link}>
      <Badge
        badgeContent={(
          <Card
            className={classes.statusCard}
            style={{ background: post.status ? '#04b376' : orange[400] }}
          >
            <Typography
              className={classes.statusText}
              paragraph
              align="center"
            >
              {post.status ? statusText.true : statusText.false}
            </Typography>
          </Card>
        )}
        variant="standard"
        overlap="rectangle"
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        style={{
          width: '100%',
        }}
      >
        <Hidden xsDown>
          <CardMedia
            className={classes.cardMedia}
            image={post.image}
            title={post.imageTitle}
            style={{ width: post.image ? cardMediaWidth : '0' }}
          />
          <Card className={classes.card} style={{ height }}>
            <div className={classes.cardDetails}>
              <CardContent>
                <Typography variant="subtitle1" color="textSecondary" align="left">
                  {post.date}
                </Typography>
                <Typography variant="subtitle1" paragraph align="left">
                  {/* If description is larger than maxChars
                replace extra chars with ... */}
                  {post.title.length > maxChars
                    ? `${post.title.substr(0, maxChars)} ...`
                    : post.title}
                </Typography>
              </CardContent>
            </div>
          </Card>
        </Hidden>
        <Hidden smUp>
          <Card
            className={classes.card}
            style={{
              backgroundImage: `url(${post.image})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              height,
            }}
          >
            <div className={classes.cardDetails}>
              <CardContent>
                <Typography
                  variant="subtitle2"
                  align="left"
                  style={{ color: 'white', fontStyle: 'italic' }}
                >
                  {post.date}
                </Typography>
                <Typography
                  variant="subtitle1"
                  paragraph
                  align="left"
                  style={{ color: 'white' }}
                >
                  {/* If description is larger than maxChars
                replace extra chars with ... */}
                  {post.title.length > maxChars
                    ? `${post.title.substr(0, maxChars)} ...`
                    : post.title}
                </Typography>
              </CardContent>
            </div>
          </Card>
        </Hidden>
      </Badge>
    </CardActionArea>
  );
}

Post.propTypes = {
  post: PropTypes.object,
  height: PropTypes.string,
  maxChars: PropTypes.number,
};

Post.defaultProps = {
  maxChars: 100,
};
