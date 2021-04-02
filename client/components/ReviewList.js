/* eslint-disable complexity */
import React from "react";
import { connect } from "react-redux";
import { updateThumbs, deleteReview } from "../store/reviewList";
import moment from "moment";
import { Modal, Button, Icon, Chip } from "react-materialize";
import { Link } from "react-router-dom";
import ContactForm from "./ContactForm";
import ReportForm from "./ReportForm";

class ReviewList extends React.Component {
  constructor(props) {
    super(props);
    this.clickThumb = this.clickThumb.bind(this);
    this.deleteReviewOnClick = this.deleteReviewOnClick.bind(this);
  }

  clickThumb(reviewId, direction) {
    this.props.changeThumbs(reviewId, direction);
  }

  deleteReviewOnClick(reviewId) {
    this.props.deleteReview(reviewId);
  }

  render() {
    const { reviews, user } = this.props || [];
    const grade = { 1: "F", 2: "D", 3: "C", 4: "B", 5: "A" };
    return (
      <div className={this.props.type}>
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
                  {this.props.type === "user-review-list" ? (
                    <div className="user-review-list-name-delete">
                      <Link
                        className="user-review-landlord-name"
                        to={`/landlords/${review.landlordId}`}
                      >
                        {review.landlord.name}
                      </Link>
                      <button
                        className="transparent-button trash"
                        type="button"
                        onClick={() => this.deleteReviewOnClick(review.id)}
                      >
                        <Icon>delete</Icon>
                      </button>
                    </div>
                  ) : (
                    <div className="review-address">
                      {review.building.address.slice(0, -5)}
                    </div>
                  )}

                  {this.props.type === "user-review-list" ? (
                    <div className="review-date" id="user-review-date-edit">
                      <div className="user-review-date">
                        {moment(review.createdAt).format("LL")}
                      </div>
                      <button
                        className="transparent-button"
                        type="button"
                        onClick={() => this.deleteReviewOnClick(review.id)}
                      >
                        <Icon>delete</Icon>
                      </button>
                    </div>
                  ) : (
                    <div className="review-date">
                      {moment(review.createdAt).format("LL")}
                    </div>
                  )}
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
                      <button
                        className="transparent-button"
                        type="button"
                        onClick={() => this.clickThumb(review.id, "up")}
                      >
                        <Icon>thumb_up</Icon>
                      </button>
                      <span>{review.thumbsUp}</span>
                    </div>

                    <div>
                      <button
                        className="transparent-button"
                        type="button"
                        onClick={() => this.clickThumb(review.id, "down")}
                      >
                        <Icon>thumb_down</Icon>
                      </button>
                      <span>{review.thumbsDown}</span>
                    </div>
                  </div>
                  <div className="review-mail-flag">
                    {review.allowContact ? (
                      <Modal
                        actions={[
                          <Button
                            key="1"
                            flat
                            modal="close"
                            node="button"
                            waves="green"
                          >
                            Close
                          </Button>,
                        ]}
                        bottomSheet={false}
                        fixedFooter={false}
                        header="Contact By E-mail"
                        id="Modal-0"
                        open={false}
                        options={{
                          dismissible: true,
                          endingTop: "10%",
                          inDuration: 250,
                          onCloseEnd: null,
                          onCloseStart: null,
                          onOpenEnd: null,
                          onOpenStart: null,
                          opacity: 0.5,
                          outDuration: 250,
                          preventScrolling: true,
                          startingTop: "4%",
                        }}
                        trigger={
                          <Button
                            tooltip="Contact this user"
                            className="transparent-button"
                          >
                            <Icon>email</Icon>
                          </Button>
                        }
                      >
                        {!user.id ? (
                          <p>
                            <Link to="/login">Login</Link> to contact this user!
                          </p>
                        ) : (
                          <ContactForm
                            to_email={review.user.email}
                            reply_to={user.email}
                          />
                        )}
                      </Modal>
                    ) : (
                      ""
                    )}
                    <Modal
                      actions={[
                        <Button
                          key="2"
                          flat
                          modal="close"
                          node="button"
                          waves="green"
                        >
                          Close
                        </Button>,
                      ]}
                      bottomSheet={false}
                      fixedFooter={false}
                      header="Report this Review"
                      id="Modal-0"
                      open={false}
                      options={{
                        dismissible: true,
                        endingTop: "10%",
                        inDuration: 250,
                        onCloseEnd: null,
                        onCloseStart: null,
                        onOpenEnd: null,
                        onOpenStart: null,
                        opacity: 0.5,
                        outDuration: 250,
                        preventScrolling: true,
                        startingTop: "4%",
                      }}
                      trigger={
                        <Button className="transparent-button" tooltip="Report">
                          <Icon className="icon-flag">flag</Icon>
                        </Button>
                      }
                    >
                      {!user.id ? (
                        <p>
                          <Link to="/login">Login</Link> to report this review!
                        </p>
                      ) : (
                        <ReportForm reply_to={user.email} />
                      )}
                    </Modal>
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
  return {
    reviews: state.reviewList,
    user: state.user,
  };
};

const mapDispatch = (dispatch) => ({
  changeThumbs: (reviewId, direction) =>
    dispatch(updateThumbs(reviewId, direction)),
  deleteReview: (reviewId) => dispatch(deleteReview(reviewId)),
});

export default connect(mapState, mapDispatch)(ReviewList);
