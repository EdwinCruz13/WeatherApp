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
  maintainAspectRatio: true,
  aspectRatio: 1,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
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
      borderColor: "rgb(125, 99, 132)",
      backgroundColor: "rgba(125, 99, 132, 0.5)",
    },

    {
      label: "data in F°",
      data: [],
      borderColor: "rgb(85, 99, 132)",
      backgroundColor: "rgba(85, 99, 132, 0.5)",
    },
  ],
};

/**
 * Return
 * @returns
 */
export const Chart = ({title}) => {
  const { dayForecast, loading } = useContext(ConditionsContext);
  let getHours;
  let temperatureC;
  labels = [];
  data.datasets[0].data = [];

  //iterate the array
  dayForecast.map((item) => {
    getHours = new Date(item.DateTime).getHours();
    labels.push(getHours.toString()); 

    temperatureC = (item.Temperature.Value - 32) * 5/9
    data.datasets[0].data.push(temperatureC);
    data.datasets[1].data.push(item.Temperature.Value);

  });

  options.plugins.title.text = title
  data.labels = labels
  //console.log(data);  

  return <Line options={options} data={data} width={"100%"} height={"100%"} />;
};
