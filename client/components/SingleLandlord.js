/* eslint-disable complexity */
import React from "react";
import { connect } from "react-redux";
import { fetchSingleLandlord } from "../store/singleLandlord";
import { Link } from "react-router-dom";
import ReviewList from "./ReviewList";
import BuildingByLandlord from "./BuildingByLandlord";
import BarChart from "./BarChart";
import { Button, Modal } from "react-materialize";
import ReviewHome from "./Reviews/ReviewHome";
import { setReviews } from "../store/reviewList";
import WordCloud from "./WordCloud";

class SingleLandlord extends React.Component {
  async componentDidMount() {
    await this.props.getSingleLandlord(this.props.match.params.landlordId);
  }

  componentDidUpdate(prev) {
    if (JSON.stringify(this.props.landlord) !== JSON.stringify(prev.landlord)) {
      this.props.setReviews(this.props.landlord.reviews);
    }
  }

  render() {
    const { name } = this.props.landlord;
    const reviews = this.props.landlord.reviews || [];
    const tagData = this.props.landlord.tags || [];
    const buildings = this.props.landlord.buildings || [];
    const avgs = this.props.landlord.avgs || {};
    const mktAvgs = this.props.landlord.mktAvgs || {};
    const avgWouldRecommend = avgs.avgWouldRecommend || {};
    const user = this.props.user;
    // console.log("reviews in single landlord", reviews);

    return (
      <div className="single-landlord">
        <div className="single-landlord-info">
          <div className="single-landlord-card-graphs">
            <div className="single-landlord-card">
              <div className="single-landlord-name">
                <span id="single-landlord-name">{name}</span>{" "}
              </div>
              <div className="single-landlord-grade-recommend">
                <div>
                  Average Grade:{" "}
                  {avgs.avgGrade === "A" && (
                    <span className="single-landlord-grade grade-a">
                      {avgs.avgGrade}
                    </span>
                  )}
                  {avgs.avgGrade === "B" && (
                    <span className="single-landlord-grade grade-b">
                      {avgs.avgGrade}
                    </span>
                  )}
                  {avgs.avgGrade === "C" && (
                    <span className="single-landlord-grade grade-c">
                      {avgs.avgGrade}
                    </span>
                  )}
                  {avgs.avgGrade === "D" && (
                    <span className="single-landlord-grade grade-d">
                      {avgs.avgGrade}
                    </span>
                  )}
                  {avgs.avgGrade === "F" && (
                    <span className="single-landlord-grade grade-f">
                      {avgs.avgGrade}
                    </span>
                  )}{" "}
                  {avgWouldRecommend.true >= avgWouldRecommend.false ? (
                    <span className="landlord-recommended">Recommended</span>
                  ) : (
                    <span className="landlord-not-recommended">
                      NOT Recommended
                    </span>
                  )}
                </div>
              </div>
              <div className="single-landlord-ratings">
                <div>
                  <span className="review-rating-name">Kindness: </span>
                  <span className="review-rating-num">
                    {/* {rating(avgs.avgKindness)} */}
                    {avgs.avgKindness}
                  </span>
                  /5
                </div>
                <div className="review-rating">
                  <span className="review-rating-name">Maintenance: </span>
                  <span className="review-rating-num">
                    {/* {rating(avgs.avgMaintenance)} */}
                    {avgs.avgMaintenance}
                  </span>
                  /5
                </div>
                <div className="review-rating">
                  <span className="review-rating-name">Responsiveness: </span>
                  <span className="review-rating-num">
                    {/* {rating(avgs.avgResponsiveness)} */}
                    {avgs.avgResponsiveness}
                  </span>
                  /5
                </div>
                <div className="review-rating">
                  <span className="review-rating-name">Pest Control: </span>
                  <span className="review-rating-num">
                    {/* {rating(avgs.avgPestControl)} */}
                    {avgs.avgPestControl}
                  </span>
                  /5
                </div>
              </div>
              <div id="single-landlord-ratings">{`(${reviews.length} reviews left for ${buildings.length} properties)`}</div>{" "}
            </div>
            <div className="single-landlord-graphs">
              <BarChart avgs={avgs} mktAvgs={mktAvgs} />
              {/* <div className="col s12 m4 l4"> */}
              {/* <h5>What people say about this landlord...</h5> */}
              <WordCloud tagData={tagData} />
              {/* </div> */}
            </div>
          </div>
          <BuildingByLandlord buildings={buildings} />
        </div>

        <div className="divider" />
        <div className="reviews-single-landlord-view">
          <h5>{reviews.length} reviews</h5>
          {user.id ? (
            <div>
              <Button className="modal-trigger" href="#modal1" node="button">
                Leave a Review
              </Button>
              <Modal
                actions={[
                  <Button flat modal="close" node="button" waves="green">
                    Close
                  </Button>,
                ]}
                bottomSheet={false}
                fixedFooter={false}
                header="Rate This Landlord"
                id="modal1"
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
              >
                <ReviewHome
                  landlord={this.props.landlord}
                  buildings={buildings}
                />
              </Modal>
            </div>
          ) : (
            <Link to="/login">Login to leave a review!</Link>
          )}
          {reviews.length > 0 ? <ReviewList type="landlord-review-list" /> : ""}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    landlord: state.landlord,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSingleLandlord: (id) => dispatch(fetchSingleLandlord(id)),
    setReviews: (reviews) => dispatch(setReviews(reviews)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleLandlord);
