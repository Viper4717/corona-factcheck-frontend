import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Carousel from 'react-material-ui-carousel';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Axios from 'axios';
import CarouselPost from './CarouselPost';
import FeaturedPost from '../blog/Post';
import Sidebar from './Sidebar';
import { serverUrl, processImageLink } from '../../util';

const carouselHeight = '25rem';
const cardHeight = '12rem';

const totCarouselPosts = 5; // total number of carousel posts to show
const totFeaturedPosts = 6; // total number of featured posts to show

const useStyles = makeStyles((theme) => ({
  Home: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(10),
  },
  Carousel: {
    marginBottom: theme.spacing(3),
  },
}));

function loadData(
  setCarouselPosts,
  setFeaturedPosts,
  setReportData,
) {
  // load report text and link
  Axios
    .get(`${serverUrl}/report-link`)
    .then(({ data }) => {
      const fetchedReportText = data.title;
      const fetchedReportLink = data.url;
      const fetchedReportDesc = data.desc;
      setReportData({
        text: fetchedReportText,
        link: fetchedReportLink,
        desc: fetchedReportDesc,
      });
    })
    .catch((error) => {
      console.error(error);
      console.log('failed to load report data');
    });

  // load main featured posts (for carousal)
  Axios
    .get(`${serverUrl}/carousel-posts?_sort=priority:DESC&_limit=${totCarouselPosts}`)
    .then(({ data }) => {
      const newCarouselPosts = data.map((i) => ({
        id: i.id,
        title: i.title || '',
        description: i.desc || '',
        image: i.image
          ? processImageLink(i.image.formats
            ? (i.image.formats.medium && i.image.formats.medium.url)
              || (i.image.formats.small && i.image.formats.small.url)
              || (i.image.formats.thumbnail && i.image.formats.thumbnail.url)
            : i.image.url)
          : null,
        imageText: i.image ? (i.image.caption || i.image.alternativeText || null) : null,
        link: i.link,
      }));
      setCarouselPosts(newCarouselPosts);
    })
    .catch((error) => {
      console.error(error);
      console.log('failed to load carousel posts');
    });

  // load featured posts
  Axios
    .get(`${serverUrl}/featured-posts?_sort=priority:DESC&_limit=${totFeaturedPosts}`)
    .then(({ data }) => {
      const newFeaturedPosts = data.map((i) => ({
        id: i.id,
        date: new Date(i.post.created_at).toDateString(),
        title: i.post.title || '',
        description: i.post.desc || '',
        image: i.post.image
          ? processImageLink(i.post.image.formats
            ? (i.post.image.formats.medium && i.post.image.formats.medium.url)
            || (i.post.image.formats.small && i.post.image.formats.small.url)
            || (i.post.image.formats.thumbnail && i.post.image.formats.thumbnail.url)
            : i.post.image.url)
          : null,
        imageText: i.post.image
          ? (i.post.image.caption || i.post.image.alternativeText || null)
          : null,
        link: `/article/${i.post.id}`,
        status: i.post.authenticity,
      }));
      setFeaturedPosts(newFeaturedPosts);
    })
    .catch((error) => {
      console.error(error);
      console.log('failed to load featured posts');
    });
}

export default function Home() {
  const classes = useStyles();

  const [carouselPosts, setCarouselPosts] = useState([]);
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [reportData, setReportData] = useState({
    text: 'রিপোর্ট',
    link: '',
    desc: '',
  });

  useEffect(() => {
    loadData(
      setCarouselPosts,
      setFeaturedPosts,
      setReportData,
    );
  }, []);

  return (
    <div className={classes.Home}>
      <CssBaseline />
      <Container maxWidth="lg">
        <main>
          <Carousel className={classes.Carousel}>
            {carouselPosts.map((post) => (
              <CarouselPost key={post.id} post={post} height={carouselHeight} />
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
                reportButtonText={reportData.text}
                reportButtonLink={reportData.link}
                reportButtonDesc={reportData.desc}
              />
            </Grid>
          </Grid>
        </main>
      </Container>
    </div>
  );
}
