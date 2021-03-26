import React, { Component } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

class NYPDChart extends Component {
  componentDidUpdate() {
    var chart = am4core.create("chartdiv", am4charts.RadarChart);

    chart.data = this.props.complaints;

    /* Create axes */
    var categoryAxis = chart.xAxes.push(new am4charts.DateAxis());

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.extraMin = 0.2;
    valueAxis.extraMax = 0.2;
    valueAxis.tooltip.disabled = true;

    /* Create and configure series */
    var series1 = chart.series.push(new am4charts.RadarSeries());
    series1.dataFields.valueY = "BRONX";
    series1.dataFields.dateX = "year";
    series1.strokeWidth = 3;
    series1.tooltipText = "Bronx: {valueY}";
    series1.tooltip.getFillFromObject = false;
    series1.tooltip.background.fill = am4core.color("#4c72ae");
    series1.name = "BRONX";
    var bullet = series1.bullets.push(new am4charts.CircleBullet());
    series1.dataItems.template.locations.dateX = 0.5;
    series1.stroke = am4core.color("#4c72ae");
    bullet.circle.fill = am4core.color("#4c72ae");

    var series2 = chart.series.push(new am4charts.RadarSeries());
    series2.dataFields.valueY = "BROOKLYN";
    series2.dataFields.dateX = "year";
    series2.strokeWidth = 3;
    series2.tooltipText = "Brooklyn: {valueY}";
    series2.tooltip.getFillFromObject = false;
    series2.tooltip.background.fill = am4core.color("#f04f64");
    series2.name = "BROOKLYN";
    var bullet = series2.bullets.push(new am4charts.CircleBullet());
    series2.dataItems.template.locations.dateX = 0.5;
    series2.stroke = am4core.color("#f04f64");
    bullet.circle.fill = am4core.color("#f04f64");

    var series3 = chart.series.push(new am4charts.RadarSeries());
    series3.dataFields.valueY = "MANHATTAN";
    series3.dataFields.dateX = "year";
    series3.strokeWidth = 3;
    series3.tooltipText = "Manhattan: {valueY}";
    series3.tooltip.getFillFromObject = false;
    series3.tooltip.background.fill = am4core.color("#ffa500");
    series3.name = "MANHATTAN";
    var bullet = series3.bullets.push(new am4charts.CircleBullet());
    series3.dataItems.template.locations.dateX = 0.5;
    series3.stroke = am4core.color("#ffa500");
    bullet.circle.fill = am4core.color("#ffa500");

    var series4 = chart.series.push(new am4charts.RadarSeries());
    series4.dataFields.valueY = "QUEENS";
    series4.dataFields.dateX = "year";
    series4.strokeWidth = 3;
    series4.tooltipText = "Queens: {valueY}";
    series4.tooltip.getFillFromObject = false;
    series4.tooltip.background.fill = am4core.color("#800080");
    series4.name = "QUEENS";
    var bullet = series4.bullets.push(new am4charts.CircleBullet());
    series4.dataItems.template.locations.dateX = 0.5;
    series4.stroke = am4core.color("#800080");
    bullet.circle.fill = am4core.color("#800080");

    var series5 = chart.series.push(new am4charts.RadarSeries());
    series5.dataFields.valueY = "STATEN ISLAND";
    series5.dataFields.dateX = "year";
    series5.strokeWidth = 3;
    series5.tooltipText = "Staten Island: {valueY}";
    series5.tooltip.getFillFromObject = false;
    series5.tooltip.background.fill = am4core.color("#547854");
    series5.name = "STATEN ISLAND";
    var bullet = series5.bullets.push(new am4charts.CircleBullet());
    series5.dataItems.template.locations.dateX = 0.5;
    series5.stroke = am4core.color("#547854");
    bullet.circle.fill = am4core.color("#547854");

    chart.scrollbarX = new am4core.Scrollbar();
    chart.scrollbarY = new am4core.Scrollbar();

    chart.cursor = new am4charts.RadarCursor();
    chart.legend = new am4charts.Legend();

    this.chart = chart;
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    return <div id="chartdiv"></div>;
  }
}

export default NYPDChart;
