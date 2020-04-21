import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Axios from 'axios';
import Pagination from '@material-ui/lab/Pagination';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import Post from './Post';
import { serverUrl } from '../../util';

const cardHeight = '12rem';
const postsPerPage = 2;

const useStyles = makeStyles((theme) => ({
  Posts: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  pageNum: {
    display: 'flex',
    justifyContent: 'center',
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));


function loadData(data, setData) {
    const searchText = encodeURI(data.searchText);
    const searchUri = searchText ? `article_contains=${searchText}&` : '';

    const start = data.pageNo * postsPerPage;
    const limit = postsPerPage;
    console.log({ start, limit });
    const pagingUri = `_start=${start}&_limit=${limit}&`;

    const countUrl = `${serverUrl}/posts/count?${searchUri}`;
    const url = `${serverUrl}/posts?${searchUri}${pagingUri}`;

    Axios({
      method: 'GET',
      url: url,
    }).then((response) => {
      console.log(response);
      const fetchedPosts = response.data.map((i) => ({
        id: i.id,
        date: new Date(i.created_at).toDateString(),
        title: i.title || '',
        description: i.desc || '',
        image: i.image
          ? `${serverUrl}${i.image.formats ? i.image.formats.small.url : i.image.url}`
          : null,
        imageText: i.image ? (i.image.caption || i.image.alternativeText || null) : null,
        link: `/article/${i.id}`,
        status: i.authenticity,
      }));
      console.log('posts data loaded successfully')
      return fetchedPosts
    }).then( (fetchedPosts) => {
      Axios({
        method: 'GET',
        url: countUrl,
      }).then((response) => {
        const count = parseInt(response.data, 10);
        const newTotal = Math.floor(count/postsPerPage);
        console.log("Count Data response", response.data);
        setData({ 
          ...data,
          totalPages: newTotal,
          posts: fetchedPosts, 
        });
        console.log("Count Data check", data)
      }).catch((error) => {
        console.log(error);
      })
    }).catch((error) => {
      console.log(error);
    });
}

export default function Blog() {
  const classes = useStyles();
  const [data, setData] = useState({
    pageNo: 0,
    totalPages: 0,
    searchText: '',
    posts: [],
  });

  useEffect(() => {
    loadData(data, setData);
    console.log("useEffect Called")
  }, [data.pageNo]);

  return (
    <div className={classes.Posts}>
      <CssBaseline />
      <Container maxWidth="lg">
        <main>
          <div className="searchBox" style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            <SearchIcon style={{ marginTop: '3px' }} />
            <TextField
              id="full-width-text-field"
              placeholder="খুঁজুন"
              fullWidth
              style={{ marginLeft: '10px', maxWidth: '400px' }}
            />
          </div>
          <Grid container spacing={7} justify="center">
            {data.posts.map((post) => (
              <Grid key={post.id} item xs={12} md={12} lg={12}>
                <Post
                  key={post.id}
                  post={post}
                  height={cardHeight}
                />
              </Grid>
            ))}
          </Grid>
        </main>
        <div className={classes.pageNum}>
          <Pagination
            count={data.totalPages}
            variant="outlined"
            shape="rounded"
            onChange={(_event, page) => {
              console.log({ totalPages: data.totalPages, page });
              setData({
                ...data,
                pageNo: page - 1
              })
            }}
          />
        </div>
      </Container>
    </div>
  );
}
