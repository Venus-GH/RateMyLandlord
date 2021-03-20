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
  }

  render() {
    const { address, lat, lng } = this.props.location.state;
    const { isLoading } = this.state;
    const { landlord, reviews } = this.props;
    const coord = { lat, lng };

    return (
      <div className="results-view">
        <h2>{address}</h2>
        <div className="results-container">
          <div className="results-street-view">
            <LoadScript
              googleMapsApiKey="AIzaSyCOopGii1dRKKnMTLI00ilvrrKW64KKLfk"
              libraries={["places"]}
            >
              <GoogleMap
                mapContainerStyle={{ width: "450px", height: "600px" }}
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
          </div>
          <div className="results-reviews">
            {landlord.name && (
              <h5>
                Landlord: {landlord.name}.
                <Link to={`/landlords/${landlord.id}`}>See all reviews.</Link>
              </h5>
            )}
            <h3>Add a review</h3>
            {isLoading ? (
              <div className="progress">
                <div className="indeterminate"></div>
              </div>
            ) : landlord.name ? (
              <div>
                <h4>{reviews.length} Reviews</h4>
                <ReviewList reviews={reviews} />
              </div>
            ) : (
              <div>No reviews yet... Add a review to get started.</div>
            )}
          </div>
          <div className="result-map">
            <LoadScript
              googleMapsApiKey="AIzaSyCOopGii1dRKKnMTLI00ilvrrKW64KKLfk"
              libraries={["places"]}
            >
              <GoogleMap
                mapContainerStyle={{ width: "500px", height: "700px" }}
                center={coord}
                zoom={13}
              >
                <Marker position={coord} />
              </GoogleMap>
            </LoadScript>
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
