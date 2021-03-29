import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = ({ avgs, mktAvgs }) => {
  const avgValOnly = Object.values(avgs).slice(1, -1);
  const mktAvgValOnly = Object.values(mktAvgs);

  return (
    <div>
      <Bar
        id="single-landlord-bar-chart"
        data={{
          labels: ["Kindness", "Responsiveness", "Maintenance", "Pest Control"],
          datasets: [
            {
              label: "Landlord Avg Rating",
              data: avgValOnly,
              backgroundColor: ["#094067", "#5f6c7b", "#3da9fc", "#ef4565"],
            },
            {
              label: "Market Avg",
              data: mktAvgValOnly,
              backgroundColor: ["#90b4ce", "#90b4ce", "#90b4ce", "#90b4ce"],
            },
          ],
        }}
        width={400}
        height={250}
        options={{
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  stepSize: 1,
                  max: 5,
                },
              },
            ],
          },
        }}
      />
    </div>
  );
};

export default BarChart;
