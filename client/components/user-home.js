import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import AuthorizeReview from "./AuthorizeReview";

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const { email } = props;

  return (
    <div>
      <h3>hello Welcome, {email}</h3>
      <AuthorizeReview />
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.user.email,
  };
};

export default connect(mapState)(UserHome);

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string,
};
