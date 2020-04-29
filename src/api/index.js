import axios from "axios";

const baseURL = "https://covid19.mathdro.id/api";

export const fetchData = async (country) => {
    let urlParams = baseURL;
    if(country) {
        urlParams=`${baseURL}/countries/${country}`;
    }
  try {
    // pair down and select the data we need
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(urlParams);
    return { confirmed, recovered, deaths, lastUpdate };
  } catch (error) {
    console.log("Error fetching data.");
    return error;
  }
};

export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${baseURL}/daily`);
    const modifiedData = data.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate,
    }));
    return modifiedData;
  } catch (error) {
    console.log("Error fetching data.");
    return error;
  }
};

export const fetchCountries = async () => {
    try {
      const { data: { countries }} = await axios.get(`${baseURL}/countries`);
      return countries.map((country)=>country.name);
    } catch (error) {
      console.log("Error fetching data.");
      return error;
    }
  };
  
