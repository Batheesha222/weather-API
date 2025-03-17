const { GoogleGenerativeAI } = require("@google/generative-ai");
const { geminiApiKey } = require('../config/keys'); // Ensure correct key import

const genAI = new GoogleGenerativeAI(geminiApiKey);

const generateWeatherReport = async (weatherResponse) => {


    try {

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Use an available model

        const prompt = `
    Generate a detailed and friendly weather report using the following data:
    
    - City: ${weatherResponse.cityName}
    - Temperature: ${weatherResponse.weather.temperature}°C
    - Feels Like: ${weatherResponse.weather.feels_like}°C
    - Wind Speed: ${weatherResponse.weather.wind_speed} m/s
    - Humidity: ${weatherResponse.weather.humidity}%
    - Cloud Coverage: ${weatherResponse.weather.cloud_coverage}%
    - Date: ${weatherResponse.date}
    
    Write the report in a friendly and concise tone.
    `;

        const result = await model.generateContent(prompt);
        // const response = await result.response;
        const text = result.response.text();

        if (!text) {
            throw new Error("No report generated in response.");
        }

        return text.trim();
    } catch (error) {
        console.error("Error generating weather report with Gemini:", error);
        return "Unable to generate weather report.";
    }
};

module.exports = { generateWeatherReport };