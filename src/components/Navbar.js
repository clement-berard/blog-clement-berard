import React from 'react'
import { Link } from 'gatsby'
import { FaChild } from 'react-icons/fa'
import logo from '../img/logo.svg'

const Navbar = class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false,
      navBarActiveClass: '',
    }
  }

  toggleHamburger = () => {
    // toggle the active boolean in the state
    this.setState(
      {
        active: !this.state.active,
      },
      // after state has been updated,
      () => {
        // set the class in state for the navbar accordingly
        this.state.active
          ? this.setState({
              navBarActiveClass: 'is-active',
            })
          : this.setState({
              navBarActiveClass: '',
            })
      }
    )
  }

  render() {
    return (
      <nav
        className="navbar is-transparent main-nav-bar"
        role="navigation"
        aria-label="main-navigation"
        id="mainNav"
      >
        <div className="container">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item">
              <img src={logo} alt="logo" />
            </Link>
            {/* Hamburger menu */}
            <div
              className={`navbar-burger burger ${this.state.navBarActiveClass}`}
              data-target="navMenu"
              onClick={() => this.toggleHamburger()}
            >
              <span />
              <span />
              <span />
            </div>
          </div>
          <div
            id="navMenu"
            className={`navbar-menu ${this.state.navBarActiveClass}`}
          >
            <div className="navbar-start has-text-centered">
              <Link to="/" className="navbar-item site-title">
                CBlog
              </Link>
              <span className="separator"></span>
              <Link className="navbar-item" to="/categories">
                Catégories
              </Link>
              <Link className="navbar-item" to="/tags">
                Tags
              </Link>
            </div>
            <div className="navbar-end has-text-centered">
              <a
                className="navbar-item"
                href="https://berard.dev"
                target="_blank"
              >
                <FaChild />
              </a>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar
