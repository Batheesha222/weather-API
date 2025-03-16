const axios = require('axios')
const {openWeatherApiKey} = require("../config/keys")

const getWeatherByCityName = async(cityName) => {
    try {
        
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
        params: {
          q: cityName,
          appid: openWeatherApiKey
        }
      });
  
      const data = response.data;
      
      return {
        cityName: data.name,
        cityId: data.id,
        date: new Date().toISOString().split('T')[0],
        weather: {
          description: data.weather[0].description,
          temperature: data.main.temp - 273.15,
          feels_like: data.main.feels_like - 273.15,
          humidity: data.main.humidity,
          pressure: data.main.pressure,
          wind_speed: data.wind.speed,
          cloud_coverage: data.clouds.all
        }
      };
    } catch (error) {
      console.error('Error fetching weather data:', error.message);
      return null;
    }
  }

  
module.exports = { getWeatherByCityName };