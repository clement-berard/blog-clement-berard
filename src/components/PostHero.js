import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import { FaCalendarAlt, FaFolderOpen, FaTags } from 'react-icons/fa';
import { kebabCase, upperFirst } from 'lodash';
import { Link } from 'gatsby';
import { formatDate, blogHeroImagePlaceholder } from '../utils/functions.utils';
import {
  DARK_VIOLET,
  LIGHT_VIOLET,
  LIGHT_GRAY,
  PALETTE_6,
} from '../../config/theme.config';

const MixinEffectBorderWithOver = css`
  border-left: 5px solid ${PALETTE_6};
  padding-left: 8px;
  transition: border-left-color 0.2s ease;
  &:hover {
    border-left-color: ${LIGHT_VIOLET};
  }
`;

const MixinpostSubtitleLink = css`
  a {
    color: ${LIGHT_GRAY};
    &:hover {
      color: ${PALETTE_6};
    }
  }
`;

const PostHeroBlock = styled.div`
  min-height: 40vh;
  background-color: ${DARK_VIOLET};
  padding: 100px 300px;
  padding: 50px;
  clip-path: polygon(0% 0%, 100% 0, 100% 0, 100% 95%, 0% 100%);
  ${breakpoint('tablet')`
    padding: 70px 150px;
    clip-path: polygon(0% 0%, 100% 0, 100% 0, 100% 90%, 0% 100%);
  `}
  ${breakpoint('desktop')`
    padding: 100px 300px;
    clip-path: polygon(0% 0%, 100% 0, 100% 0, 100% 81%, 0% 100%);
  `}
  
  color: ${LIGHT_GRAY};

  ${({ imagePlaceholderHero }) => imagePlaceholderHero
    && css`
      @media (min-width: 769px) {
        &::before {
          content: "";
          position: absolute;
          top: 0;
          left: 60vw;
          width: 100%;
          height: 100%;
          filter: blur(5px);
          background: url(${imagePlaceholderHero}) no-repeat;
        }
      }
    `}
`;

const PostHeroContent = styled.div`
  display: flex;
  flex-flow: column wrap;
`;

const PostHeroTitle = styled.div`
  max-width: 90%;
  line-height: 0.9em;
  font-weight: bold;
  margin-bottom: 40px;
  font-size: 30px;
  ${breakpoint('tablet')`
  max-width: 70%;
    font-size: 30px;
  `}
  ${breakpoint('desktop')`
  max-width: 50%;
    font-size: 50px;
  `}
`;

const PostHeroSubTitle = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin-bottom: 15px;
  max-width: 90%;
  ${MixinEffectBorderWithOver}
  & > * {
    display: flex;
    flex-flow: row wrap;
    &:not(:last-child) {
      margin-right: 0.8rem;
    }
  }

  .post-subtitle-tags {
    .post-subtitle-tag {
      display: flex;
      flex-flow: column nowrap;
      &:not(:last-child) {
        margin-right: 0.3rem;
      }
      ${MixinpostSubtitleLink}
    }
  }
  .post-subtitle-category {
    ${MixinpostSubtitleLink}
  }
  .post-subtitle-icon {
    margin-right: 0.3rem;
    transform: translateY(4px);
    color: ${LIGHT_GRAY};
  }
`;

const PostHeroDescription = styled.div`
  max-width: 90%;
  ${MixinEffectBorderWithOver}
  ${breakpoint('tablet')`
  max-width: 70%;
  
  `}
  ${breakpoint('desktop')`
  max-width: 50%;
  
  `}
`;

const PostHero = ({
  title, description, category, tags, date,
}) => {
  const imagePlaceholderHero = blogHeroImagePlaceholder(category);
  return (
    <PostHeroBlock imagePlaceholderHero={imagePlaceholderHero}>
      <PostHeroContent>
        <PostHeroTitle>{title}</PostHeroTitle>
        <PostHeroSubTitle>
          <div className="post-subtitle-date">
            <FaCalendarAlt className="post-subtitle-icon" />
            {formatDate(date)}
          </div>
          {category && (
            <div className="post-subtitle-category">
              <FaFolderOpen className="post-subtitle-icon" />
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
        </PostHeroSubTitle>
        <PostHeroDescription>{description}</PostHeroDescription>
      </PostHeroContent>
    </PostHeroBlock>
  );
};

export default PostHero;

PostHero.propTypes = {
  category: PropTypes.string,
  date: PropTypes.string,
  description: PropTypes.string,
  tags: PropTypes.array,
  title: PropTypes.string,
};

PostHero.defaultProps = {
  category: '',
  date: '',
  description: '',
  tags: [],
  title: '',
};
