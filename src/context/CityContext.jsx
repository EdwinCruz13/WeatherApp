import { createContext, useState, useEffect } from "react";
import {
  getCities,
  getCurrentCondition,
  getForecastByHours,
  getForecastByFiveDay,
} from "../api/weather.api";

/**
 * Create a city Context
 */
export const CityContext = createContext();

/**
 * Create a context provider
 * @param {*} param0
 */
export const CityContextProvider = ({ children }) => {
  const [cities, setCities] = useState(null);
  const [selectedCity, setSelecteCity] = useState(null);
  const [cityLoading, setCityLoading] = useState(false);




  /**
   * Get a the cities description
   * @param {*} q
   */
  const GetCities = async (q) => {
    try {
      setCityLoading(true);
      //make a request
      const response = await getCities(q);

      //if the response is nothing, set the city as null
      if (!response) setCities(null);

      //if the response has data, assign the cities array as city state
      if (response) {
        setCities(response.data);
        setSelecteCity(response.data[0]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setCityLoading(false);
    }
  };


  return (
    <CityContext.Provider
      value={{ cities, selectedCity, cityLoading, setSelecteCity, GetCities }}
    >
      {children}
    </CityContext.Provider>
  );
};
