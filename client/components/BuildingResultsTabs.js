import React from "react";
import { GoogleMap, StreetViewPanorama } from "@react-google-maps/api";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { Tabs, Tab } from "react-materialize";
import { icon } from "./BuildingResult";

class BuildingResultsTabs extends React.Component {
  render() {
    const { lat, lng } = this.props;
    return (
      <div className="results-maps">
        <Tabs className="tab-demo z-depth-1">
          <Tab
            options={{
              duration: 300,
              onShow: null,
              responsiveThreshold: Infinity,
              swipeable: false,
            }}
            title="Map"
          >
            <MapContainer
              center={[lat, lng]}
              zoom={13}
              className="single-building-map"
            >
              <TileLayer
                attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
                url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
              />
              <Marker
                className="home-marker"
                icon={icon}
                position={[Number(lat), Number(lng)]}
              />
            </MapContainer>
          </Tab>
          <Tab
            active
            options={{
              duration: 300,
              onShow: null,
              responsiveThreshold: Infinity,
              swipeable: false,
            }}
            title="Street View"
          >
            <GoogleMap mapContainerStyle={{ width: "30vw", height: "65vh" }}>
              <StreetViewPanorama
                position={{ lat: Number(lat), lng: Number(lng) }}
                visible={true}
              />
            </GoogleMap>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default BuildingResultsTabs;
