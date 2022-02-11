import React, { useState, useEffect } from "react";
import { ApiClient } from "./ApiClient";
import * as moment from "moment";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
);
//come from: https://github.com/desoga10/react-chat.git
const LineChart = () => {
  const [weather, cWeather] = useState({
    loading: "",
    weather: [],
  });

  const [fetching, cFetching] = useState(false);
  const apiClient = new ApiClient();

  useEffect(() => {
    refreshWeather();
  }, []);

  const updateWeather = (jsonResponse) => {
    cWeather(jsonResponse);
  };

  const refreshWeather = () => {
    cWeather({
      loading: "loading.....",
      weather: [],
    });

    cFetching(true);
    apiClient
      .getWeather()
      .then((response) => {
        updateWeather(response.data);
        console.log(response.data);
      })

      .catch((error) => {
        console.log(error);
      })

      .finally(cFetching(false));
  };

  console.log(weather);

  var data = {
    labels: weather?.hourly?.map((current) =>
      moment(current.dt * 1000).format("h a")
    ),
    datasets: [
      {
        label: `Next 48 hours' Temperture `,
        data: weather?.hourly?.map((current) => current.temp),
        backgroundColor: "#36846b",
        borderColor: "#36846b",
        borderWidth: 1,
        fill: {
          target: "origin",
          above: "#36846b", // Area will be red above the origin
          below: "rgb(0, 0, 255)", // And blue below the origin
        },
      },
    ],
  };

  var options = {
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
          gridLines: {
              drawBorder: false,
              display: false,
          }
      }],
      yAxes: [{
          gridLines: {
              drawBorder: false,
              color: "rgba(0, 0, 0, 0)",
          }
      }]
  }

  };


  return (
    <>
    <div>
      <Line data={data} height={400} options={options} />
    </div>
    </>



  );
};

export default LineChart;