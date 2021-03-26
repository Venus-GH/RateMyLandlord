import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import { Icon } from "react-materialize";
import "materialize-css";

class Navbar extends React.Component {
  componentDidMount() {
    document.addEventListener("DOMContentLoaded", function () {
      var elems = document.querySelectorAll(".sidenav");
      var instances = M.Sidenav.init(elems);
    });
  }

  render() {
    const { handleClick, isLoggedIn } = this.props;
    return (
      <div className="navbar">
        <nav>
          <div className="nav-wrapper grey darken-4">
            <Link to="/" className="brand-logo">
              Rate My Landlord
            </Link>
            <a href="#" data-target="mobile-demo" className="sidenav-trigger">
              <i className="material-icons">menu</i>
            </a>
            {isLoggedIn ? (
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                {/* The navbar will show these links after you log in */}
                <li>
                  <Link to="/">
                    <Icon className="white-text">search</Icon>
                  </Link>
                </li>
                <li>
                  <Link to="/explore">Explore</Link>
                </li>
                <li>
                  <Link to="/landlords">Landlords</Link>
                </li>
                <li>
                  <Link to="/account">Account</Link>
                </li>
                <li>
                  <a href="#" onClick={handleClick}>
                    Logout
                  </a>
                </li>
              </ul>
            ) : (
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                {/* The navbar will show these links before you log in */}
                <li>
                  <Link to="/">
                    <Icon className="white-text">search</Icon>
                  </Link>
                </li>
                <li>
                  <Link to="/explore">Explore</Link>
                </li>
                <li>
                  <Link to="/landlords">Landlords</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/signup">Sign Up</Link>
                </li>
              </ul>
            )}
          </div>
        </nav>

        <ul className="sidenav" id="mobile-demo">
          {isLoggedIn && (
            <li>
              <Link to="/landlords">Landlords</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/home">Home</Link>
            </li>
          )}
          <li>
            <Link to="/explore">Explore</Link>
          </li>
          <li>
            <Link to="/landlords">Landlords</Link>
          </li>
          {isLoggedIn && (
            <li>
              <a href="#" onClick={handleClick}>
                Logout
              </a>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/account">Account</Link>
            </li>
          )}
          {!isLoggedIn && (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
          {!isLoggedIn && (
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
