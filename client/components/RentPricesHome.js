import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  studioData,
  oneBdData,
  twoBdData,
  threePlusBdData,
} from "../../server/data";
import RentPrices from "./RentPrices";

class RentPricesHome extends Component {
  constructor() {
    super();
    this.state = {
      roomType: "studio",
    };
    this.handleRoomType = this.handleRoomType.bind(this);
  }

  handleRoomType = (event) => {
    event.persist();
    this.setState({ roomType: event.target.value });
  };

  render() {
    console.log("roomType", this.state.roomType);
    return (
      <div>
        <h5 className="center">Explore Rent Price Trend by Borough</h5>
        <p className="center">
          Use the dropdown below to view historical median asking rent price
          trend <br />
          for different room types for each borough from January 2010 to
          December 2020.
          <br />
          <em>(Note: 0 means there was no data available)</em>
          <br />
          <Link to="/explore">
            <button
              className="btn btn-small waves-effect waves-light teal lighten-4 black-text"
              type="button"
            >
              Back to Explore
              <i className="material-icons left">arrow_back</i>
            </button>
          </Link>
        </p>
        <div className="container">
          <label>Room Type</label>
          <select className="browser-default" onChange={this.handleRoomType}>
            <option value="studio">Studio</option>
            <option value="oneBd">One-Bed</option>
            <option value="twoBd">Two-Bed</option>
            <option value="threePlusBd">Three-Plus-Bed</option>
          </select>
          <RentPrices
            rentData={
              this.state.roomType === "studio"
                ? studioData
                : this.state.roomType === "oneBd"
                ? oneBdData
                : this.state.roomType === "twoBd"
                ? twoBdData
                : this.state.roomType === "threePlusBd"
                ? threePlusBdData
                : studioData
            }
          />
        </div>
      </div>
    );
  }
}

export default RentPricesHome;
