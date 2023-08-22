import { createContext, useState, useEffect } from "react";
import {
  getCurrentCondition,
  getForecastByHours,
  getForecastByFiveDay,
} from "../api/weather.api";

/**
 * Create a city Context
 */
export const ConditionsContext = createContext();

export const ConditionsContextProvider = ({ children }) => {
  const [currentCodition, setCurrentCondition] = useState(null);
  const [dayForecast, setDayForecast] = useState(null);
  const [weekForecast, setWeekForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  /**
   * get the current conditions
   * @param {*} cityID
   */
  const GetCondition = async (cityID) => {
    
    try {
      setLoading(true);
      //make a request
      const response = await getCurrentCondition(cityID);

      //if the response is nothing, set the city as null
      if (!response) setCurrentCondition(null);

      //if the response has data, assign the cities array as city state
      if (response) setCurrentCondition(response.data[0]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

/**
 * get the forecast by the last twelves hours
 * @param {*} cityID 
 */
  const GetDayForecast = async (cityID) => {
    
    try {
      setLoading(true);
      //make a request
      const response = await getForecastByHours(cityID);

      //if the response is nothing, set the city as null
      if (!response) setDayForecast(null);

      //if the response has data, assign the cities array as city state
      if (response) setDayForecast(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };


  /**
   * get the forecast for the currents 5 days
   * @param {*} cityID 
   */
  const GetForecastby5days = async (cityID) => {
    
    try {
      setLoading(true);
      //make a request
      const response = await getForecastByFiveDay(cityID);

      //if the response is nothing, set the city as null
      if (!response) setWeekForecast(null);

      //if the response has data, assign the cities array as city state
      if (response) setWeekForecast(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ConditionsContext.Provider value={{ currentCodition, dayForecast, weekForecast, loading, GetCondition, GetDayForecast, GetForecastby5days }}>
      {children}
    </ConditionsContext.Provider>
  );
};
