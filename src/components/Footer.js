import React from 'react';
import styled from 'styled-components';
import { personWebsite, siteAuthorName } from '../../config/site.config';
import { DARK_VIOLET, LIGHT_GRAY, PALETTE_6 } from '../../config/theme.config';

const FooterBlock = styled.div`
  background-color: ${DARK_VIOLET};
  min-height: 20vh;
  margin-top: 80px;
  clip-path: polygon(0 0, 100% 31%, 100% 100%, 0 100%);
  padding: 5rem 2rem;
`;

const FooterContent = styled.div`
  color: ${LIGHT_GRAY};
  a {
    color: ${LIGHT_GRAY};
    transition: color 0.2s linear;
    &:hover {
      color: ${PALETTE_6};
    }
  }
  text-align: center;
`;

const Footer = () => {
  const dt = new Date();
  const LinkWebsite = () => (
    <a href={personWebsite} target="_blank" rel="noopener noreferrer">
      {siteAuthorName}
    </a>
  );
  const text = `© ${dt.getFullYear()}`;
  return (
    <FooterBlock>
      <FooterContent>
        <LinkWebsite />
        {' '}
        {text}
      </FooterContent>
    </FooterBlock>
  );
};

export default Footer;
