import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import ListPostCategorieTags from '../components/ListPostCategorieTags';

const TagRoute = (props) => {
  const { pageContext, data } = props;
  const posts = data.allMarkdownRemark.edges;
  const { tag } = pageContext;
  const { title } = data.site.siteMetadata;
  const { totalCount } = data.allMarkdownRemark;
  const tagHeader = `${totalCount} article${
    totalCount === 1 ? '' : 's'
  } avec le tag “${tag}”`;

  return (
    <Layout>
      <section className="section">
        <Helmet title={`${tag} | ${title}`} />
        <div className="container content">
          <div className="columns">
            <ListPostCategorieTags title={tagHeader} posts={posts} />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default TagRoute;

export const tagPageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] }, draft: {ne: true} } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
            fullTitle
          }
          frontmatter {
            title
            templateKey
            date(formatString: "MMMM DD, YYYY")
            description
            category
            featuredpost
            featuredimage {
              childImageSharp {
                fluid(maxWidth: 400, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;

TagRoute.propTypes = {
  data: PropTypes.any.isRequired,
  pageContext: PropTypes.any.isRequired,
};
