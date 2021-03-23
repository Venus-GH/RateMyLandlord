import React from "react";
import moment from "moment";
import { Row, Col, Card, Icon, Chip } from "react-materialize";

const ReviewList = ({ reviews }) => {
  console.log("reviews:", reviews);
  const grade = { 1: "F", 2: "D", 3: "C", 4: "B", 5: "A" };
  return (
    <Col>
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
                {/* <div className="review-address">{review.address}</div> */}
                <div className="review-date">
                  {moment(review.createdAt).format("LL")}
                </div>
              </div>
              <div className="review-ratings">
                <div>Kindness: {review.kindness}</div>
                <div>maintenance: {review.maintenance}</div>
                <div>responsiveness: {review.responsiveness}</div>
                <div>pest Control: {review.pestControl}</div>
              </div>
              <div className="review-comments">{review.comments}</div>
              <div className="review-tags">
                {review.tags.map((tag) => {
                  return <Chip key={tag.length}>{tag}</Chip>;
                })}
                <Chip>slumlord</Chip>
                <Chip>unresponsive</Chip>
              </div>
              <div className="review-buttons">
                <div className="review-thumbs">
                  <Icon>thumb_up</Icon>
                  <Icon>thumb_down</Icon>
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
    </Col>
  );
};

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
