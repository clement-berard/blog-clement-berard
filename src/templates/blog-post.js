import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';
import SEO from '../components/seo';
import ShareComponent from '../components/Share';
import PostHero from '../components/PostHero';
import { blogCardImagePlaceholder } from '../utils/functions.utils';

export const BlogPostTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  category,
  title,
  date,
}) => {
  const PostContent = contentComponent || Content;
  return (
    <section id="page-post">
      <PostHero
        title={title}
        description={description}
        category={category}
        tags={tags}
        date={date}
      />
      <section className="section">
        <div className="container content">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <PostContent content={content} className="post-content" />
            </div>
          </div>
        </div>
      </section>

      <ShareComponent pageTitle={title} summary={description} />
    </section>
  );
};

BlogPostTemplate.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  content: PropTypes.any.isRequired,
  contentComponent: PropTypes.func,
  tags: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.bool,
  ]),
  category: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  description: PropTypes.string,
  title: PropTypes.string,
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

BlogPostTemplate.defaultProps = {
  date: false,
  contentComponent: noop,
  description: '',
  title: '',
  tags: false,
  category: false,
};

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data;
  const featuredImageResult = blogCardImagePlaceholder(
    post.frontmatter.category,
    post.frontmatter.featuredimageThumb,
  );
  return (
    <Layout>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        image={featuredImageResult}
        frontmatter={post.frontmatter}
        isPost
      />
      <BlogPostTemplate
        content={post.htmlAst}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        tags={post.frontmatter.tags}
        category={post.frontmatter.category}
        title={post.frontmatter.title}
        date={post.frontmatter.date}
      />
    </Layout>
  );
};

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }).isRequired,
};

export default BlogPost;

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      htmlAst
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
        category
        featuredimageThumb: featuredimage {
            childImageSharp {
                fluid(maxWidth: 250, quality: 95) {
                    ...GatsbyImageSharpFluid
                }
            }
        }
      }
    }
  }
`;
