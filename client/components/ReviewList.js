import React from "react";
import moment from "moment";
import { Modal, Button } from "react-materialize";
import { Link } from "react-router-dom";
import ContactForm from "./ContactForm";

const ReviewList = ({ reviews, user }) => {
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
                {review.allowContact ? (
                  <Modal
                    actions={[
                      <Button flat modal="close" node="button" waves="green">
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
                    // root={[object HTMLBodyElement]}
                    trigger={<Button node="button">Contact</Button>}
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
