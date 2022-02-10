import React, { useState, useEffect } from "react";
import axios from "axios";
import { ApiClient } from "./ApiClient";
import { TiWeatherWindyCloudy } from "react-icons/ti";
//import 'bootstrap/dist/css/bootstrap.min.css';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import * as moment from "moment";
import "./App.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);



function Weatherapp() {
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

  const buildHour = () => {
    if (!weather.hourly) {
      return <></>;
    }

    return weather.hourly.slice(0, 5).map((hourly, index) => {
      const hourImage = `http://openweathermap.org/img/wn/${hourly.weather[0].icon}@2x.png`;
      const Houralt = hourly.weather[0].description;

      return (
        <div className="hourly_item" key={index}>
          <p>{moment(hourly.dt * 1000).format("h a")}</p>
          <p>
            <img src={hourImage} alt={Houralt} title={Houralt} />
            <br />
            {Houralt}
          </p>
          <h2>{hourly.temp}</h2>
        </div>
      );
    });
  };


  const buildLine = () => {
    const options = {
      responsive: true,
      plugins: {

        title: {
          display: true,
          text: 'Chart.js Line Chart',
        },
      },
    };
    if (!weather.hourly) {
      return <></>;
    }

    return weather.hourly.slice(0, 5).map((hourly, index) => {
      //const hourImage = `http://openweathermap.org/img/wn/${hourly.weather[0].icon}@2x.png`;
      //const Houralt = hourly.weather[0].description;
      const labels= (moment(hourly.dt * 1000).format("h a"))
      const data = (hourly.temp)
      return (
        <div key={index}>
          {labels}
          <Line options={options} data={data} />;
        </div>
      );
    });
  };

  const buildCard = () => {
    console.log(weather);

    if (!weather.daily) {
      return <></>;
    }

    return weather.daily.map((current, index) => {
      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const day = new Date(parseInt(current.dt) * 1000);
      const nameDay = days[day.getDay(day)];
      const month = months[day.getMonth(day)];
      const date = day.getDate(day);
      const image = `http://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`;
      const alt = current.weather[0].description;
      const feels_like = Math.round(current.feels_like.day, 10);
      // const feelsLike = (current.feels_like, 1)
      const sunrise = current.sunrise * 1000;
      const sunset = current.sunset * 1000;

      return (
        <Card className="mx-auto text-center mt-2">
          <Col key={index}>
            <CardGroup>
              <h2>
                {nameDay}
                <br />
                {month} {date}
              </h2>

              <p>
                {alt}
                <br />
                <img src={image} alt={alt} title={alt} />
              </p>

              <p>
                {current.temp.min}°C - {current.temp.max}°C
                <br />
                Feels Like {feels_like}°C
              </p>

              <p>{moment(sunrise).format("h:mm a")}</p>
              <p>{moment(sunset).format("h:mm a")}</p>

              <p>
                <TiWeatherWindyCloudy /> Wind Speed
                <br />
                {current.wind_speed} Mph
              </p>

              <p>humidity={current.humidity}</p>
            </CardGroup>
          </Col>
        </Card>
      );
    });
  };

  return (
    <>
      <Container>
        <h1>Sheffield</h1>
        {buildLine}
        <Row>
          <div className="horizontal_hours">{buildHour()}</div>


        </Row>
        <Row>{buildCard()}</Row>
      </Container>
      <button disabled={fetching} onClick={() => refreshWeather()}></button>
    </>
  );
}

export default Weatherapp;
