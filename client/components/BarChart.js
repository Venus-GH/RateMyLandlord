import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = ({ avgs }) => {
  const avgValOnly = Object.values(avgs).slice(1, -1);
  console.log("avgs", avgs);
  console.log("avgValOnly", avgValOnly);

  return (
    <div>
      <Bar
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
              data: [3, 4, 3.5, 5],
              backgroundColor: ["#90b4ce", "#90b4ce", "#90b4ce", "#90b4ce"],
            },
          ],
        }}
        width={100}
        height={150}
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
