import React, { useContext, useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

//import context
import { ConditionsContext } from "../../context/ConditionsContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export let options = {
  responsive: true,
  maintainAspectRatio: false,
  aspectRatio: 1,
  plugins: {
    legend: {
      display: false,
      labels: {
        color: "#fff",
      },
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
      color: "#fff"
    },
  },
  scales: {
    x: {
      grid: {
        color: "#000",
        borderColor: "#000",
        tickColor: "#000",
      },
      border: {
        display: true,
      },
    },

    y: {
      grid: {
        color: "#000",
        borderColor: "#000",
        tickColor: "#000",
      },
      border: {
        display: true,
      },
    },
  },
  y: {
    border: {
      display: true,
    },
    grid: {
      color: "#000",
    },
  },
};

let labels = [];

export let data = {
  labels,
  datasets: [
    {
      label: "data in C°",
      data: [],
      borderColor: "#F8D210",
      backgroundColor: "#F8D215",
      ointStyle: "circle",
      pointRadius: 5,
      pointHoverRadius: 12,
      borderWidth: 5,
    },

    {
      label: "data in F°",
      data: [],
      borderColor: "rgb(85, 99, 132)",
      backgroundColor: "rgba(85, 99, 132, 0.5)",
      ointStyle: "circle",
      pointRadius: 5,
      pointHoverRadius: 12,
      borderWidth: 5,
    },
  ],
};

/**
 * Return
 * @returns
 */
export const Chart2 = ({ title }) => {
  const { weekForecast, loading } = useContext(ConditionsContext);
  let getDays;
  let getMonth;
  let getYear;
  let temperatureC;
  labels = [];
  data.datasets[0].data = [];

  //iterate the array
  weekForecast.DailyForecasts.map((item) => {
    getDays = new Date(item.Date).getUTCDate();
    getMonth = new Date(item.Date).getMonth() + 1;
    getYear = new Date(item.Date).getFullYear();

    labels.push(
      getDays.toString() + "/" + getMonth.toString() + "/" + getYear.toString()
    );

    temperatureC = ((item.Temperature.Maximum.Value - 32) * 5) / 9;
    data.datasets[0].data.push(temperatureC);
    //data.datasets[1].data.push(item.Temperature.Minimum.Value);
  });

  options.plugins.title.text = title;
  data.labels = labels;
  //console.log(data);

  return <Line options={options} data={data} width={"100%"} height={"100%"} />;
};
