import React, { Component } from "react";
import { Link } from "react-router-dom";
import { LoadScript, Autocomplete } from "@react-google-maps/api";
import mapboxgl from "mapbox-gl";
mapboxgl.accessToken =
  "pk.eyJ1IjoibnVhbGEtb2Rvbm92YW4iLCJhIjoiY2ttZmJxNWtkMHliajJvbXc5c2o4NjdjbiJ9.M-UhLR8qwMdUjQCagBEfdw";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 40.73061,
      lng: -73.935242,
      address: "",
      zoom: 9
    };
    this.autocomplete = null;
    this.onLoad = this.onLoad.bind(this);
    this.onPlaceChanged = this.onPlaceChanged.bind(this);
    this.mapContainer = React.createRef();
  }

  componentDidMount() {
    const { lng, lat, zoom } = this.state;
    const map = new mapboxgl.Map({
      container: this.mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v10",
      center: [lng, lat],
      zoom: zoom
    });
  }

  onLoad(autocomplete) {
    this.autocomplete = autocomplete;
  }

  onPlaceChanged() {
    if (this.autocomplete !== null) {
      const place = this.autocomplete.getPlace();
      this.setState({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        address: place.formatted_address
      });
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  }

  render() {
    const { address, lat, lng } = this.state;
    return (
      <div className="home-view">
        <div>
          <div ref={this.mapContainer} className="map-container" />
          <LoadScript
            googleMapsApiKey="AIzaSyCOopGii1dRKKnMTLI00ilvrrKW64KKLfk"
            libraries={["places"]}
          >
            <div className="home-input">
              <Autocomplete
                onLoad={this.onLoad}
                onPlaceChanged={this.onPlaceChanged}
              >
                <input />
              </Autocomplete>
              {address.length ? (
                <Link
                  to={{
                    pathname: "/results",
                    state: {
                      address,
                      lat,
                      lng
                    }
                  }}
                >
                  <button onClick={this.handleSubmit}>Enter</button>
                </Link>
              ) : (
                ""
              )}
            </div>
          </LoadScript>
        </div>
      </div>
    );
  }
}

export default Home;
