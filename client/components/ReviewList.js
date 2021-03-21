import React from "react";
import moment from "moment";

const ReviewList = ({ reviews }) => {
  return (
    <div className="section">
      {reviews &&
        reviews.map((review) => {
          return (
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
          );
        })}
    </div>
  );
};

export default ReviewList;
