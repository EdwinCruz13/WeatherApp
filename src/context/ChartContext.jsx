import { React, createContext, useEffect, useState } from "react";
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

export const ChartContext = createContext();

export const ChartContextProvider = ({ children }) => {
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState({});
  const [options, setOptions] = useState({
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
  });

  /**
   * set the labels of the chart
   */
  const SetChartLabels = (_labels) => {
    if (labels.isArray()) {
      setLabels(_labels);
    } else {
      setLabels(_labels);
    }
  };

  /**
   *
   * @param {*} data
   */
  const CreateChart = (_data, _labels) => {
    setData({
      labels: _labels,
      datasets: [
        {
          label: "Dataset 1",
          data: _data,
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
    });

    // return <Line options={options} data={data} width={"100%"} height={"100%"} />
  };

  return (
    <ChartContext.Provider value={{ CreateChart }}>
      {children}
    </ChartContext.Provider>
  );
};
