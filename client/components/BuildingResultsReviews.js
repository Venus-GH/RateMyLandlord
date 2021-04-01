import React from "react";
import { Link } from "react-router-dom";
import ReviewList from "./ReviewList";
import ReviewForm from "./Reviews/ReviewHome";
import { Modal, Button } from "react-materialize";

class BulidingResultsReviews extends React.Component {
  render() {
    const {
      landlord,
      user,
      reviews,
      isLoading,
      lat,
      lng,
      address,
    } = this.props;
    return (
      <div className="results-reviews">
        {landlord.name && (
          <div>
            <h5>
              See all reviews for{" "}
              <Link to={`/landlords/${landlord.id}`}>{landlord.name}</Link>.
            </h5>
          </div>
        )}
        {user.id ? (
          <Modal
            actions={[
              <Button key="1" flat modal="close" node="button" waves="green">
                Close
              </Button>,
            ]}
            bottomSheet={false}
            fixedFooter={false}
            header="Review Landlord"
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
            trigger={<Button node="button">Review Landlord</Button>}
          >
            <ReviewForm
              address={address}
              landlord={landlord}
              latitude={lat}
              longitude={lng}
            />
          </Modal>
        ) : (
          <Link to="/login">Login to submit a review!</Link>
        )}

        {isLoading ? (
          <div className="progress">
            <div className="indeterminate"></div>
          </div>
        ) : landlord.name ? (
          <div>
            <h6 className="building-num-reviews">
              {reviews.length} {reviews.length === 1 ? "Review" : "Reviews"}
            </h6>

            {reviews.length > 0 ? (
              <ReviewList type="building-review-list" />
            ) : (
              ""
            )}
          </div>
        ) : (
          <div>No reviews yet... Add a review to get started.</div>
        )}
      </div>
    );
  }
}

export default BulidingResultsReviews;
