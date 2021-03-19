import React from "react";
import Ratings from "react-ratings-declarative";
import { connect } from "react-redux";
import { _addPestReview } from "../../store/reviews";

class PestReview extends React.Component {
  constructor() {
    super();
    this.state = {
      rating: 0
    };
    this.changeRating = this.changeRating.bind(this);
  }

  changeRating(newRating) {
    // console.log('category', category)
    console.log("newRating", newRating);
    this.setState({
      rating: newRating
    });
    this.props.sendPest(newRating);
    console.log(this.state, "this.state in change rating");
  }
  render() {
    return (
      <div>
        <p>Pest Control Ratings</p>
        <Ratings
          rating={this.state.rating}
          widgetRatedColors="gold"
          widgetHoverColors="gold"
          changeRating={this.changeRating}
          widgetDimensions="20px"
        >
          <Ratings.Widget />
          <Ratings.Widget />
          <Ratings.Widget />
          <Ratings.Widget />
          <Ratings.Widget />
        </Ratings>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    sendPest: rating => dispatch(_addPestReview(rating))
  };
};

export default connect(null, mapDispatchToProps)(PestReview);
