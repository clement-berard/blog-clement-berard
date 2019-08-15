import React from 'react';
import PropTypes from 'prop-types';
import { kebabCase } from 'lodash';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Layout from '../../components/Layout';
import GridCategoriesTags from '../../components/GridCategorieTags';

const TagsPage = (props) => {
  const { data } = props;
  const { allMarkdownRemark } = data;
  const { group } = allMarkdownRemark;

  const allItems = (group || []).map(({ fieldValue, totalCount }) => ({
    fieldValue,
    totalCount,
    linkTo: `/tags/${kebabCase(fieldValue)}`,
  }));

  return (
    <Layout>
      <section className="section">
        <Helmet title={`Tags | ${data.site.siteMetadata.title}`} />
        <div className="container content">
          <div className="columns">
            <GridCategoriesTags allItems={allItems} title="Tags" />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default TagsPage;

export const tagPageQuery = graphql`
  query TagsQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 1000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;

TagsPage.propTypes = {
  data: PropTypes.any.isRequired,
};
