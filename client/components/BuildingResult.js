import React from "react";
import {
  GoogleMap,
  LoadScript,
  StreetViewPanorama,
  Marker,
} from "@react-google-maps/api";
import { connect } from "react-redux";
import { fetchBuilding } from "../store/buildings";
import { Link } from "react-router-dom";
import ReviewList from "./ReviewList";
import ReviewForm from "./Reviews/ReviewHome";
import { Modal, Button, Tabs, Tab } from "react-materialize";
import { setReviews } from "../store/reviewList";

class BuildingResult extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
    };
  }

  async componentDidMount() {
    const { address } = this.props.location.state;
    await this.props.fetchBuilding(address);
    this.setState({ isLoading: false });
    document.addEventListener("DOMContentLoaded", function () {
      var elems = document.querySelectorAll(".modal");
      M.Modal.init(elems, options);
    });
  }

  componentDidUpdate(prev) {
    if (JSON.stringify(this.props.reviews) !== JSON.stringify(prev.reviews)) {
      this.props.setReviews(this.props.reviews);
    }
  }

  render() {
    const { address, lat, lng } = this.props.location.state;
    const { isLoading } = this.state;
    const { landlord, user, reviews } = this.props || {};
    const coord = { lat, lng };

    return (
      <div className="results-view">
        {landlord.name ? (
          <h6 id="results-header">
            <span id="results-num-reviews">{reviews.length}</span> reviews for{" "}
            <span id="results-landlord-name">
              <Link to={`/landlords/${landlord.id}`}>{landlord.name}</Link>
            </span>{" "}
            at <span id="results-address">{address}</span>
          </h6>
        ) : (
          <h5 id="results-header">
            {"No reviews (yet!) for"}{" "}
            <span id="results-address">{address}</span>
          </h5>
        )}

        <div className="results-container">
          <div className="results-maps">
            <Tabs className="tab-demo z-depth-1">
              <Tab
                options={{
                  duration: 300,
                  onShow: null,
                  responsiveThreshold: Infinity,
                  swipeable: false,
                }}
                title="Street View"
              >
                <LoadScript
                  googleMapsApiKey="AIzaSyCOopGii1dRKKnMTLI00ilvrrKW64KKLfk"
                  libraries={["places"]}
                >
                  <GoogleMap
                    mapContainerStyle={{ width: "30vw", height: "80vh" }}
                    // center={center}
                    zoom={14}
                  >
                    <StreetViewPanorama
                      // address={this.state.address}
                      position={coord}
                      visible={true}
                    />
                  </GoogleMap>
                </LoadScript>
              </Tab>
              <Tab
                active
                options={{
                  duration: 300,
                  onShow: null,
                  responsiveThreshold: Infinity,
                  swipeable: false,
                }}
                title="Map"
              >
                <LoadScript
                  googleMapsApiKey="AIzaSyCOopGii1dRKKnMTLI00ilvrrKW64KKLfk"
                  libraries={["places"]}
                >
                  <GoogleMap
                    mapContainerStyle={{ width: "30vw", height: "80vh" }}
                    center={coord}
                    zoom={14}
                  >
                    <Marker position={coord} />
                  </GoogleMap>
                </LoadScript>
              </Tab>
            </Tabs>
          </div>
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
                  <Button flat modal="close" node="button" waves="green">
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
                // root={[object HTMLBodyElement]}
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
                <h6>{reviews.length} Reviews</h6>
                {reviews.length > 0 ? <ReviewList landlordPage={false} /> : ""}
              </div>
            ) : (
              <div>No reviews yet... Add a review to get started.</div>
            )}
          </div>
          {/* <div className="result-map">
          </div> */}
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    building: state.buildings.single,
    landlord: state.buildings.landlord,
    reviews: state.buildings.reviews,
    user: state.user,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchBuilding: (address) => dispatch(fetchBuilding(address)),
    setReviews: (reviews) => dispatch(setReviews(reviews)),
  };
};

export default connect(mapState, mapDispatch)(BuildingResult);
