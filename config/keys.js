const {
    PORT,
    CONNECTION_URL,
    JWT_SECRET,
    OPENWEATHER_API_KEY
} = process.env;

module.exports = {
    port: PORT,
    connectionUrl: CONNECTION_URL,
    jwtSecret: JWT_SECRET,
    openWeatherApiKey: OPENWEATHER_API_KEY
};
