import React from "react";

const BuildingList = ({ buildings, activeBuilding }) => {
  return (
    <div className="section">
      {buildings &&
        buildings.map((building) => {
          const color =
            building === activeBuilding
              ? "card z-depth-0 blue-grey darken-1 white-text"
              : "card z-depth-0 blue-grey lighten-5 grey-text ";
          return (
            <div className={color} key={building.id}>
              <div className="card-content">
                <p>{building.address}</p>
                <p>{building.borough}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default BuildingList;
