import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty, isArray } from 'lodash';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import { Location } from '@reach/router';
import MetaImageDefault from '../../static/img/blog-card/meta-image-default.jpeg';
import config from '../../config/site.config';
import siteLogo from '../img/logo-cblog.svg';

function SEO({
  description, lang, meta, keywords, title, image, isPost, frontmatter,
}) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
          }
        }
      }
    `,
  );
  const { siteMetadata } = site;
  const metaDescription = description || siteMetadata.description;
  const titleTemplatePattern = title
    ? `%s | ${siteMetadata.title}`
    : siteMetadata.title;
  const metaTitle = title || siteMetadata.title;
  const generateMetaImage = (uri, hostname) => `${hostname}${uri}`;
  const metaImage = isEmpty(image) ? MetaImageDefault : image;
  return (
    <Location>
      {({ location }) => {
        const { href } = location;
        const { twitterUser, siteAuthorName, personWebsite } = config;
        const hostname = siteMetadata.siteUrl;
        const generatedMetaImage = generateMetaImage(metaImage, hostname);
        return (
          <Helmet
            htmlAttributes={{
              lang,
            }}
            title={metaTitle}
            titleTemplate={titleTemplatePattern}
            meta={[
              {
                name: 'google-site-verification',
                content: 'RcsNLFZhykbw3M3zg-ZLFJZISDC67xyPoaE87HYJP-c',
              },
              {
                name: 'description',
                content: metaDescription,
              },
              {
                property: 'og:title',
                content: metaTitle,
              },
              {
                property: 'og:image',
                content: generatedMetaImage,
              },
              {
                property: 'og:description',
                content: metaDescription,
              },
              {
                property: 'og:type',
                content: 'website',
              },
              {
                property: 'og:url',
                content: href,
              },
              {
                property: 'og:site_name',
                content: hostname,
              },
              {
                property: 'og:locale',
                content: lang,
              },
              {
                name: 'twitter:card',
                content: 'summary',
              },
              {
                name: 'twitter:creator',
                content: twitterUser,
              },
              {
                name: 'twitter:title',
                content: metaTitle,
              },
              {
                name: 'twitter:description',
                content: metaDescription,
              },
              {
                name: 'twitter:image',
                content: generatedMetaImage,
              },
            ]
              .concat(
                keywords.length > 0
                  ? {
                    name: 'keywords',
                    content: keywords.join(', '),
                  }
                  : [],
              )
              .concat(meta)}
          >

            {isPost

            && (
            <script type="application/ld+json">
              {JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'BlogPosting',
                mainEntityOfPage: {
                  '@type': 'WebPage',
                  '@id': href,
                },
                headline: metaTitle,
                image: generatedMetaImage,
                author: {
                  '@type': 'Person',
                  name: siteAuthorName,
                  url: personWebsite,
                },
                creator: {
                  '@type': 'Person',
                  name: siteAuthorName,
                  url: personWebsite,
                },
                keywords: isArray(frontmatter.tags) && frontmatter.tags.join(', '),
                publisher: {
                  '@type': 'Organization',
                  name: siteAuthorName,
                  url: personWebsite,
                  logo: {
                    '@type': 'ImageObject',
                    url: `${hostname}/icons/icon-144x144.png`,
                  },
                },
                url: href,
                datePublished: frontmatter.date,
                dateCreated: frontmatter.date,
                dateModified: frontmatter.date,
                description: frontmatter.description,
              })}
            </script>
            )}

          </Helmet>
        );
      }}
    </Location>
  );
}

SEO.defaultProps = {
  description: '',
  frontmatter: {},
  image: '',
  isPost: false,
  keywords: [],
  lang: 'fr',
  meta: [],
  title: '',
};

SEO.propTypes = {
  description: PropTypes.string,
  frontmatter: PropTypes.object,
  image: PropTypes.string,
  isPost: PropTypes.bool,
  keywords: PropTypes.arrayOf(PropTypes.string),
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
};

export default SEO;
