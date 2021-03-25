import React, { Component } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4plugins_wordCloud from "@amcharts/amcharts4/plugins/wordCloud";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

class WordCloud extends Component {
  componentDidUpdate() {
    var chart = am4core.create("chartdiv", am4plugins_wordCloud.WordCloud);
    var series = chart.series.push(new am4plugins_wordCloud.WordCloudSeries());

    series.accuracy = 4;
    series.step = 15;
    series.rotationThreshold = 0.5;
    series.randomness = 0;
    series.maxFontSize = 80;
    series.minFontSize = 20;

    series.data = this.props.tagData;
    series.dataFields.word = "value";
    series.dataFields.value = "count";
    series.labels.template.tooltipText = "{word}: {count}";
    series.colors = new am4core.ColorSet();
    series.colors.passOptions = {};
    series.fontWeight = "700";

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

export default WordCloud;
