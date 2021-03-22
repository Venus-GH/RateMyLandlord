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
        <h4>{address}</h4>
        <div className="results-container">
          <div className="results-street-view">
            <LoadScript
              googleMapsApiKey="AIzaSyCOopGii1dRKKnMTLI00ilvrrKW64KKLfk"
              libraries={["places"]}
            >
              <GoogleMap
                mapContainerStyle={{ width: "28vw", height: "60vh" }}
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
              <div>
                <h5>Owned by {landlord.name}</h5>
                <Link to={`/landlords/${landlord.id}`}>
                  See all reviews for {landlord.name}.
                </Link>
              </div>
            )}
            <h4>
              <Link to={`/landlords/${landlord.id}/add`}>Add a review</Link>
            </h4>

            {isLoading ? (
              <div className="progress">
                <div className="indeterminate"></div>
              </div>
            ) : landlord.name ? (
              <div>
                <h6>{reviews.length} Reviews</h6>
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
                mapContainerStyle={{ width: "30vw", height: "80vh" }}
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
