import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';

const useStyles = makeStyles({
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
});

export default function Post(props) {
  const classes = useStyles();
  const { post, height, maxChars } = props;

  return (
    <CardActionArea component="a" href={post.link}>
      <Card className={classes.card} style={{ height }}>
        <div className={classes.cardDetails}>
          <CardContent>
            <Typography component="h2" variant="h5">
              {post.title}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {post.date}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {post.description.length > maxChars
                ? `${post.description.substr(0, maxChars)} ...`
                : post.description}
            </Typography>
          </CardContent>
        </div>
        <Hidden xsDown>
          <CardMedia
            className={classes.cardMedia}
            image={post.image}
            title={post.imageTitle}
          />
        </Hidden>
      </Card>
    </CardActionArea>
  );
}

Post.propTypes = {
  post: PropTypes.object,
  height: PropTypes.string,
  maxChars: PropTypes.number,
};

Post.defaultProps = {
  maxChars: 90,
};
