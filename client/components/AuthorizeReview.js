import React from "react";
// import { TextInput } from "react-materialize";
// const vision = require('@google-cloud/vision');

// // Imports the Google Cloud client libraries
// const vision = require('@google-cloud/vision');

// // Creates a client
// const client = new vision.ImageAnnotatorClient();

// /**
//  * TODO(developer): Uncomment the following lines before running the sample.
//  */
// const bucketName = 'auth-images';
// // const fileName = 'Path to file within bucket, e.g. path/to/image.png';

// // Performs text detection on the gcs file
// const [result] = await client.textDetection(`gs://${bucketName}/${fileName}`);
// const detections = result.textAnnotations;
// // console.log('Text:');
// detections.forEach(text => console.log(text));

class AuthorizeReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileName: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    console.log(e.value);
  }

  onChange(e) {
    this.setState({ fileName: e.target.value });
  }

  render() {
    return (
      <form onSubmit={handleSubmit}>
        <TextInput
          // id="TextInput-4"
          label="File"
          type="file"
          onChange={this.onChange}
        />
        <button type="submit">submit</button>
      </form>
    );
  }
}

export default AuthorizeReview;
