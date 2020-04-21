import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Carousel from 'react-material-ui-carousel';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import CarouselPost from './CarouselPost';
import FeaturedPost from '../blog/Post';
import Sidebar from './Sidebar';
import { serverUrl } from '../../util';

const carouselHeight = '25rem';
const cardHeight = '12rem';

const useStyles = makeStyles((theme) => ({
  Home: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(10),
  },
  Carousel: {
    marginBottom: theme.spacing(3),
  },
}));

const sidebar = {
  reportButtonText: 'রিপোর্ট',
  reportButtonDesc: 'আপনি যদি কোনো গুজব কিংবা ভুয়া তথ্য/পোস্ট/স্ক্রিনশট/ভিডিও আমাদের কাছে পৌঁছে দিতে চান, তাহলে উপরের "রিপোর্ট" বাটনে ক্লিক করে জানাতে পারেন',
};

function loadData(data, setData) {
  if (!data.carouselLoaded) {
    // load main featured posts (for carousal)
    axios
      .get(`${serverUrl}/carousel-posts?_sort=priority:DESC&_limit=5`)
      .then((response) => {
        const carouselPosts = response.data.map((i) => ({
          id: i.id,
          title: i.title || '',
          description: i.desc || '',
          image: `${serverUrl}${i.image.formats ? i.image.formats.medium.url : i.image.url}`,
          imageText: i.image.caption || i.image.alternativeText,
          link: i.link,
        }));
        setData({ ...data, carouselPosts, carouselLoaded: true });
        console.log('carousel data loaded successfully');
      })
      .catch((error) => {
        console.error(error);
      });
  }
  if (!data.featuredPostsLoaded) {
    // load featured posts
    axios
      .get(`${serverUrl}/featured-posts?_sort=priority:DESC&_limit=6`)
      .then((response) => {
        const featuredPosts = response.data.map((i) => ({
          id: i.id,
          date: new Date(i.post.created_at).toDateString(),
          title: i.post.title || '',
          description: i.post.desc || '',
          image: `${serverUrl}${i.post.image.formats ? i.post.image.formats.small.url : i.post.image.url}`,
          imageText: i.post.image.caption || i.post.image.alternativeText || '',
          link: `/blog/${i.post.id}`,
          status: i.post.authenticity,
        }));
        setData({ ...data, featuredPosts, featuredPostsLoaded: true });
        console.log('featured posts data loaded successfully');
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

export default function Home() {
  const classes = useStyles();
  const [data, setData] = useState({
    carouselLoaded: false,
    featuredPostsLoaded: false,
    carouselPosts: [],
    featuredPosts: [],
  });

  useEffect(() => {
    loadData(data, setData);
  });

  return (
    <div className={classes.Home}>
      <CssBaseline />
      <Container maxWidth="lg">
        <main>
          <Carousel className={classes.Carousel}>
            {data.carouselPosts.map((post) => (
              <CarouselPost key={post.id} post={post} height={carouselHeight} />
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
