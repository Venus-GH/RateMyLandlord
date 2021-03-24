import React from "react";
import moment from "moment";
import { Icon, Chip } from "react-materialize";
import { fetchAllReviews, updateThumbs } from "../store/reviewList";
import { connect } from "react-redux";

class ReviewList extends React.Component {
  constructor(props) {
    super(props);
    this.clickThumb = this.clickThumb.bind(this);
  }

  componentDidMount() {
    this.props.fetchAllReviews(this.props.category, this.props.categoryId);
  }

  async clickThumb(reviewId, direction) {
    await this.props.changeThumbs(reviewId, direction);
  }

  render() {
    const { reviews } = this.props;
    console.log("reviews:", reviews);
    const grade = { 1: "F", 2: "D", 3: "C", 4: "B", 5: "A" };
    return (
      <div>
        {reviews.map((review) => {
          return (
            <div key={review.id} className="review-card">
              <div className="review-boxes">
                <div className="review-box">
                  <div className="box-name">Grade</div>
                  <div className="box-value">{grade[review.grade]}</div>
                </div>
                <div className="review-box">
                  <div className="box-name">Recommend?</div>
                  <div className="box-value">
                    {review.wouldRecommend ? "yes" : "no"}
                  </div>
                </div>
              </div>
              <div className="review-body">
                <div className="review-address-date">
                  <div className="review-address">
                    {review.building.address}
                  </div>
                  <div className="review-date">
                    {moment(review.createdAt).format("LL")}
                  </div>
                </div>
                <div className="review-ratings">
                  <div>
                    <span className="review-rating-name">Kindness: </span>
                    <span className="review-rating-num">{review.kindness}</span>
                    /5
                  </div>
                  <div className="review-rating">
                    <span className="review-rating-name">Maintenance: </span>
                    <span className="review-rating-num">
                      {review.maintenance}
                    </span>
                    /5
                  </div>
                  <div className="review-rating">
                    <span className="review-rating-name">Responsiveness: </span>
                    <span className="review-rating-num">
                      {review.responsiveness}
                    </span>
                    /5
                  </div>
                  <div className="review-rating">
                    <span className="review-rating-name">Pest Control: </span>
                    <span className="review-rating-num">
                      {review.pestControl}
                    </span>
                    /5
                  </div>
                </div>
                <div className="review-comments">{review.comments}</div>
                <div className="review-tags">
                  {review.tags.map((tag) => {
                    return <Chip key={Math.random() * 100}>{tag}</Chip>;
                  })}
                </div>
                <div className="review-buttons">
                  <div className="review-thumbs">
                    <div>
                      <Icon onClick={this.clickThumb(review.id, "up")}>
                        thumb_up
                      </Icon>
                      <span>{review.thumbsUp}</span>
                    </div>

                    <div>
                      <Icon onClick={this.clickThumb(review.id, "down")}>
                        thumb_down
                      </Icon>
                      <span>{review.thumbsDown}</span>
                    </div>
                  </div>
                  <div className="review-mail-flag">
                    <Icon>email</Icon>
                    <Icon>flag</Icon>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapState = (state) => {
  console.log("state:", state);
  return {
    reviews: state.reviewList,
  };
};

const mapDispatch = (dispatch) => ({
  fetchAllReviews: (category, id) => dispatch(fetchAllReviews(category, id)),
  updateThumbs: (reviewId, direction) =>
    dispatch(updateThumbs(reviewId, direction)),
});

export default connect(mapState, mapDispatch)(ReviewList);

/*
            <div className="card z-depth-0 blue-grey lighten-5" key={review.id}>
              <div className="card-content grey-text text-darken-4">
                <p className="grey-text">
                  {review.user.preferredName
                    ? review.user.preferredName
                    : "Anonymous"}
                </p>
                <p className="grey-text">
                  {moment(review.createdAt).format("LL")}
                </p>
                <p className="grey-text">{review.comments}</p>
              </div>
            </div>
*/
