const _ = require('lodash');
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const { fmImagesToRelative } = require('gatsby-remark-relative-images');

const getFullSlug = (category, slug) => (category ? `${_.kebabCase(category)}${slug}` : slug);
exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  return graphql(`
    {
      allMarkdownRemark(
        limit: 1000
        ${
  process.env.NODE_ENV === 'production'
    ? 'filter: {frontmatter: {draft: {ne: true}}}'
    : ''
}
      ) {
      
        edges {
          node {
            id
            fields {
              slug
              fullTitle
            }
            frontmatter {
              tags
              category
              templateKey
              draft
            }
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      result.errors.forEach((e) => console.error(e.toString()));
      return Promise.reject(result.errors);
    }

    const posts = result.data.allMarkdownRemark.edges;

    posts.forEach((edge) => {
      const { id } = edge.node;

      createPage({
        path: edge.node.fields.slug,
        tags: edge.node.frontmatter.tags,
        component: path.resolve(
          `src/templates/${String(edge.node.frontmatter.templateKey)}.js`,
        ),
        // additional data can be passed via context
        context: {
          id,
        },
      });
    });

    // Tag pages:
    let tags = [];
    // Iterate through each post, putting all found tags into `tags`
    posts.forEach((edge) => {
      if (_.get(edge, 'node.frontmatter.tags')) {
        tags = tags.concat(edge.node.frontmatter.tags);
      }
    });
    // Eliminate duplicate tags
    tags = _.uniq(tags);

    // Make tag pages
    tags.forEach((tag) => {
      const tagPath = `/tags/${_.kebabCase(tag)}/`;

      createPage({
        path: tagPath,
        component: path.resolve('src/templates/tags.js'),
        context: {
          tag,
        },
      });
    });

    createpageCateories(posts, createPage);
  });
};

const createpageCateories = (posts, createPage) => {
  // Tag pages:
  let categories = [];
  // Iterate through each post, putting all found tags into `tags`
  posts.forEach((edge) => {
    if (_.get(edge, 'node.frontmatter.category')) {
      categories = categories.concat(edge.node.frontmatter.category);
    }
  });
  // Eliminate duplicate tags
  categories = _.uniq(categories);

  // Make tag pages
  categories.forEach((category) => {
    const categoryPath = `/category/${_.kebabCase(category)}/`;

    createPage({
      path: categoryPath,
      component: path.resolve('src/templates/category.js'),
      context: {
        category,
      },
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  fmImagesToRelative(node); // convert image paths for gatsby images

  if (node.internal.type === 'MarkdownRemark') {
    const category = _.get(getNode(node.id), ['frontmatter', 'category']);
    const title = _.get(getNode(node.id), ['frontmatter', 'title']);
    const titlePrefix = _.get(getNode(node.id), ['frontmatter', 'titlePrefix']);
    const value = createFilePath({ node, getNode });
    const fullSlug = getFullSlug(category, value);
    createNodeField({
      name: 'slug',
      node,
      value: fullSlug,
    });
    createNodeField({
      name: 'fullTitle',
      node,
      value: titlePrefix ? `[${titlePrefix}] ${title}` : title,
    });
  }
};
