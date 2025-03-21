const {
    PORT,
    CONNECTION_URL,
    JWT_SECRET,
    OPENWEATHER_API_KEY,
    SENDER_EMAIL,
    EMAIL_PASSWORD,
    GEMINI_API_KEY
} = process.env;

module.exports = {
    port: PORT,
    connectionUrl: CONNECTION_URL,
    jwtSecret: JWT_SECRET,
    openWeatherApiKey: OPENWEATHER_API_KEY,
    senderEmail: SENDER_EMAIL,
    emailPassword: EMAIL_PASSWORD,
    geminiApiKey:GEMINI_API_KEY
};
