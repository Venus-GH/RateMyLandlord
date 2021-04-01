import React from "react";
import { updateThumbs } from "../store/reviewList";
import { connect } from "react-redux";
import SingleReview from "./SingleReview";

class ReviewList extends React.Component {
  constructor(props) {
    super(props);
    this.clickThumb = this.clickThumb.bind(this);
  }

  clickThumb(reviewId, direction) {
    this.props.changeThumbs(reviewId, direction);
  }

  render() {
    const { reviews, user } = this.props || [];
    return (
      <div className={this.props.type}>
        {reviews.map((review) => {
          return (
            <SingleReview
              key={review.id}
              review={review}
              type={this.props.type}
              user={user}
            />
          );
        })}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    reviews: state.reviewList,
    user: state.user,
  };
};

const mapDispatch = (dispatch) => ({
  changeThumbs: (reviewId, direction) =>
    dispatch(updateThumbs(reviewId, direction)),
});

export default connect(mapState, mapDispatch)(ReviewList);
