import React from "react";
import {
  GoogleMap,
  LoadScript,
  StreetViewPanorama
} from "@react-google-maps/api";
import { connect } from "react-redux";

class BuildingResult extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      landlord: null
    };
  }

  async componentDidMount() {
    // const { findBuilding } = this.props
    // const { address } = this.props.location.state

    // await findBuilding(address)
    this.setState({ isLoading: false, landlord: "Jacobs Brothers" });
  }

  render() {
    const { address, lat, lng } = this.props.location.state;
    const { isLoading } = this.state;
    // const landlord = this.props.building.landlord.name || ""
    const landlord = this.state.landlord;

    return (
      <div className="results-view">
        <h2>{address}</h2>
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
            ) : landlord ? (
              <div>{landlord} is associated with this address.</div>
            ) : (
              <div>There are no landlords associated with this address.</div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    building: state.building
  };
};

const mapDispatch = state => {
  return {
    findBuilding: add => dispatch(findBuilding(add))
  };
};

export default connect(mapState, mapDispatch)(BuildingResult);
