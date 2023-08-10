import React from "react";

import "./Aside.css";
import { Searchbox } from "../searchbox/Searchbox";

/**
 * this returns aside as components
 * @returns
 */
export const Aside = () => {
  return (
    <aside>
      <header>
        <Searchbox />

        <div className="temperature-description">
          <h2>89ºF</h2>
          <h2>25ºC</h2>
        </div>

        <div className="weather-description">
          <div className="detail">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4834/4834559.png"
              alt="weather-app-isDay"
              width={50}
              height={50}
            />
            <h3>weather text</h3>
          </div>

          <div>
            <div className="detail detail-info">
              <h4>Latitude</h4>
              <h4>45.252</h4>
            </div>

            <div className="detail detail-info">
              <h4>Longitude</h4>
              <h4>-455.252</h4>
            </div>

            <div className="detail detail-info">
              <h4>Elevation</h4>
              <h4>465.0m / 1525.0ft</h4>
            </div>
          </div>
        </div>
      </header>

      <div className="temperature-forecast-byday">
        <img src="https://repository-images.githubusercontent.com/319171409/29ab1c00-389e-11eb-8381-4628355f5f13" alt="temperature-city" />
      </div>

      <div className="city-description">
        <h3>city name</h3>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab odit quos
          nihil, ad veniam error et architecto excepturi distinctio omnis unde
          commodi
        </p>
      </div>
    </aside>
  );
};
