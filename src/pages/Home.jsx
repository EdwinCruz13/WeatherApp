import React, { useContext, useEffect } from "react";

import logo from "../logo.svg";
import { Aside } from "../components/aside/Aside";
import { Chart2 } from "../components/chart/chart2";

//import context
import { ConditionsContext } from "../context/ConditionsContext";
import { CityContext } from "../context/CityContext";

export const Home = () => {
  const { weekForecast, loading, GetForecastby5days } =
    useContext(ConditionsContext);
  const { selectedCity } = useContext(CityContext);

  useEffect(() => {
    loadAPI();
  }, [selectedCity]);

  async function loadAPI() {
    if (selectedCity) {
      await GetForecastby5days(selectedCity.Key);
    }
  }

  return (
    <>
      <Aside />

      <main>
        <section className="weatherChart">
          {loading ? (
            "loading..."
          ) : !weekForecast ? (
            "charging..."
          ) : (
            <Chart2
              title={selectedCity.LocalizedName + "'s five days forecast"}
            />
          )}
        </section>

        <section className="weatherCard">
          {weekForecast &&
            weekForecast.DailyForecasts &&
            weekForecast.DailyForecasts.map((item) => {
              let dayname = new Date(item.Date).toLocaleString("en-us", {
                weekday: "long",
              });
              let day = new Date(item.Date).getUTCDate();
              let month = new Date(item.Date).getUTCMonth() + 1;
              let temperatureC = (
                ((item.Temperature.Maximum.Value - 32) * 5) /
                9
              ).toFixed(2);
              return (
                <article>
                  <div>
                    <h3>{temperatureC}°</h3>
                  </div>
                  <div>
                    <h4>
                      {dayname} {month}/{day}
                    </h4>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexFlow: "column wrap",
                      gap: "15px",
                      width: "100%",
                    }}
                  >
                    {temperatureC > 30 && (
                      <div className="line-temp line-temp-hot"></div>
                    )}

                    {temperatureC > 21 && temperatureC < 30 && (
                      <div className="line-temp line-temp-cool"></div>
                    )}

                    {temperatureC > 0 && temperatureC < 21 && (
                      <div className="line-temp line-temp-cold"></div>
                    )}
                    {temperatureC < 0 && (
                      <div className="line-temp line-temp-freeze"></div>
                    )}
                  </div>
                </article>
              );
            })}
        </section>
      </main>
    </>
  );
};
