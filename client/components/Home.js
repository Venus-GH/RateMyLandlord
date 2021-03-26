import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  LoadScript,
  Autocomplete,
  useLoadScript,
} from "@react-google-maps/api";
import { fetchAllBuildings } from "../store/buildings";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import { fetchLandlords } from "../store/landlords";
import { Dropdown } from "react-materialize";
import GoogleSearchBar from "./GoogleSearchBar";

export const icon = new Icon({
  iconUrl: "./orangemapmarker.png",
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 40.73061,
      lng: -73.935242,
      address: "",
      searchBy: "address",
    };
    this.autocomplete = null;
    this.onLoad = this.onLoad.bind(this);
    this.onPlaceChanged = this.onPlaceChanged.bind(this);
    this.handleSearchOption = this.handleSearchOption.bind(this);
  }

  async componentDidMount() {
    await this.props.getAll();
    await this.props.getLandlords();
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
        address: place.formatted_address,
      });
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  }

  handleSearchOption(e) {
    const option = e.target.name;
    this.setState({ searchBy: option });
  }

  render() {
    const { address, lat, lng, searchBy } = this.state;

    const { places, landlords } = this.props;
    return (
      <div className="home-view">
        <div>
          <MapContainer center={[lat, lng]} zoom={12} className="map-container">
            <TileLayer
              attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
              url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
            />
            {places.map((place) => (
              <Marker
                className="home-marker"
                key={place.id}
                icon={icon}
                position={[Number(place.latitude), Number(place.longitude)]}
              >
                <Popup>
                  <Link to={`/landlords/${place.landlordId}`}>
                    {place.address}
                  </Link>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
          <LoadScript
            googleMapsApiKey="AIzaSyCOopGii1dRKKnMTLI00ilvrrKW64KKLfk"
            libraries={["places"]}
          >
            <div className="home-input">
              <div>
                <a
                  className="btn-small searchby"
                  name="address"
                  onClick={this.handleSearchOption}
                >
                  Search by Address
                </a>
                <a
                  className="btn-small searchby"
                  name="landlord"
                  onClick={this.handleSearchOption}
                >
                  Search by Landlord
                </a>
              </div>
              {searchBy === "address" ? (
                <Autocomplete
                  onLoad={this.onLoad}
                  onPlaceChanged={this.onPlaceChanged}
                >
                  <input placeholder="Enter an address to get started" />
                </Autocomplete>
              ) : (
                <Dropdown
                  className="home-dropdown"
                  option={{
                    alignment: "center",
                    constrainWidth: true,
                  }}
                  trigger={<input placeholder="Search our database" />}
                >
                  <Link to="/review">
                    <div className="select-option">
                      <div>Don't see who you're looking for?</div>
                      <button type="button" className="btn-small">
                        Add
                      </button>
                    </div>
                  </Link>
                  {landlords.map((landlord) => (
                    <Link to={`/landlords/${landlord.id}`}>
                      <div className="select-option">
                        <div>{landlord.name}</div>

                        <button type="button" className="btn-small">
                          Search
                        </button>
                      </div>
                    </Link>
                  ))}
                </Dropdown>
              )}
              {address.length ? (
                <Link
                  to={{
                    pathname: "/results",
                    state: {
                      address,
                      lat,
                      lng,
                    },
                  }}
                >
                  <button
                    type="button"
                    className="waves-effect waves-light btn-small"
                  >
                    Search
                  </button>
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

const mapState = (state) => {
  return {
    places: state.buildings.all,
    landlords: state.allLandlords,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getAll: () => dispatch(fetchAllBuildings()),
    getLandlords: () => dispatch(fetchLandlords()),
  };
};

export default connect(mapState, mapDispatch)(Home);
