import React from "react";
import { TextInput } from "react-materialize";

class AuthorizeReview extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <TextInput
          // id="TextInput-4"
          label="File"
          type="file"
        />
      </div>
    );
  }
}

export default AuthorizeReview;
