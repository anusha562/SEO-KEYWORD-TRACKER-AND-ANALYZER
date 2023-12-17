import React from "react";
import "./Ranking.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Defining different colors for each bar
const barColors = [
    "green",
    "rgba(255, 99, 132, 3.5)",
    "red",
    "rgba(255, 206, 86, 4.5)",
    "rgba(153, 102, 255, 3.5)",
];


const BarChart = ({ data: data1 }) => {
  const newData = data1.slice(0, 5);

  const labels = newData.map(data => data.word)

  const data2 = newData.map(data => data.time);

  const newObj = {
    labels,
    datasets: [{
      label: "Execution Time",
      data: data2,
      backgroundColor: barColors,
    }]
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Bar Chart",
      },
      animation: {
        duration: 1500, 
        easing: "easeInOutQuart", 
      },
      scales: {
        x: {
          ticks: {
            color: "rgba(0, 0, 0, 3.87)", 
          },
        },
        y: {
          ticks: {
            color: "black", 
          },
        },
      },
    },
  };
  
  return (
    <div className="bar-graph">
      <Bar data={newObj} 
      options={options}
      height = {400}
      width={600}
       />
    </div>
  );
};

export default BarChart;
