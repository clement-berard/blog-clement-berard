import React from 'react';

const Footer = () => {
  const dt = new Date();
  const LinkWebsite = () => (
    <a href="https://berard.dev" target="_blank" rel="noopener noreferrer">
      Clément BERARD
    </a>
  );
  const text = `© ${dt.getFullYear()}`;
  return (
    <footer id="footer-component" className="footer">
      <div className="content has-text-centered">
        <LinkWebsite />
        {' '}
        {text}
      </div>
    </footer>
  );
};

export default Footer;
