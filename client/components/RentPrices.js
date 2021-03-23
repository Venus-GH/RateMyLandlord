import React, { Component } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { Link } from "react-router-dom";

am4core.useTheme(am4themes_dark);
am4core.useTheme(am4themes_animated);

class RentPrices extends Component {
  render() {
    return (
      <div>
        <h5 className="center">Rent Prices by Borough</h5>
        <p className="center">
          2010 through 2020
          <br />
          <Link to="/explore">
            <button
              className=" btn btn-small waves-effect waves-light teal lighten-4 black-text"
              type="button"
            >
              Back to Explore
              <i className="material-icons left">arrow_back</i>
            </button>
          </Link>
        </p>
        <div id="chartdiv"></div>
      </div>
    );
  }
}

export default RentPrices;
