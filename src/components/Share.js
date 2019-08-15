import React from 'react';
import {
  FaTwitter,
  FaFacebookF,
  FaLinkedinIn,
  FaPinterestP,
  FaTumblr,
} from 'react-icons/fa';
import { Location } from '@reach/router';
import { sprintf } from 'sprintf-js';

const getSocialsLinks = (options) => {
  const {
    url, title, hostname, summary = '',
  } = options;

  const urlEncoded = encodeURIComponent(url);
  const titleEncoded = encodeURIComponent(title);
  const hostnameEncoded = encodeURIComponent(hostname);
  const summaryEncoded = encodeURIComponent(summary);

  const facebookPattern = 'https://www.facebook.com/sharer.php?u=%s';
  const linkedInPattern = 'https://www.linkedin.com/shareArticle?mini=true&url=%s&title=%s&summary=%s&source=%s';
  const twitterPattern = 'https://twitter.com/share?text=%s&url=%s';
  const pinterestPattern = 'https://www.pinterest.com/pin/create/button/?url=%s&description=%s';
  const tumblrPattern = 'https://www.tumblr.com/widgets/share/tool?canonicalUrl=%s';

  const facebook = sprintf(facebookPattern, urlEncoded);
  const linkedin = sprintf(
    linkedInPattern,
    urlEncoded,
    titleEncoded,
    summaryEncoded,
    hostnameEncoded,
  );
  const twitter = sprintf(twitterPattern, titleEncoded, urlEncoded);
  const pinterest = sprintf(pinterestPattern, urlEncoded, summaryEncoded);
  const tumblr = sprintf(tumblrPattern, urlEncoded);
  return {
    facebook,
    linkedin,
    twitter,
    pinterest,
    tumblr,
  };
};

const LinkToDo = ({ icon: Icon, url }) => {
  const clickHandler = (event) => {
    event.preventDefault();
    window.open(
      url,
      'Sharing',
      'status = 1, height = 500, width = 360, resizable = 0',
    );
  };

  return (
    <a href={url} onClick={(event) => clickHandler(event)}>
      <Icon />
    </a>
  );
};

const ShareComponent = ({ pageTitle, summary }) => (
  <div id="share-component" className="columns is-centered">
    <Location>
      {({ location }) => {
        const { href, origin: hostname } = location;
        const options = {
          url: href,
          title: pageTitle,
          hostname,
          summary,
        };
        const {
          facebook,
          linkedin,
          twitter,
          pinterest,
          tumblr,
        } = getSocialsLinks(options);

        return (
          <div className="column is-10">
            <div className="link-list">
              <ul>
                <li>
                  <LinkToDo icon={FaTwitter} url={twitter} />
                </li>
                <li>
                  <LinkToDo icon={FaFacebookF} url={facebook} />
                </li>
                <li>
                  <LinkToDo icon={FaLinkedinIn} url={linkedin} />
                </li>
                <li>
                  <LinkToDo icon={FaPinterestP} url={pinterest} />
                </li>
                <li>
                  <LinkToDo icon={FaTumblr} url={tumblr} />
                </li>
              </ul>
            </div>
          </div>
        );
      }}
    </Location>
  </div>
);

export default ShareComponent;
