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
              label: "Avg Rating",
              data: avgValOnly,
              backgroundColor: ["#094067", "#90b4ce", "#3da9fc", "#ef4565"],
              // barThickness: 15
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
