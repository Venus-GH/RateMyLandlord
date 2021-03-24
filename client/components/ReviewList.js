import React from "react";
import moment from "moment";
import { Icon, Chip } from "react-materialize";

class ReviewList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      thumbsUp: 0,
      thumbsDown: 0,
    };
    this.clickThumbUp = this.clickThumbUp.bind(this);
    this.clickThumbDown = this.clickThumbDown.bind(this);
  }

  clickThumbUp() {
    this.setState({
      thumbsUp: this.state.thumbsUp + 1,
    });
  }

  clickThumbDown() {
    this.setState({
      thumbsDown: this.state.thumbsDown + 1,
    });
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
                      <Icon onClick={this.clickThumbUp}>thumb_up</Icon>
                      <span>{this.state.thumbsUp}</span>
                    </div>

                    <div>
                      <Icon onClick={this.clickThumbDown}>thumb_down</Icon>
                      <span>{this.state.thumbsDown}</span>
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

export default ReviewList;

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
