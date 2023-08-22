import { React, useContext, useEffect } from "react";

import "./Aside.css";
import { Searchbox } from "../searchbox/Searchbox";
import { Chart } from "../chart/chart";

//import context
import { ConditionsContext } from "../../context/ConditionsContext";
import { CityContext } from "../../context/CityContext";

/**
 * this returns aside as components
 * @returns
 */
export const Aside = () => {
  const { selectedCity, cityLoading } = useContext(CityContext);

  const {
    currentCodition,
    loading,
    GetCondition,
    GetDayForecast,
  } = useContext(ConditionsContext);

  useEffect(() => {
    loadAPI();
  }, [selectedCity]);

  // useEffect(() => {
  //   loadAPI();
  // }, []);

  async function loadAPI() {
    if (selectedCity) {
      await GetCondition(selectedCity.Key);
      await GetDayForecast(selectedCity.Key);
    }
  }

  return (
    <aside>
      <header>
        <Searchbox />

        <div className="temperature-description">
          {loading && (
            <>
              <h2>--</h2>
              <h2>--</h2>
            </>
          )}
          {!loading && (
            <>
              <h2>
                {!currentCodition
                  ? "--"
                  : currentCodition.Temperature.Metric.Value}
                ºC
              </h2>
              <h2>
                {!currentCodition
                  ? "--"
                  : currentCodition.Temperature.Imperial.Value}
                ºF
              </h2>
            </>
          )}
        </div>

        <div className="weather-description">
          <div className="detail">
            {!currentCodition ? (
              "--"
            ) : (
              <img
                src={`http://localhost:3000/assets/3.png`}
                alt="weather-app-isDay"
                width={50}
                height={50}
              />
            )}

            <h3>{!currentCodition ? "--" : currentCodition.WeatherText}</h3>
          </div>

          <div>
            <div className="detail detail-info">
              <h4>Latitude</h4>
              <h4>
                {!currentCodition
                  ? "--"
                  : selectedCity.GeoPosition.Latitude.toFixed(4)}
              </h4>
            </div>

            <div className="detail detail-info">
              <h4>Longitude</h4>
              <h4>
                {!currentCodition
                  ? "--"
                  : selectedCity.GeoPosition.Longitude.toFixed(4)}
              </h4>
            </div>

            <div className="detail detail-info">
              <h4>Elevation</h4>
              <h4>
                {!currentCodition
                  ? "--"
                  : selectedCity.GeoPosition.Elevation.Metric.Value.toFixed(1) +
                    "m" +
                    " / " +
                    selectedCity.GeoPosition.Elevation.Imperial.Value.toFixed(
                      1
                    ) +
                    "ft"}
              </h4>
            </div>
          </div>
        </div>
      </header>

      <div className="temperature-forecast-byday">
      {loading ? "loading..." : !currentCodition ? "charging..." : <Chart title = {selectedCity.LocalizedName + "'s twelves hours forecast"} />} 
       


      </div>

      <div className="city-description">
        <h3>{!currentCodition ? "--" : selectedCity.LocalizedName}</h3>
        <p>
          {!currentCodition
            ? "----"
            : "This " +
              selectedCity.Type +
              " is located in " +
              selectedCity.Country.LocalizedName +
              ", a region in " +
              selectedCity.Region.LocalizedName +
              ". Its population is about " +
              selectedCity.Details.Population +
              " inhabitant."}
        </p>
      </div>
    </aside>
  );
};
