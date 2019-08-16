import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import _ from 'lodash';
import { blogCardImagePlaceholder, formatDate } from '../utils/functions.utils';

const BlogPostItem = ({ post }) => {
  const dateFormated = formatDate(post.frontmatter.date);
  const featuredImageResult = blogCardImagePlaceholder(
    post.frontmatter.category,
    post.frontmatter.featuredimageThumb,
  );
  return (
    <div className="blog-card" key={post.fields.slug}>
      <Link to={`/${post.fields.slug}`} className="meta">
        <div
          className="photo"
          style={{
            backgroundImage: `url(${featuredImageResult})`,
          }}
        />
        <ul className="details">
          <li className="date">{dateFormated}</li>
        </ul>
      </Link>
      <div className="description">
        <Link to={`/${post.fields.slug}`} className="description-link-article">
          {post.fields.fullTitle}
        </Link>
        <h2>
          {post.frontmatter.category
            && `${_.upperFirst(post.frontmatter.category)}`}
        </h2>
        <p>
          {' '}
          {_.truncate(post.frontmatter.description, { length: 120 })}
        </p>
      </div>
    </div>
  );
};

export default BlogPostItem;

BlogPostItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  post: PropTypes.object.isRequired,
};
