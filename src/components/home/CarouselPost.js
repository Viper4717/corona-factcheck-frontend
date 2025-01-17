import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  mainFeaturedPost: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  mainFeaturedPostContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
}));

export default function CarouselPost(props) {
  const classes = useStyles();
  const {
    post, height,
    maxTitleChars, maxDescChars,
  } = props;

  return (
    <Link href={post.link} underline="none">
      <Paper
        className={classes.mainFeaturedPost}
        style={{
          backgroundImage: `url(${post.image})`,
          height,
        }}
      >
        {/* Increase the priority of the hero background image */}
        <img style={{ display: 'none' }} src={post.image} alt={post.imageText} />
        <div className={classes.overlay} />
        <Grid container>
          <Grid item md={6}>
            <div className={classes.mainFeaturedPostContent}>
              <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                {post.title.length > maxTitleChars
                  ? `${post.title.substr(0, maxTitleChars)}...`
                  : post.title}
              </Typography>
              <Typography variant="h5" color="inherit" paragraph>
                {post.description.length > maxDescChars
                  ? `${post.description.substr(0, maxDescChars)} ...`
                  : post.description}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </Link>
  );
}

CarouselPost.propTypes = {
  post: PropTypes.object,
  height: PropTypes.string,
  maxTitleChars: PropTypes.number,
  maxDescChars: PropTypes.number,
};

CarouselPost.defaultProps = {
  maxTitleChars: 100,
  maxDescChars: 170,
};
