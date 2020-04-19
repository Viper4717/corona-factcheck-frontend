import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Carousel from 'react-material-ui-carousel';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Sidebar from './Sidebar';

const carouselHeight = '25rem';
const cardHeight = '12rem';

const useStyles = makeStyles((theme) => ({
  Blog: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  Carousel: {
    marginBottom: theme.spacing(3),
  },
}));

const mainFeaturedPosts = [
  {
    id: 0,
    title: 'Top post 1',
    date: 'Nov 10',
    description:
      "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
    image: 'https://source.unsplash.com/random',
    imgText: 'main image description',
    link: 'https://google.com',
  },
  {
    id: 1,
    title: 'Top post 2',
    date: 'Nov 12',
    description:
      "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
    image: 'https://source.unsplash.com/random',
    imageText: 'Image Text',
    link: 'https://google.com',
  },
  {
    id: 2,
    title: 'Top post 3',
    date: 'Nov 11',
    description:
      "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
    image: 'https://source.unsplash.com/random',
    imageText: 'Image Text',
    link: 'https://google.com',
  },
];

const featuredPosts = [
  {
    id: 0,
    title: 'Post 1',
    date: 'Nov 10',
    description:
      "Multiple lines of text that form the lede's",
    image: 'https://source.unsplash.com/random',
    imgText: 'main image description',
    link: 'https://google.com',
    status: true,
    statusText: 'সত্য',
  },
  {
    id: 1,
    title: 'Post 2',
    date: 'Nov 12',
    description:
      "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
    image: 'https://source.unsplash.com/random',
    imageText: 'Image Text',
    link: 'https://google.com',
    status: false,
    statusText: 'মিথ্যা',
  },
  {
    id: 2,
    title: 'Post 3',
    date: 'Nov 11',
    description:
      "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
    image: 'https://source.unsplash.com/random',
    imageText: 'Image Text',
    link: 'https://google.com',
    status: true,
    statusText: 'সত্য',
  },
  {
    id: 3,
    title: 'Post 4',
    date: 'Nov 11',
    description:
      "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
    image: 'https://source.unsplash.com/random',
    imageText: 'Image Text',
    link: 'https://google.com',
    status: true,
    statusText: 'সত্য',
  },
  {
    id: 4,
    title: 'Post 5',
    date: 'Nov 11',
    description:
      "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
    image: 'https://source.unsplash.com/random',
    imageText: 'Image Text',
    link: 'https://google.com',
    status: false,
    statusText: 'মিথ্যা',
  },
  {
    id: 5,
    title: 'Post 6',
    date: 'Nov 11',
    description:
      "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
    image: 'https://source.unsplash.com/random',
    imageText: 'Image Text',
    link: 'https://google.com',
    status: true,
    statusText: 'সত্য',
  },
  {
    id: 6,
    title: 'Post 7',
    date: 'Nov 11',
    description:
      "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
    image: 'https://source.unsplash.com/random',
    imageText: 'Image Text',
    link: 'https://google.com',
    status: true,
    statusText: 'সত্য',
  },
  {
    id: 7,
    title: 'Post 8',
    date: 'Nov 11',
    description:
      "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
    image: 'https://source.unsplash.com/random',
    imageText: 'Image Text',
    link: 'https://google.com',
    status: true,
    statusText: 'সত্য',
  },
];

const sidebar = {
  title: 'About',
  description:
    'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
  social: [
    { name: 'GitHub', icon: GitHubIcon, link: 'http://github.com/' },
    { name: 'Twitter', icon: TwitterIcon, link: 'https://twitter.com' },
    { name: 'Facebook', icon: FacebookIcon, link: 'https://www.facebook.com/' },
  ],
};

export default function Blog() {
  const classes = useStyles();

  return (
    <div className={classes.Blog}>
      <CssBaseline />
      <Container maxWidth="lg">
        <main>
          <Carousel className={classes.Carousel}>
            {mainFeaturedPosts.map((post) => (
              <MainFeaturedPost key={post.id} post={post} height={carouselHeight} />
            ))}
          </Carousel>
          <Grid container spacing={7} justify="center">
            <Grid container item spacing={4} xs={12} lg={9}>
              {featuredPosts.map((post) => (
                <Grid key={post.id} item xs={12} md={6} lg={6}>
                  <FeaturedPost
                    key={post.id}
                    post={post}
                    height={cardHeight}
                  />
                </Grid>
              ))}
            </Grid>
            <Grid item xs={12} lg={3}>
              <Sidebar
                title={sidebar.title}
                description={sidebar.description}
                social={sidebar.social}
              />
            </Grid>
          </Grid>
        </main>
      </Container>
    </div>
  );
}
