import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Axios from 'axios';
import FeaturedPost from '../blog/FeaturedPost';
import Pagination from '@material-ui/lab/Pagination';
import { serverUrl } from '../../util';
import './Posts.css'

const cardHeight = '12rem';

const useStyles = makeStyles((theme) => ({
  Posts: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    minHeight: "100vh",
  },
  pageNum: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));

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

// function loadData(data, setData) {

//   // load featured posts
//   Axios({
//     method: 'GET',
//     url: `${serverUrl}/featured-posts`,
//   }).then((response) => {
//     const featuredPosts = response.data.map((i) => ({
//       id: i.id,
//       date: new Date(i.post.created_at).toDateString(),
//       title: i.post.title,
//       description: i.post.desc,
//       image: `${serverUrl}/${i.post.img.url}`,
//       imageText: i.post.img.caption,
//       link: `${serverUrl}/${i.post.img.url}`, // temporary replacement for link
//       status: i.post.authenticity,
//     }));
//     setData({ ...data, featuredPosts });
//   });
// }

export default function Posts() {
  const classes = useStyles();
  // const [data, setData] = useState({
  //   featuredPosts: [],
  // });

  // useEffect(() => {
  //   loadData(data, setData);
  // });

  return (
    <div className={classes.Posts}>
      <CssBaseline />
      <Container maxWidth="lg">
        <main>
          <Grid container spacing={7} justify="center">
            {featuredPosts.map((post) => (
                <Grid key={post.id} item xs={12} md={12} lg={12}>
                  <FeaturedPost
                    key={post.id}
                    post={post}
                    height={cardHeight}
                  />
              </Grid>
            ))}
          </Grid>
        </main>
        <div className={classes.pageNum}>
          <Pagination count={10} variant="outlined" shape="rounded" />
        </div>
      </Container>
    </div>
  );
}
