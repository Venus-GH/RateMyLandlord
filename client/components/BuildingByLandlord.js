import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";

export const icon = new Icon({
  iconUrl: "/mapmarker.png",
  iconSize: [40, 40],
});

const BuildingByLandlord = ({ buildings }) => {
  return (
    <div className="section">
      <MapContainer
        center={[40.758436620589, -73.95404343903151]}
        zoom={10}
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        {buildings.map((building) => (
          <Marker
            key={building.id}
            icon={icon}
            position={[building.latitude, building.longitude]}
          >
            <Popup>
              {building.address} <br />
              {building.borough}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default BuildingByLandlord;
