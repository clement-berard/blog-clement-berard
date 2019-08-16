import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'gatsby';
import { FaChild, FaGithub } from 'react-icons/fa';
import {
  DARK_VIOLET,
  LIGHT_VIOLET,
  PALETTE_6,
  LIGHT_GRAY,
} from '../../config/theme.config';
import { centerFlex } from '../utils/styled.utils';
import logo from '../img/logo-cblog.svg';

const NavBlock = styled.nav`
  height: 80px;
  border-bottom: 1px solid ${LIGHT_VIOLET};
`;
const NavContainerCss = css`
  height: 100%;
  width: 100%;
  background-color: ${DARK_VIOLET};
  display: grid;

  & > * {
    a {
      transition: background-color 0.2s linear;
      width: 100%;
      height: 100%;
      color: ${LIGHT_GRAY};
      ${centerFlex}
      &:hover {
        color: ${LIGHT_GRAY};
        background-color: ${LIGHT_VIOLET} !important;
      }
      &.site-title {
        &:hover {
          background-color: ${PALETTE_6} !important;
        }
      }
    }
    &:not(:last-child) {
      border-right: 1px solid ${LIGHT_VIOLET};
    }
    ${centerFlex}
  }

  .site-title {
    img {
      height: 70px;
    }
  }
`;

const NavContainerDesktop = styled.div`
  display: none;
  @media (min-width: 769px) {
    ${NavContainerCss};
    grid-template-columns: 1.5fr 1fr 1fr 4fr 0.3fr 0.3fr;
  }
`;

const NavContainerMobile = styled.div`
  display: none;
  @media (max-width: 768px) {
    ${NavContainerCss};
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const Navbar = () => (
  <NavBlock role="navigation" aria-label="main-navigation">
    <NavContainerDesktop>
      <div>
        <Link to="/" className="site-title">
          <img src={logo} alt="CBlog" />
        </Link>
      </div>
      <div>
        <Link to="/categories">Catégories</Link>
      </div>
      <div>
        <Link to="/tags">Tags</Link>
      </div>
      <div />
      <div>
        <a href="https://berard.dev" target="_blank" rel="noopener noreferrer">
          <FaChild />
        </a>
      </div>
      <div>
        <a
          href="https://github.com/clement-berard"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub />
        </a>
      </div>
    </NavContainerDesktop>
    <NavContainerMobile>
      <div>
        <Link to="/" className="site-title">
          <img src={logo} alt="CBlog" />
        </Link>
      </div>
      <div>
        <Link to="/categories">Catégories</Link>
      </div>
      <div>
        <Link to="/tags">Tags</Link>
      </div>
      <div />
    </NavContainerMobile>
  </NavBlock>
);

export default Navbar;
