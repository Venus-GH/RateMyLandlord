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
      <div>
        <div className="row">
          <div className="col s12 m4 l4">
            <div className="card blue-grey darken-1">
              <div className="card-content white-text">
                <span className="card-title white-text">
                  {name}
                  {avgWouldRecommend.true > avgWouldRecommend.false ? (
                    <span
                      className="new badge white green-text"
                      data-badge-caption="Recommend"
                    />
                  ) : (
                    <span
                      className="new badge white red-text"
                      data-badge-caption="Not Recommended"
                    />
                  )}
                </span>
                <div>
                  <p>Overall Rating: {avgs.avgGrade}</p>
                  <p>Total Reviews: {reviews.length}</p>
                  <p>Total Buildings: {buildings.length}</p>
                </div>
              </div>
              <div className="card-action">
                {user.id ? (
                  <div>
                    <Button
                      className="modal-trigger"
                      href="#modal1"
                      node="button"
                    >
                      Add a Review
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
                  <Link to="/login">Login to submit a review!</Link>
                )}
              </div>
            </div>
            <br />
            <div>
              <BarChart avgs={avgs} mktAvgs={mktAvgs} />
            </div>
          </div>
          <div className="col s12 m4 l4">
            <h5>What people say about this landlord...</h5>
            <WordCloud tagData={tagData} />
          </div>
          <div className="col s12 m4 l4">
            <BuildingByLandlord buildings={buildings} />
          </div>
        </div>
        <div className="divider" />
        <div>
          <h5>{reviews.length} reviews</h5>
          {reviews.length > 0 ? <ReviewList landlordPage={true} /> : ""}
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
