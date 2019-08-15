import React from 'react';
import PropTypes from 'prop-types';
import { kebabCase, upperFirst } from 'lodash';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Layout from '../../components/Layout';
import GridCategoriesTags from '../../components/GridCategorieTags';

const CategoriesPage = (props) => {
  const { data } = props;
  const { allMarkdownRemark } = data;
  const { group } = allMarkdownRemark;

  const allItems = (group || []).map(({ fieldValue, totalCount }) => ({
    fieldValue: upperFirst(fieldValue),
    totalCount,
    linkTo: `/category/${kebabCase(fieldValue)}`,
  }));
  return (
    <Layout>
      <section className="section">
        <Helmet title="Categories" />
        <div className="container content">
          <div className="columns">
            <GridCategoriesTags allItems={allItems} title="Catégories" />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CategoriesPage;

export const categoriesPageQuery = graphql`
  query CategoriesQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
        limit: 1000
        filter: { frontmatter: { templateKey: { eq: "blog-post" }, draft: {ne: true} } }
    ) {
      group(field: frontmatter___category) {
        fieldValue
        totalCount
      }
    }
  }
`;

CategoriesPage.propTypes = {
  data: PropTypes.any.isRequired,
};
