import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import Axios from 'axios';
import QueryString from 'query-string';
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

function getQueryString(searchText, pageNo) {
  const searchUri = searchText ? `s=${searchText}&` : '';
  const pageUri = pageNo ? `p=${pageNo}&` : '';
  return pageUri + searchUri;
}

export default function Blog({ location }) {
  const classes = useStyles();

  const {
    s: searchText = '',
    p: pageNoStr = '0',
  } = QueryString.parse(location.search);
  const pageNo = parseInt(pageNoStr, 10);

  const [totalPages, setTotalPages] = useState(0);
  const [posts, setPosts] = useState([]);

  const searchUri = searchText ? `article_contains=${searchText}&` : '';
  const start = pageNo * postsPerPage;
  const limit = postsPerPage;
  const pagingUri = `_start=${start}&_limit=${limit}&`;
  const countUrl = `${serverUrl}/posts/count?${searchUri}`;
  const postsUrl = `${serverUrl}/posts?${searchUri}${pagingUri}`;

  useEffect(() => {
    Axios
      .get(countUrl)
      .then((response) => {
        const count = parseInt(response.data, 10);
        const newTotalPages = Math.floor(count / postsPerPage);
        setTotalPages(newTotalPages);
        console.log('posts count loaded successfully');
      })
      .catch((error) => {
        console.error(error);
        console.log('failed to load posts count');
      });
  }, []);

  useEffect(() => {
    Axios
      .get(postsUrl)
      .then((response) => {
        const newPosts = response.data.map((i) => ({
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
        setPosts(newPosts);
        console.log('posts data loaded successfully');
      })
      .catch((error) => {
        console.error(error);
        console.log('failed to load posts data');
      });
  }, []);

  return (
    <div className={classes.Posts}>
      <CssBaseline />
      <Container maxWidth="lg">
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
          {posts.map((post) => (
            <Grid key={post.id} item xs={12} md={12} lg={12}>
              <Post
                key={post.id}
                post={post}
                height={cardHeight}
              />
            </Grid>
          ))}
        </Grid>
        <div className={classes.pageNum}>
          <Pagination
            shape="rounded"
            count={totalPages}
            page={pageNo + 1}
            renderItem={(item) => (
              <PaginationItem
                component="a"
                href={`/blog?${getQueryString(searchText, item.page - 1)}`}
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...item}
              />
            )}
          />
        </div>
      </Container>
    </div>
  );
}
