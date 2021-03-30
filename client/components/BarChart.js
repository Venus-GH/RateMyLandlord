import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = ({ avgs, mktAvgs }) => {
  const avgValOnly = Object.values(avgs).slice(1, -1);
  const mktAvgValOnly = Object.values(mktAvgs);

  return (
    <div id="landlord-bar-chart">
      <Bar
        data={{
          labels: ["Kindness", "Responsiveness", "Maintenance", "Pest Control"],
          datasets: [
            {
              label: "Current Landlord's Avg Rating",
              data: avgValOnly,
              backgroundColor: ["#094067", "#094067", "#094067", "#094067"],
            },
            {
              label: "Total Landlords' Avg Rating",
              data: mktAvgValOnly,
              backgroundColor: ["#90b4ce", "#90b4ce", "#90b4ce", "#90b4ce"],
            },
          ],
        }}
        // width={50}
        // height={250}
        options={{
          maintainAspectRatio: false,
          scales: {
            xAxes: [{ ticks: { fontFamily: "Space Mono", fontSize: 13 } }],
            yAxes: [
              {
                ticks: {
                  fontFamily: "Space Mono",
                  fontSize: 15,
                  beginAtZero: true,
                  stepSize: 1,
                  max: 5,
                },
              },
            ],
          },
          legend: {
            display: true,
            labels: {
              fontSize: 13,
              fontFamily: "Space Mono",
            },
          },
        }}
      />
    </div>
  );
};

export default BarChart;
