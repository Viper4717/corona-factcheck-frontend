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

const useStyles = makeStyles({
  card: {
    padding: 20,
  },
  cardDetails: {
    width: 250,
  },
  cardMedia: {
    width: 130,
  },
  statusCard: {
    height: statusCardHeight,
    width: statusCardWidth,
    marginRight: statusCardWidth,
    marginTop: statusCardHeight,
    padding: '5px',
  },
  statusText: {
    fontSize: '15px',
    fontWeight: 'bolder',
    color: 'white',
  },
});

export default function FeaturedPost(props) {
  const classes = useStyles();
  const { post, height, maxChars } = props;

  return (
    <CardActionArea component="a" href={post.link}>
      <Badge
        badgeContent={(
          <Card
            className={classes.statusCard}
            style={{ background: post.status ? green[500] : orange[400] }}
          >
            <Typography className={classes.statusText} paragraph>
              {post.statusText}
            </Typography>
          </Card>
        )}
        variant="standard"
        overlap="rectangle"
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
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
        <Hidden xsDown>
          <CardMedia
            className={classes.cardMedia}
            image={post.image}
            title={post.imageTitle}
          />
        </Hidden>
      </Badge>
    </CardActionArea>
  );
}

FeaturedPost.propTypes = {
  post: PropTypes.object,
  height: PropTypes.string,
  maxChars: PropTypes.number,
};

FeaturedPost.defaultProps = {
  maxChars: 80,
};
