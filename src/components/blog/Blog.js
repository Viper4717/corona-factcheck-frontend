import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Axios from 'axios';
import QueryString from 'query-string';
import SearchBar from './SearchBar';
import { PageBar } from './PageBar';
import SearchResults from './SearchResults';
import { serverUrl } from '../../util';

const postsPerPage = 10;

const useStyles = makeStyles((theme) => ({
  Posts: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
}));


function getServerQueryUrl({ searchText, pageNo }) {
  const searchUri = searchText ? `article_contains=${searchText}&` : '';
  const start = pageNo * postsPerPage;
  const limit = postsPerPage;
  const pagingUri = `_start=${start}&_limit=${limit}&`;
  const countUrl = `${serverUrl}/posts/count?${searchUri}`;
  const postsUrl = `${serverUrl}/posts?${searchUri}${pagingUri}`;
  return { countUrl, postsUrl };
}

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
        <SearchBar
          initialSearchText={searchTextProp}
          state={{ state, setState }}
          history={history}
        />
        <SearchResults posts={posts} />
        <PageBar
          totalPages={totalPages}
          state={{ state, setState }}
          history={history}
        />
      </Container>
    </div>
  );
}
