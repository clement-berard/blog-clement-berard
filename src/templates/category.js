import React from 'react';
import Helmet from 'react-helmet';
import { upperFirst } from 'lodash';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import Layout from '../components/Layout';
import ListPostCategorieTags from '../components/ListPostCategorieTags';

const CategoryRoute = (props) => {
  const { pageContext, data } = props;
  const posts = data.allMarkdownRemark.edges;
  const { title } = data.site.siteMetadata;
  const { totalCount } = data.allMarkdownRemark;

  const { category } = pageContext;
  const categoryHeader = `${totalCount} article${
    totalCount === 1 ? '' : 's'
  } dans la catégories “${upperFirst(category)}”`;

  return (
    <Layout>
      <section className="section">
        <Helmet title={`${category} | ${title}`} />
        <div className="container content">
          <div className="columns">
            <ListPostCategorieTags
              title={categoryHeader}
              posts={posts}
            />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CategoryRoute;

export const categoryPageQuery = graphql`
  query CategoryPage($category: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { category: { in: [$category] } } }
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

CategoryRoute.propTypes = {
  data: PropTypes.any.isRequired,
  pageContext: PropTypes.any.isRequired,
};
