const { Weather, User } = require("../models")
const { getWeatherByCityName } = require("../utils/getWeatherByCityName")

const currentWeather = async (req, res) => {
    try {
        const { _id } = req.user;
        const user = await User.findById(_id);

        if (!user) {
            res.code = 401;
            throw new Error("user can't found");
        }

        const response = await getWeatherByCityName(user.location)

        // console.log(response)

        const currentWeather = new Weather({
            userId: _id,
            cityName: response.cityName,
            cityId: response.cityId,
            date: response.date, // Stores as "YYYY-MM-DD"
            weather: {
                description: response.weather.description,
                temperature: response.weather.temperature,
                feels_like: response.weather.feels_like,
                humidity: response.weather.humidity,
                pressure: response.weather.pressure,
                wind_speed: response.weather.wind_speed,
                cloud_coverage: response.weather.cloud_coverage,
            }
        })

        await currentWeather.save();

        res.status(201).json({
            code: 201,
            status: true,
            message: "current weather saved successfully",
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching weather data' });
    }
}

const weatherForDate = async (req, res) => {
    try {
        const { _id } = req.user;
        const { date } = req.params;

        console.log("User ID:", _id);
        console.log("Date Param:", date);

        if (!date) {
            return res.status(400).json({ message: 'Date parameter is required' });
        }

        // Ensure date is in "YYYY-MM-DD" format
        const queryDate = new Date(date).toISOString().split('T')[0];

        console.log("Querying with:", { userId: _id, date: queryDate });

        const weatherData = await Weather.find({
            userId: _id,
            date: queryDate,
        });

        if (!weatherData.length) {
            return res.status(404).json({ message: 'No weather data found for this date' });
        }

        res.json(weatherData);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching weather data', error: error.message });
    }
};



module.exports = { currentWeather, weatherForDate };