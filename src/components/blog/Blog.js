import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Pagination from '@material-ui/lab/Pagination';
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

function getServerQueryUrl({ searchText, pageNo }) {
  const searchUri = searchText ? `article_contains=${searchText}&` : '';
  const start = pageNo * postsPerPage;
  const limit = postsPerPage;
  const pagingUri = `_start=${start}&_limit=${limit}&`;
  const countUrl = `${serverUrl}/posts/count?${searchUri}`;
  const postsUrl = `${serverUrl}/posts?${searchUri}${pagingUri}`;
  return { countUrl, postsUrl };
}

// eslint-disable-next-line react/prop-types
export default function Blog({ location, history }) {
  const classes = useStyles();

  const {
    s: searchTextProp = '',
    p: pageNoStrProp = '0',
  // eslint-disable-next-line react/prop-types
  } = QueryString.parse(location.search);
  const pageNoProp = parseInt(pageNoStrProp, 10);

  const [totalPages, setTotalPages] = useState(0);
  const [posts, setPosts] = useState([]);
  const [searchBarText, setSearchBarText] = useState('');
  const [state, setState] = useState({
    searchText: searchTextProp,
    pageNo: pageNoProp,
  });

  useEffect(() => {
    const { countUrl } = getServerQueryUrl(state);
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
  }, [state]);

  useEffect(() => {
    const { postsUrl } = getServerQueryUrl(state);
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
  }, [state]);

  return (
    <div className={classes.Posts}>
      <CssBaseline />
      <Container maxWidth="lg">
        <div className="searchBox" style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <SearchIcon style={{ marginTop: '3px' }} />
          <TextField
            id="full-width-text-field"
            fullWidth
            style={{ marginLeft: '10px', maxWidth: '400px' }}
            placeholder="খুঁজুন"
            autoFocus
            onChange={(event) => setSearchBarText(event.target.value)}
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                // handle search
                const newUrl = `blog?${getQueryString(encodeURI(searchBarText), 0)}`;
                // eslint-disable-next-line react/prop-types
                history.push(newUrl);
                setState({ searchText: searchBarText, pageNo: 0 });
                event.preventDefault();
              }
            }}
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
            page={state.pageNo + 1}
            onChange={(_event, newPage) => {
              // handle page change
              const newUrl = `blog?${getQueryString(state.searchText, newPage - 1)}`;
              // eslint-disable-next-line react/prop-types
              history.push(newUrl);
              setState((prevState) => ({ ...prevState, pageNo: newPage - 1 }));
            }}
          />
        </div>
      </Container>
    </div>
  );
}
