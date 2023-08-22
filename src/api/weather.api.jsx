import axios from "axios";

const urlBase = "http://dataservice.accuweather.com";
const apiKEY = "AtQC9tlpnTb7ohoRjYPkhGqc9qnUNc9q";

/**
 * get the cities description
 * return the response with the data 
 * @param {*} city 
 * @returns 
 */
export const getCities = async(city) => {
    try {
        const response = await axios.get(`${urlBase}/locations/v1/cities/search?apikey=${apiKEY}&q=${city}&details=true`);
        return response;
    } catch (error) {
        return error.response;
    }
}


/**
 * Get the current condition from a city as parameter
 * @param {*} cityID 
 * @returns 
 */
export const getCurrentCondition = async(cityID) => {
    try {
        const response = await axios.get(`${urlBase}/currentconditions/v1/${cityID}?apikey=${apiKEY}&detail=true`);
        return response;
    } catch (error) {
        return error.response;
    }
}

/**
 * get the weather forecast in the next twelves hours
 * @param {*} cityID 
 * @returns 
 */
export const getForecastByHours = async(cityID) => {
    try {
        const response = await axios.get(`${urlBase}/forecasts/v1/hourly/12hour/${cityID}?apikey=${apiKEY}&detail=false`);
        return response;
    } catch (error) {
        return error.response;
    }
}

/**
 * get the weather forecast in the next five days
 * @param {*} cityID 
 * @returns 
 */
export const getForecastByFiveDay = async(cityID) => {
    try {
        const response = await axios.get(`${urlBase}/forecasts/v1/daily/5day/${cityID}?apikey=${apiKEY}&detail=false`);
        return response;
    } catch (error) {
        return error.response;
    }
}