import React from "react";
import Ratings from "react-ratings-declarative";
import { connect } from "react-redux";
import { _addResponsivenessReview } from "../../store/reviews";

class KindnessReview extends React.Component {
  constructor() {
    super();
    this.state = {
      rating: 0,
    };
    this.changeRating = this.changeRating.bind(this);
  }

  changeRating(newRating) {
    this.setState({
      rating: newRating,
    });
    this.props.sendResponsiveness(newRating);
  }
  render() {
    return (
      <div>
        <p>Responsiveness Rating</p>
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

const mapDispatchToProps = (dispatch) => {
  return {
    sendResponsiveness: (rating) => dispatch(_addResponsivenessReview(rating)),
  };
};

export default connect(null, mapDispatchToProps)(KindnessReview);
