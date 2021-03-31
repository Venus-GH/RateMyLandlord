import React, { Component } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

class RentPrices extends Component {
  componentDidMount() {
    var chart = am4core.create("chartdiv", am4charts.XYChart);

    chart.data = this.props.rentData;

    // Create category axis
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "year";

    // Create value axis
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = "Price (in USD)";
    valueAxis.renderer.minLabelPosition = 0.01;

    // Create series
    var series1 = chart.series.push(new am4charts.LineSeries());
    series1.dataFields.valueY = "Bronx";
    series1.dataFields.categoryX = "year";
    series1.name = "Bronx";
    series1.tooltipText = "{name} in {categoryX}: {valueY}";
    series1.tooltip.getFillFromObject = false;
    series1.tooltip.background.fill = am4core.color("#f08b4f");
    series1.legendSettings.valueText = "{valueY}";
    series1.visible = false;
    series1.stroke = am4core.color("#f08b4f");

    var series2 = chart.series.push(new am4charts.LineSeries());
    series2.dataFields.valueY = "Brooklyn";
    series2.dataFields.categoryX = "year";
    series2.name = "Brooklyn";
    series2.tooltipText = "{name} in {categoryX}: {valueY}";
    series2.tooltip.getFillFromObject = false;
    series2.tooltip.background.fill = am4core.color("#4c72ae");
    series2.legendSettings.valueText = "{valueY}";
    series2.stroke = am4core.color("#4c72ae");

    var series3 = chart.series.push(new am4charts.LineSeries());
    series3.dataFields.valueY = "Manhattan";
    series3.dataFields.categoryX = "year";
    series3.name = "Manhattan";
    series3.tooltipText = "{name} in {categoryX}: {valueY}";
    series3.tooltip.getFillFromObject = false;
    series3.tooltip.background.fill = am4core.color("#f04f64");
    series3.legendSettings.valueText = "{valueY}";
    series3.stroke = am4core.color("#f04f64");

    var series4 = chart.series.push(new am4charts.LineSeries());
    series4.dataFields.valueY = "Queens";
    series4.dataFields.categoryX = "year";
    series4.name = "Queens";
    series4.tooltipText = "{name} in {categoryX}: {valueY}";
    series4.tooltip.getFillFromObject = false;
    series4.tooltip.background.fill = am4core.color("#13df5f");
    series4.legendSettings.valueText = "{valueY}";
    series4.stroke = am4core.color("#13df5f");

    var series5 = chart.series.push(new am4charts.LineSeries());
    series5.dataFields.valueY = "StatenIsland";
    series5.dataFields.categoryX = "year";
    series5.name = "Staten Island";
    series5.tooltipText = "{name} in {categoryX}: {valueY}";
    series5.tooltip.getFillFromObject = false;
    series5.tooltip.background.fill = am4core.color("#800080");
    series5.legendSettings.valueText = "{valueY}";
    series5.stroke = am4core.color("#800080");

    // Add chart cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = "zoomY";

    let hs1 = series1.segments.template.states.create("hover");
    hs1.properties.strokeWidth = 5;
    series1.segments.template.strokeWidth = 1;

    let hs2 = series2.segments.template.states.create("hover");
    hs2.properties.strokeWidth = 5;
    series2.segments.template.strokeWidth = 1;

    let hs3 = series3.segments.template.states.create("hover");
    hs3.properties.strokeWidth = 5;
    series3.segments.template.strokeWidth = 1;

    let hs4 = series4.segments.template.states.create("hover");
    hs4.properties.strokeWidth = 5;
    series4.segments.template.strokeWidth = 1;

    let hs5 = series5.segments.template.states.create("hover");
    hs5.properties.strokeWidth = 5;
    series5.segments.template.strokeWidth = 1;

    // Add legend
    chart.legend = new am4charts.Legend();
    chart.legend.itemContainers.template.events.on("over", function (event) {
      var segments = event.target.dataItem.dataContext.segments;
      segments.each(function (segment) {
        segment.isHover = true;
      });
    });

    chart.legend.itemContainers.template.events.on("out", function (event) {
      var segments = event.target.dataItem.dataContext.segments;
      segments.each(function (segment) {
        segment.isHover = false;
      });
    });

    // this.chart = chart;
    //Responsiveness
    chart.responsive.useDefault = false;
    chart.responsive.enabled = true;
    chart.responsive.rules.push({
      relevant: function (target) {
        if (target.pixelWidth <= 400) {
          return true;
        }
        return false;
      },
      state: function (target, stateId) {
        if (target instanceof am4charts.Chart) {
          var state = target.states.create(stateId);
          state.properties.paddingTop = 30;
          state.properties.paddingRight = 60;
          state.properties.paddingBottom = 15;
          state.properties.paddingLeft = 12;
          return state;
        }

        if (target instanceof am4charts.Legend) {
          var state = target.states.create(stateId);
          state.properties.paddingTop = 0;
          state.properties.paddingRight = 0;
          state.properties.paddingBottom = 0;
          state.properties.paddingLeft = -10;
          state.properties.marginLeft = -10;
          return state;
        }

        if (target instanceof am4charts.AxisRendererY) {
          var state = target.states.create(stateId);
          state.properties.inside = true;
          state.properties.maxLabelPosition = 0.99;
          return state;
        }

        if (
          target instanceof am4charts.AxisLabel &&
          target.parent instanceof am4charts.AxisRendererY
        ) {
          var state = target.states.create(stateId);
          state.properties.dy = -15;
          state.properties.paddingTop = 3;
          state.properties.paddingRight = 5;
          state.properties.paddingBottom = 3;
          state.properties.paddingLeft = 3;

          // Create a separate state for background
          target.setStateOnChildren = true;
          var bgstate = target.background.states.create(stateId);
          bgstate.properties.fill = am4core.color("#fff");
          bgstate.properties.fillOpacity = 0.7;

          return state;
        }
        return null;
      },
    });
  }

