import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import { LoadScript, Autocomplete } from "@react-google-maps/api";

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div className="navbar">
    <nav>
      <div className="nav-wrapper grey darken-4">
        <Link to="/" className="brand-logo">
          Rate My Landlord
        </Link>
        {isLoggedIn ? (
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {/* The navbar will show these links after you log in */}
            <li>
              {" "}
              <Link to="/landlords">Landlords</Link>
            </li>
            <li>
              <Link to="/home">Home</Link>
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
              <form>
                <div className="input-field">
                  <input id="search" type="search" required />
                  <label className="label-icon" htmlFor="search">
                    <i className="material-icons">search</i>
                  </label>
                  <i className="material-icons">close</i>
                </div>
              </form>
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
  </div>
);

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
