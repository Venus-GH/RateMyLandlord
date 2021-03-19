import React from "react";
import Ratings from "react-ratings-declarative";
import { connect } from "react-redux";
import { _addKindnessReview } from "../../store/reviews";

class KindnessReview extends React.Component {
  constructor() {
    super();
    this.state = {
      rating: 0,
    };
    this.changeRating = this.changeRating.bind(this);
  }

  changeRating(newRating) {
    // console.log('category', category)
    console.log("newRating", newRating);
    this.setState({
      rating: newRating,
    });
    this.props.sendKindness(newRating);
    console.log(this.state, "this.state in change rating");
  }
  render() {
    return (
      <div>
        <p>Kindness Ratings</p>
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

// const mapStateToProps = state => {
//     return {
//       kindness: state.landlord.selected
//     }
//   }

const mapDispatchToProps = (dispatch) => {
  return {
    sendKindness: (rating) => dispatch(_addKindnessReview(rating)),
  };
};

export default connect(null, mapDispatchToProps)(KindnessReview);
