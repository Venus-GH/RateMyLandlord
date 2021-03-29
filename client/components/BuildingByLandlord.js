import React, { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Tabs, Tab } from "react-materialize";
import { Icon } from "leaflet";
import BuildingList from "./BuildingList";

export const icon = new Icon({
  iconUrl: "/img/mapmarker.png",
  iconSize: [40, 40],
});

const BuildingByLandlord = ({ buildings }) => {
  const [activeBuilding, setActiveBuilding] = useState(null);

  return (
    <div className="section">
      <div className="col s12 m12 l12">
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
              center={[40.758436620589, -73.95404343903151]}
              zoom={11}
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
                  position={[
                    Number(building.latitude),
                    Number(building.longitude),
                  ]}
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
          </Tab>
          <Tab
            active
            options={{
              duration: 300,
              onShow: null,
              responsiveThreshold: Infinity,
              swipeable: false,
            }}
            title="List of Buildings"
          >
            <BuildingList
              buildings={buildings}
              activeBuilding={activeBuilding}
            />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default BuildingByLandlord;
