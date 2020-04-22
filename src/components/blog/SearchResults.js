/* eslint-disable react/prop-types */
import React from 'react';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Post from './Post';

const cardHeight = '12rem';


export default function SearchResults({ posts }) {
  if (posts.length) { // number of posts is not zero
    return (
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
    );
  }
  return (
    <div style={{ marginTop: '30px' }}>
      <center>
        <Typography
          component="subtitle1"
          variant="h5"
          color="textSecondary"
        >
          No matching results
        </Typography>
      </center>
    </div>
  );
}
