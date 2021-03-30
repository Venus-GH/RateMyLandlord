import React, { Component } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { Link } from "react-router-dom";

am4core.useTheme(am4themes_dark);
am4core.useTheme(am4themes_animated);

class RentInventory extends Component {
  componentDidMount() {
    var chart = am4core.create("chartdiv", am4charts.XYChart);
    chart.padding(40, 40, 40, 40);

    chart.numberFormatter.bigNumberPrefixes = [{ number: 1e3, suffix: "K" }];

    var label = chart.plotContainer.createChild(am4core.Label);
    label.x = am4core.percent(97);
    label.y = am4core.percent(95);
    label.horizontalCenter = "right";
    label.verticalCenter = "middle";
    label.dx = -15;
    label.fontSize = 50;

    var playButton = chart.plotContainer.createChild(am4core.PlayButton);
    playButton.x = am4core.percent(97);
    playButton.y = am4core.percent(95);
    playButton.dy = -2;
    playButton.verticalCenter = "middle";
    playButton.events.on("toggled", function (event) {
      if (event.target.isActive) {
        play();
      } else {
        stop();
      }
    });

    var stepDuration = 1000;

    var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = "borough";
    categoryAxis.renderer.minGridDistance = 1;
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.grid.template.disabled = true;

    var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.rangeChangeEasing = am4core.ease.linear;
    valueAxis.rangeChangeDuration = stepDuration;
    valueAxis.extraMax = 0.1;

    var series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.categoryY = "borough";
    series.dataFields.valueX = "rentInv";
    series.tooltipText = "{valueX.value}";
    series.columns.template.strokeOpacity = 0;
    series.columns.template.column.cornerRadiusBottomRight = 5;
    series.columns.template.column.cornerRadiusTopRight = 5;
    series.interpolationDuration = stepDuration;
    series.interpolationEasing = am4core.ease.linear;

    var labelBullet = series.bullets.push(new am4charts.LabelBullet());
    labelBullet.label.horizontalCenter = "left";
    labelBullet.label.text =
      "{values.valueX.workingValue.formatNumber('#.0as')}";
    labelBullet.label.textAlign = "start";
    labelBullet.label.dx = 10;

    chart.zoomOutButton.disabled = true;
    chart.responsive.enabled = true;

    series.columns.template.adapter.add("fill", function (fill, target) {
      return chart.colors.getIndex(target.dataItem.index);
    });

    var year = 2010;
    label.text = year.toString();

    var interval;

    function play() {
      interval = setInterval(function () {
        nextYear();
      }, stepDuration);
      nextYear();
    }

    function stop() {
      if (interval) {
        clearInterval(interval);
      }
    }

    function nextYear() {
      year++;

      if (year > 2020) {
        year = 2010;
      }

      var newData = allData[year];
      var itemsWithNonZero = 0;
      for (var i = 0; i < chart.data.length; i++) {
        chart.data[i].rentInv = newData[i].rentInv;
        if (chart.data[i].rentInv > 0) {
          itemsWithNonZero++;
        }
      }

      if (year == 2010) {
        series.interpolationDuration = stepDuration / 4;
        valueAxis.rangeChangeDuration = stepDuration / 4;
      } else {
        series.interpolationDuration = stepDuration;
        valueAxis.rangeChangeDuration = stepDuration;
      }

      chart.invalidateRawData();
      label.text = year.toString();

      categoryAxis.zoom({
        start: 0,
        end: itemsWithNonZero / categoryAxis.dataItems.length,
      });
    }

    categoryAxis.sortBySeries = series;

    var allData = {
      2010: [
        { borough: "Bronx", rentInv: 1544 },
        { borough: "Brooklyn", rentInv: 19698 },
        { borough: "Manhattan", rentInv: 147383 },
        { borough: "Queens", rentInv: 6532 },
        { borough: "Staten Island", rentInv: 55 },
      ],
      2011: [
        { borough: "Bronx", rentInv: 1837 },
        { borough: "Brooklyn", rentInv: 21922 },
        { borough: "Manhattan", rentInv: 132178 },
        { borough: "Queens", rentInv: 6123 },
        { borough: "Staten Island", rentInv: 57 },
      ],
      2012: [
        { borough: "Bronx", rentInv: 2711 },
        { borough: "Brooklyn", rentInv: 27823 },
        { borough: "Manhattan", rentInv: 152440 },
        { borough: "Queens", rentInv: 10254 },
        { borough: "Staten Island", rentInv: 139 },
      ],
      2013: [
        { borough: "Bronx", rentInv: 2731 },
        { borough: "Brooklyn", rentInv: 45685 },
        { borough: "Manhattan", rentInv: 192537 },
        { borough: "Queens", rentInv: 13397 },
        { borough: "Staten Island", rentInv: 331 },
      ],
      2014: [
        { borough: "Bronx", rentInv: 5413 },
        { borough: "Brooklyn", rentInv: 91804 },
        { borough: "Manhattan", rentInv: 232932 },
        { borough: "Queens", rentInv: 29701 },
        { borough: "Staten Island", rentInv: 522 },
      ],
      2015: [
        { borough: "Bronx", rentInv: 8770 },
        { borough: "Brooklyn", rentInv: 131303 },
        { borough: "Manhattan", rentInv: 251224 },
        { borough: "Queens", rentInv: 40623 },
        { borough: "Staten Island", rentInv: 925 },
      ],
      2016: [
        { borough: "Bronx", rentInv: 9569 },
        { borough: "Brooklyn", rentInv: 140383 },
        { borough: "Manhattan", rentInv: 269439 },
        { borough: "Queens", rentInv: 46752 },
        { borough: "Staten Island", rentInv: 1041 },
      ],
      2017: [
        { borough: "Bronx", rentInv: 9950 },
        { borough: "Brooklyn", rentInv: 174407 },
        { borough: "Manhattan", rentInv: 269138 },
        { borough: "Queens", rentInv: 65214 },
        { borough: "Staten Island", rentInv: 988 },
      ],
      2018: [
        { borough: "Bronx", rentInv: 10424 },
        { borough: "Brooklyn", rentInv: 181452 },
        { borough: "Manhattan", rentInv: 236052 },
        { borough: "Queens", rentInv: 61848 },
        { borough: "Staten Island", rentInv: 1025 },
      ],
      2019: [
        { borough: "Bronx", rentInv: 11914 },
        { borough: "Brooklyn", rentInv: 160601 },
        { borough: "Manhattan", rentInv: 222447 },
        { borough: "Queens", rentInv: 58408 },
        { borough: "Staten Island", rentInv: 808 },
      ],
      2020: [
        { borough: "Bronx", rentInv: 8536 },
        { borough: "Brooklyn", rentInv: 205990 },
        { borough: "Manhattan", rentInv: 333007 },
        { borough: "Queens", rentInv: 67075 },
        { borough: "Staten Island", rentInv: 463 },
      ],
    };
    chart.data = JSON.parse(JSON.stringify(allData[year]));
    categoryAxis.zoom({ start: 0, end: 1 / chart.data.length });

    series.events.on("inited", function () {
      setTimeout(function () {
        playButton.isActive = true; // this starts interval
      }, 1000);
    });
    this.chart = chart;
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    return (
      <div>
        <h5 className="center">Explore Rent Inventory Trend by Borough</h5>
        <p className="center">
          Below bar chart illustrates total historical rent inventory counts
          <br />
          for each borough from January 2010 to December 2010.
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
        <div className="container">
          <div id="chartdiv"></div>
        </div>
      </div>
    );
  }
}

export default RentInventory;
