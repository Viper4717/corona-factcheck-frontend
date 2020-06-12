import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Axios from 'axios';
import QueryString from 'query-string';
import SearchBar from './SearchBar';
import PageBar from './PageBar';
import SearchResults from './SearchResults';
import { serverUrl, processImageLink } from '../../util';

const postsPerPage = 10; // number of posts in one page

const useStyles = makeStyles((theme) => ({
  Posts: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
}));

/* generate server query url using searchText and pageNo */
function getServerQueryUrl({ searchText, pageNo }) {
  const searchUri = searchText ? `article_contains=${searchText}&` : '';
  const start = pageNo * postsPerPage;
  const limit = postsPerPage;
  const pagingUri = `_start=${start}&_limit=${limit}&`;
  const countUrl = `${serverUrl}/posts/count?${searchUri}`;
  const postsUrl = `${serverUrl}/posts?${searchUri}${pagingUri}`;
  return { countUrl, postsUrl };
}

/* generate query string (for url) based on searchText and pageNo */
export function getQueryString(searchText, pageNo) {
  const searchUri = searchText ? `s=${searchText}&` : '';
  const pageUri = pageNo ? `p=${pageNo}&` : '';
  return pageUri + searchUri;
}

/* Paginated linear column of Posts (with search bar) */
export default function Blog({ location, history }) {
  const classes = useStyles();

  // get search text and page no from url
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
    // get total count for current search
    Axios
      .get(countUrl)
      .then((response) => {
        const count = parseInt(response.data, 10);
        const newTotalPages = Math.ceil(count / postsPerPage);
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
    // get posts for current search and page no.
    Axios
      .get(postsUrl)
      .then((response) => {
        const newPosts = response.data.map((i) => ({
          id: i.id,
          date: new Date(i.created_at).toDateString(),
          title: i.title || '',
          description: i.desc || '',
          image: i.image
            ? processImageLink(
              i.image.formats
                ? (i.image.formats.medium && i.image.formats.medium.url)
                || (i.image.formats.small && i.image.formats.small.url)
                || (i.image.formats.thumbnail && i.image.formats.thumbnail.url)
                : i.image.url,
            )
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
          onSearch={(searchBarText) => {
            const newUrl = `blog?${getQueryString(encodeURI(searchBarText), 0)}`;
            history.push(newUrl);
            setState({ searchText: searchBarText, pageNo: 0 });
          }}
        />
        <SearchResults posts={posts} />
        <PageBar
          totalPages={totalPages}
          pageNo={state.pageNo}
          onPageChange={(newPageNo) => {
            const newUrl = `blog?${getQueryString(state.searchText, newPageNo - 1)}`;
            history.push(newUrl);
            setState((prevState) => ({ ...prevState, pageNo: newPageNo - 1 }));
          }}
        />
      </Container>
    </div>
  );
}
