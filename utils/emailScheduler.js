const cron = require('node-cron');
const { User, Weather } = require('../models');
const { getWeatherByCityName } = require('../utils/getWeatherByCityName');
const sendEmail = require('../utils/sendEmail');
const { generateWeatherReport } = require("../utils/generateWeatherReport")


const sendWeatherUpdate = async () => {
    try {
        const users = await User.find();

        for (const user of users) {
            const weatherResponse = await getWeatherByCityName(user.location);

            const weatherData = `
                City: ${weatherResponse.cityName}
                Temperature: ${weatherResponse.weather.temperature}°C
                Feels Like: ${weatherResponse.weather.feels_like}°C
                Wind Speed: ${weatherResponse.weather.wind_speed} m/s
                Humidity: ${weatherResponse.weather.humidity}%
                Cloud Coverage: ${weatherResponse.weather.cloud_coverage}%
                Date: ${weatherResponse.date}
            `;


            try {
                const currentWeather = new Weather({
                    userId: user._id,
                    cityName: weatherResponse.cityName,
                    cityId: weatherResponse.cityId,
                    date: weatherResponse.date, // Stores as "YYYY-MM-DD"
                    weather: {
                        description: weatherResponse.weather.description,
                        temperature: weatherResponse.weather.temperature,
                        feels_like: weatherResponse.weather.feels_like,
                        humidity: weatherResponse.weather.humidity,
                        pressure: weatherResponse.weather.pressure,
                        wind_speed: weatherResponse.weather.wind_speed,
                        cloud_coverage: weatherResponse.weather.cloud_coverage,
                    }
                })

                await currentWeather.save();

                console.log("current weather data saved in db")
            } catch (error) {
                console.log("current weather data saving failed")
            }

            const weatherReport = await generateWeatherReport(weatherResponse);

            console.log("Weather Update")
            console.log(user.email)
            console.log(weatherData)
            console.log(weatherReport)


            await sendEmail({
                emailTo: user.email,
                subject: "Weather Update",
                text: weatherReport,
            });


            console.log(`Weather update sent to ${user.email}`);
        }

    } catch (error) {
        // return res.status(500).json({ message: 'send email failed', error: error.message });
        console.error('Error sending weather updates:', error.message);
    }
}



const emailScheduler = () => {
    cron.schedule('* */3 * * *', () => {
        console.log('⏰ Running scheduled task to send weather updates...');
        sendWeatherUpdate();
    });
};


module.exports = { emailScheduler };