  componentDidUpdate() {
    var chart = am4core.create("chartdiv", am4charts.XYChart);

    chart.data = this.props.rentData;

    // Create category axis
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "year";

    // Create value axis
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = "Price (in USD)";
    valueAxis.renderer.minLabelPosition = 0.01;

    // Create series
    var series1 = chart.series.push(new am4charts.LineSeries());
    series1.dataFields.valueY = "Bronx";
    series1.dataFields.categoryX = "year";
    series1.name = "Bronx";
    series1.tooltipText = "{name} in {categoryX}: {valueY}";
    series1.tooltip.getFillFromObject = false;
    series1.tooltip.background.fill = am4core.color("#f08b4f");
    series1.legendSettings.valueText = "{valueY}";
    series1.visible = false;
    series1.stroke = am4core.color("#f08b4f");

    var series2 = chart.series.push(new am4charts.LineSeries());
    series2.dataFields.valueY = "Brooklyn";
    series2.dataFields.categoryX = "year";
    series2.name = "Brooklyn";
    series2.tooltipText = "{name} in {categoryX}: {valueY}";
    series2.tooltip.getFillFromObject = false;
    series2.tooltip.background.fill = am4core.color("#4c72ae");
    series2.legendSettings.valueText = "{valueY}";
    series2.stroke = am4core.color("#4c72ae");

    var series3 = chart.series.push(new am4charts.LineSeries());
    series3.dataFields.valueY = "Manhattan";
    series3.dataFields.categoryX = "year";
    series3.name = "Manhattan";
    series3.tooltipText = "{name} in {categoryX}: {valueY}";
    series3.tooltip.getFillFromObject = false;
    series3.tooltip.background.fill = am4core.color("#f04f64");
    series3.legendSettings.valueText = "{valueY}";
    series3.stroke = am4core.color("#f04f64");

    var series4 = chart.series.push(new am4charts.LineSeries());
    series4.dataFields.valueY = "Queens";
    series4.dataFields.categoryX = "year";
    series4.name = "Queens";
    series4.tooltipText = "{name} in {categoryX}: {valueY}";
    series4.tooltip.getFillFromObject = false;
    series4.tooltip.background.fill = am4core.color("#13df5f");
    series4.legendSettings.valueText = "{valueY}";
    series4.stroke = am4core.color("#13df5f");

    var series5 = chart.series.push(new am4charts.LineSeries());
    series5.dataFields.valueY = "StatenIsland";
    series5.dataFields.categoryX = "year";
    series5.name = "Staten Island";
    series5.tooltipText = "{name} in {categoryX}: {valueY}";
    series5.tooltip.getFillFromObject = false;
    series5.tooltip.background.fill = am4core.color("#800080");
    series5.legendSettings.valueText = "{valueY}";
    series5.stroke = am4core.color("#800080");

    // Add chart cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = "zoomY";

    let hs1 = series1.segments.template.states.create("hover");
    hs1.properties.strokeWidth = 5;
    series1.segments.template.strokeWidth = 1;

    let hs2 = series2.segments.template.states.create("hover");
    hs2.properties.strokeWidth = 5;
    series2.segments.template.strokeWidth = 1;

    let hs3 = series3.segments.template.states.create("hover");
    hs3.properties.strokeWidth = 5;
    series3.segments.template.strokeWidth = 1;

    let hs4 = series4.segments.template.states.create("hover");
    hs4.properties.strokeWidth = 5;
    series4.segments.template.strokeWidth = 1;

    let hs5 = series5.segments.template.states.create("hover");
    hs5.properties.strokeWidth = 5;
    series5.segments.template.strokeWidth = 1;

    // Add legend
    chart.legend = new am4charts.Legend();
    chart.legend.itemContainers.template.events.on("over", function (event) {
      var segments = event.target.dataItem.dataContext.segments;
      segments.each(function (segment) {
        segment.isHover = true;
      });
    });

    chart.legend.itemContainers.template.events.on("out", function (event) {
      var segments = event.target.dataItem.dataContext.segments;
      segments.each(function (segment) {
        segment.isHover = false;
      });
    });

    this.chart = chart;

    //Responsiveness
    chart.responsive.useDefault = false;
    chart.responsive.enabled = true;
    chart.responsive.rules.push({
      relevant: function (target) {
        if (target.pixelWidth <= 400) {
          return true;
        }
        return false;
      },
      state: function (target, stateId) {
        if (target instanceof am4charts.Chart) {
          var state = target.states.create(stateId);
          state.properties.paddingTop = 30;
          state.properties.paddingRight = 60;
          state.properties.paddingBottom = 15;
          state.properties.paddingLeft = 12;
          return state;
        }

        if (target instanceof am4charts.Legend) {
          var state = target.states.create(stateId);
          state.properties.paddingTop = 0;
          state.properties.paddingRight = 0;
          state.properties.paddingBottom = 0;
          state.properties.paddingLeft = -10;
          state.properties.marginLeft = -10;
          return state;
        }

        if (target instanceof am4charts.AxisRendererY) {
          var state = target.states.create(stateId);
          state.properties.inside = true;
          state.properties.maxLabelPosition = 0.99;
          return state;
        }

        if (
          target instanceof am4charts.AxisLabel &&
          target.parent instanceof am4charts.AxisRendererY
        ) {
          var state = target.states.create(stateId);
          state.properties.dy = -15;
          state.properties.paddingTop = 3;
          state.properties.paddingRight = 5;
          state.properties.paddingBottom = 3;
          state.properties.paddingLeft = 3;

          // Create a separate state for background
          target.setStateOnChildren = true;
          var bgstate = target.background.states.create(stateId);
          bgstate.properties.fill = am4core.color("#fff");
          bgstate.properties.fillOpacity = 0.7;

          return state;
        }
        return null;
      },
    });
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

export default RentPrices;
