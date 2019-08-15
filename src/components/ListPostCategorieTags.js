import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import BlogPostItem from './BlogPostItem';

const ListPostCategorieTags = ({ title, posts }) => (
  <div className="column is-10 is-offset-1" style={{ marginBottom: '6rem' }}>
    <h3 className="title-full-width">{title}</h3>
    {posts
      && posts.map(({ node: post }) => (
        <BlogPostItem post={post} key={_.uniqueId()} />
      ))}
  </div>
);

export default ListPostCategorieTags;

ListPostCategorieTags.propTypes = {
  posts: PropTypes.array,
  title: PropTypes.string,
};

ListPostCategorieTags.defaultProps = {
  posts: [],
  title: '',
};
