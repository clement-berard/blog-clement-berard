import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import { Location } from '@reach/router';
import MetaImageDefault from '../../static/img/blog-card/meta-image-default.jpeg';
import config from '../../config/site.config';

function SEO({
  description, lang, meta, keywords, title, image,
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
        const { twitterUser } = config;
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
          />
        );
      }}
    </Location>
  );
}

SEO.defaultProps = {
  lang: 'en',
  meta: [],
  keywords: [],
  description: '',
  title: '',
  image: '',
};

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string,
  image: PropTypes.string,
};

export default SEO;
