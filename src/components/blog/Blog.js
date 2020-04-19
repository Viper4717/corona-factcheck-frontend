import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Carousel from 'react-material-ui-carousel';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Axios from 'axios';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Sidebar from './Sidebar';
import { serverUrl } from '../../util';

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
];

const sidebar = {
  reportButtonText: 'রিপোর্ট',
  reportButtonDesc: 'আপনি যদি কোনো গুজব কিংবা ভুয়া তথ্য/পোস্ট/স্ক্রিনশট/ভিডিও আমাদের কাছে পৌঁছে দিতে চান, তাহলে উপরের "রিপোর্ট" বাটনে ক্লিক করে জানাতে পারেন',
};

function loadData(data, setData) {
  // load main featured posts (for carousal)
  Axios({
    method: 'GET',
    url: `${serverUrl}/main-featured-posts`,
  }).then((response) => {
    const mainFeaturedPosts = response.data.map((i) => ({
      id: i.id,
      title: i.title,
      description: i.desc,
      image: `${serverUrl}/${i.img.url}`,
      imageText: i.img.caption,
      link: i.link,
    }));
    setData({ ...data, mainFeaturedPosts });
  });

  // load featured posts
  Axios({
    method: 'GET',
    url: `${serverUrl}/featured-posts`,
  }).then((response) => {
    const featuredPosts = response.data.map((i) => ({
      id: i.id,
      date: new Date(i.post.created_at).toDateString(),
      title: i.post.title,
      description: i.post.desc,
      image: `${serverUrl}/${i.post.img.url}`,
      imageText: i.post.img.caption,
      link: `${serverUrl}/${i.post.img.url}`, // temporary replacement for link
      status: i.post.authenticity,
    }));
    setData({ ...data, featuredPosts });
  });
}

export default function Blog() {
  const classes = useStyles();
  const [data, setData] = useState({
    mainFeaturedPosts: [],
    featuredPosts: [],
  });

  useEffect(() => {
    loadData(data, setData);
  });

  return (
    <div className={classes.Blog}>
      <CssBaseline />
      <Container maxWidth="lg">
        <main>
          <Carousel className={classes.Carousel}>
            {data.mainFeaturedPosts.map((post) => (
              <MainFeaturedPost key={post.id} post={post} height={carouselHeight} />
            ))}
          </Carousel>
          <Grid container spacing={7} justify="center">
            <Grid container item spacing={4} xs={12} lg={9}>
              {data.featuredPosts.map((post) => (
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
                reportButtonText={sidebar.reportButtonText}
                reportButtonDesc={sidebar.reportButtonDesc}
              />
            </Grid>
          </Grid>
        </main>
      </Container>
    </div>
  );
}
