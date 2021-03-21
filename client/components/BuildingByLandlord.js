import React, { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import BuildingList from "./BuildingList";

export const icon = new Icon({
  iconUrl: "/mapmarker.png",
  iconSize: [40, 40],
});

const BuildingByLandlord = ({ buildings }) => {
  const [activeBuilding, setActiveBuilding] = useState(null);

  return (
    <div className="section">
      <div className="col s12 m8 l7">
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
              <Popup
                onOpen={() => setActiveBuilding(building)}
                onClose={() => {
                  setActiveBuilding(null);
                }}
              >
                {building.address}
                <br />
                {building.borough}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      <div className="col s12 m4 l5">
        <BuildingList buildings={buildings} activeBuilding={activeBuilding} />
      </div>
    </div>
  );
};

export default BuildingByLandlord;
