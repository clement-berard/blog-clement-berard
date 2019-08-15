import React from 'react';
import { Link } from 'gatsby';
import { FaChild, FaGithub } from 'react-icons/fa';
import logo from '../img/logo-cblog.svg';

const Navbar = () => (
  <nav
    className="navbar is-transparent main-nav-bar"
    role="navigation"
    aria-label="main-navigation"
    id="mainNav"
  >
    <div className="main-nav-bar--container">
      <div className="main-nav-bar--container--brand">
        <Link to="/" className="site-title">
          <img src={logo} alt="CBlog" />
        </Link>
      </div>
      <div className="main-nav-bar--container--item">
        <Link to="/categories">Catégories</Link>
      </div>
      <div className="main-nav-bar--container--item">
        <Link to="/tags">Tags</Link>
      </div>
      <div />
      <div className="main-nav-bar--container--item">
        <a href="https://berard.dev" target="_blank" rel="noopener noreferrer">
          <FaChild />
        </a>
      </div>
      <div className="main-nav-bar--container--item">
        <a href="https://github.com/clement-berard" target="_blank" rel="noopener noreferrer">
          <FaGithub />
        </a>
      </div>
    </div>
  </nav>
);

export default Navbar;
