import React from "react";
import { connect } from "react-redux";
import { fetchBuilding } from "../store/buildings";
import { Link } from "react-router-dom";
import { setReviews } from "../store/reviewList";
import { setSingleLandlord } from "../store/singleLandlord";
import { Icon } from "leaflet";
import BuildingResultsTabs from "./BuildingResultsTabs";
import BulidingResultsReviews from "./BuildingResultsReviews";

import Loading from "./Loading";

export const icon = new Icon({
  iconUrl: "./img/orangemapmarker.png",
});

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
    await this.props.setReviews(this.props.building.reviews);
    await this.props.setLandlord(this.props.building.landlord);

    this.setState({ isLoading: false });
    document.addEventListener("DOMContentLoaded", function () {
      var elems = document.querySelectorAll(".modal");
      M.Modal.init(elems, options);
    });
  }

  async componentDidUpdate(prevProps) {
    const { address } = this.props.location.state;
    const prevAddress = prevProps.location.state.address;
    if (address !== prevAddress) {
      this.setState({ isLoading: true });
      await this.props.fetchBuilding(address);
      this.setState({ isLoading: false });
    }
    // if (
    //   JSON.stringify(this.props.building.reviews) !==
    //   JSON.stringify(prevProps.reviews)
    // ) {
    //   this.props.setReviews(this.props.building.reviews);
    // }
  }

  render() {
    const { address, lat, lng } = this.props.location.state;
    const { isLoading } = this.state;
    const { landlord, user, reviews } = this.props || {};

    return isLoading ? (
      <Loading />
    ) : (
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
          <BuildingResultsTabs lat={lat} lng={lng} />
          {reviews && (
            <BulidingResultsReviews
              user={user}
              landlord={landlord}
              address={address}
              lat={lat}
              lng={lng}
              reviews={reviews}
              isLoading={isLoading}
            />
          )}
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    building: state.buildings.single,
    landlord: state.landlord,
    reviews: state.reviewList,
    user: state.user,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchBuilding: (address) => dispatch(fetchBuilding(address)),
    setReviews: (reviews) => dispatch(setReviews(reviews)),
    setLandlord: (landlord) => dispatch(setSingleLandlord(landlord)),
  };
};

export default connect(mapState, mapDispatch)(BuildingResult);
