const mongoose = require("mongoose");

const weatherSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    cityName: String,
    cityId: Number,
    date: String, // Store date as string for easier querying (e.g., "2025-03-14")
    weather: {
      description: String,
      temperature: Number,
      feels_like: Number,
      humidity: Number,
      pressure: Number,
      wind_speed: Number,
      cloud_coverage: Number
    },
    createdAt: { type: Date, default: Date.now }
  });
  
const weather = mongoose.model('weather', weatherSchema);

  module.exports = weather;