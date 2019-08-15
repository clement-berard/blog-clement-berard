import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import './all.scss';
import SEO from './seo';

const TemplateWrapper = ({ children }) => (
  <>
    <SEO />
    <Navbar />
    <div>{children}</div>
    <Footer />
  </>
);

export default TemplateWrapper;
