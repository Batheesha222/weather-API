const cron = require('node-cron');
const { User } = require('../models');
const { getWeatherByCityName } = require('../utils/getWeatherByCityName');
const  sendEmail  = require('../utils/sendEmail');
const {generateWeatherReport} = require("../utils/generateWeatherReport")


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