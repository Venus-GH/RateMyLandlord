import React from "react";
import { connect } from "react-redux";

import PestReview from "./PestReview";
import KindnessReview from "./KindnessReview";
import ResponsivenessReview from "./ResponsivenessReview";
import MaintenanceReview from "./MaintenanceReview";

import { addReview } from "../../store/reviews";

import { Button, TextInput } from "react-materialize";

class ReviewForm extends React.Component {
  constructor() {
    super();
    this.state = {
      bedrooms: "",
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    console.log("this.state in review form", this.state);
  }
  onChange(event) {
    this.setState({
      [event.target.id]: event.target.value,
    });
    console.log("this.state", this.state);
  }
  onSubmit() {
    console.log("this.props", this.props);
    console.log("this.state", this.state);
    let newReview = {
      ...this.props.reviews,
      landlordName: "hello",
      grade: 5,
      bedrooms: 2,
      rent: 1500,
      leaseLength: 12,
    };
    let newerReview = {
      ...this.props.reviews,
      ...this.state,
      landlordName: "test",
      grade: "A",
    };
    this.props.addReview(newerReview);
    // this.props.addReview(this.props.reviews)
  }
  render() {
    return (
      <div id="reviewForm">
        <PestReview />
        <KindnessReview />
        <ResponsivenessReview />
        <MaintenanceReview />
        <p>How many bedrooms?</p>
        <TextInput id="bedrooms" placeholder="ex: 2" onChange={this.onChange} />
        <p>How much was rent?</p>
        <TextInput id="rent" placeholder="ex: 1500" onChange={this.onChange} />
        <p>When did you move in?</p>
        <TextInput
          id="startDate"
          placeholder="ex: 01/01/2021"
          onChange={this.onChange}
        />
        <p>How long was your lease length in months?</p>
        <TextInput
          id="leaseLength"
          placeholder="ex: 12"
          onChange={this.onChange}
        />
        <p>Any additional comments?</p>
        <TextInput
          id="comments"
          placeholder="ex: Wonderful landlord. Sad to move."
          onChange={this.onChange}
        />
        <h4> TAGS </h4>
        <Button
          onClick={this.onSubmit}
          node="button"
          style={{
            marginRight: "5px",
          }}
          waves="light"
        >
          Submit Review
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    reviews: state.reviews,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addReview: (review) => dispatch(addReview(review)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewForm);
