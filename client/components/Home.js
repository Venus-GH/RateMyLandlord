import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { LoadScript, Autocomplete } from "@react-google-maps/api";
import { fetchAllBuildings } from "../store/buildings";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import { fetchLandlords } from "../store/landlords";
import { Dropdown, Button, Modal, Row, Textarea } from "react-materialize";
import ReviewForm from "./Reviews/ReviewHome";
import M from "materialize-css";

export const icon = new Icon({
  iconUrl: "./img/orangemapmarker.png",
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
    let elements = document.querySelectorAll(".fixed-action-btn");
    M.FloatingActionButton.init(elements, {
      hoverEnabled: false,
      direction: "left",
    });
    // document.addEventListener('DOMContentLoaded', function() {
    //   var elems = document.querySelectorAll('.fixed-action-btn');
    //   var instances = M.FloatingActionButton.init(elems, options);
    // });
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
          {/* <LoadScript
            googleMapsApiKey="AIzaSyCOopGii1dRKKnMTLI00ilvrrKW64KKLfk"
            libraries={["places"]}
          > */}
          <div className="home-input">
            <div>
              <a
                className="btn-small searchBy"
                name="address"
                onClick={this.handleSearchOption}
              >
                Search by Address
              </a>
              <a
                className="btn-small searchBy"
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
                  constrainWidth: false,
                }}
                trigger={<input placeholder="Search our database" />}
              >
                <Link>
                  <div className="select-option">
                    <div>Don't see who you're looking for?</div>
                    <Button
                      className="modal-trigger"
                      href="#modal1"
                      node="button"
                    >
                      Add
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
                      <ReviewForm />
                    </Modal>
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
          {/* </LoadScript> */}
        </div>

        {/* <div>      <Button
      className="red"
      fab={{
        direction: 'left',
        hoverEnabled: false
      }}
      floating
      large
      node="button"
    >
    <Row>
  <Textarea
    id="Textarea-12"
    l={12}
    m={12}
    s={12}
    xl={12}
  />
</Row>
      </Button>
     
     </div> */}
        <div className="fixed-action-btn">
          <a className="btn-floating btn-large teal">
            <i className="large material-icons helpFAB">help_outline</i>
          </a>
          <ul>
            <li>
              <div id="helpDiv" className="btn-floating">
                Welcome! To get started rating your landlord (or finding out
                about a future landlord), either search above by address or by
                landlord. Are you new to NYC and just want to learn more about
                different boroughs? <br />
                <Link to="/explore">Check out our Explore page!</Link>
              </div>
            </li>
          </ul>
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
