import React from "react";
import {
  GoogleMap,
  LoadScript,
  StreetViewPanorama,
} from "@react-google-maps/api";
import { connect } from "react-redux";
import { fetchBuilding } from "../store/buildings";
import { Link } from "react-router-dom";
import ReviewList from "./ReviewList";

class BuildingResult extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      landlord: null,
    };
  }

  async componentDidMount() {
    const { address } = this.props.location.state;

    await this.props.fetchBuilding(address);
    this.setState({ isLoading: false, landlord: "Jacobs Brothers" });
  }

  render() {
    const { address, lat, lng } = this.props.location.state;
    const { isLoading } = this.state;
    // const landlord = this.props.building.landlord.name || ""
    const { landlord, reviews } = this.props;
    console.log("reviews:", reviews);

    return (
      <div className="results-view">
        <h2>{address}</h2>
        {landlord.name && (
          <h3>
            This property is managed by {landlord.name}.
            <Link to={`/landlords/${landlord.id}`}>See all reviews.</Link>
          </h3>
        )}
        <div className="container">
          <LoadScript
            googleMapsApiKey="AIzaSyCOopGii1dRKKnMTLI00ilvrrKW64KKLfk"
            libraries={["places"]}
          >
            <GoogleMap
              mapContainerStyle={{ width: "400px", height: "400px" }}
              // center={center}
              zoom={14}
            >
              <StreetViewPanorama
                // address={this.state.address}
                position={{ lat: lat, lng: lng }}
                visible={true}
              />
            </GoogleMap>
          </LoadScript>
          <div>
            {isLoading ? (
              <div>Loading...</div>
            ) : landlord.name ? (
              <div>
                <h4>{reviews.length} Reviews</h4>
                <ReviewList reviews={reviews} />
              </div>
            ) : (
              <div>No reviews yet... Add a review to get started.</div>
            )}
          </div>
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
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchBuilding: (address) => dispatch(fetchBuilding(address)),
  };
};

export default connect(mapState, mapDispatch)(BuildingResult);
