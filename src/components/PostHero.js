import React from 'react';
import { FaCalendar, FaFolder, FaTags } from 'react-icons/fa';
import { kebabCase, upperFirst, noop } from 'lodash';
import { Link } from 'gatsby';
import { formatDate } from '../utils/functions.utils';

const PostHero = ({
  title, description, category, tags, date,
}) => (
  <div className="post-hero">
    <div className="post-hero_content">
      <div className="post-hero_content--title">{title}</div>
      <div className="post-subtitle">
        <div className="post-subtitle-date">
          <FaCalendar className="post-subtitle-icon" />
          {formatDate(date)}
        </div>
        {category && (
          <div className="post-subtitle-category">
            <FaFolder className="post-subtitle-icon" />
            <span key={`${category}category`} className="post-subtitle-tag">
              <Link to={`/category/${kebabCase(category)}/`}>
                {upperFirst(category)}
              </Link>
            </span>
          </div>
        )}
        {tags && (
          <div className="post-subtitle-tags">
            <FaTags className="post-subtitle-icon" />
            {tags.sort().map((tag) => (
              <span key={`${tag}tag`} className="post-subtitle-tag">
                <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="description">{description}</div>
    </div>
  </div>
);

export default PostHero;
