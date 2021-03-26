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
    series1.tooltipText = "{valueY}";
    series1.name = "BRONX";
    series1.bullets.create(am4charts.CircleBullet);
    series1.dataItems.template.locations.dateX = 0.5;

    var series2 = chart.series.push(new am4charts.RadarSeries());
    series2.dataFields.valueY = "BROOKLYN";
    series2.dataFields.dateX = "year";
    series2.strokeWidth = 3;
    series2.tooltipText = "{valueY}";
    series2.name = "BROOKLYN";
    series2.bullets.create(am4charts.CircleBullet);
    series2.dataItems.template.locations.dateX = 0.5;

    var series3 = chart.series.push(new am4charts.RadarSeries());
    series3.dataFields.valueY = "MANHATTAN";
    series3.dataFields.dateX = "year";
    series3.strokeWidth = 3;
    series3.tooltipText = "{valueY}";
    series3.name = "MANHATTAN";
    series3.bullets.create(am4charts.CircleBullet);
    series3.dataItems.template.locations.dateX = 0.5;

    var series4 = chart.series.push(new am4charts.RadarSeries());
    series4.dataFields.valueY = "QUEENS";
    series4.dataFields.dateX = "year";
    series4.strokeWidth = 3;
    series4.tooltipText = "{valueY}";
    series4.name = "QUEENS";
    series4.bullets.create(am4charts.CircleBullet);
    series4.dataItems.template.locations.dateX = 0.5;

    var series5 = chart.series.push(new am4charts.RadarSeries());
    series5.dataFields.valueY = "STATEN ISLAND";
    series5.dataFields.dateX = "year";
    series5.strokeWidth = 3;
    series5.tooltipText = "{valueY}";
    series5.name = "STATEN ISLAND";
    series5.bullets.create(am4charts.CircleBullet);
    series5.dataItems.template.locations.dateX = 0.5;

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
