# 🌦️ Weather Report App

A Node.js application that sends personalized weather updates to users via email. It integrates OpenWeatherMap API for weather data, Google Cloud for location services, and Gemini for generating friendly weather reports.

## 🚀 Features

- Fetches real-time weather data based on user locations.
- Generates detailed and friendly weather reports using Gemini.
- Sends hourly weather reports to users via email.
- Scheduled email delivery using `node-cron`.
- MongoDB for storing user data.
- Deployable on Vercel.

## 🛠️ Technologies Used

- **Node.js** & **Express.js**
- **MongoDB** with Mongoose
- **OpenWeatherMap API**
- **Gemini API**
- **Google Cloud Location Services**
- **Nodemailer** for sending emails
- **Node-cron** for scheduling tasks
- **Vercel** for deployment

## 📦 Installation

1. **Clone the repository**

```bash
git clone https://github.com/your-username/weather-app.git
cd weather-app
```

2. **Install dependencies**

```bash
npm install
```

3. **Create a **``** file**

```env
PORT=3000
MONGO_URI=your-mongodb-uri
OPENWEATHERMAP_API_KEY=your-openweathermap-api-key
GEMINI_API_KEY=your-gemini-api-key
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-email-password
```

4. **Run the Application**

```bash
npm start
```

## 🕰️ Scheduling Emails

The application uses `node-cron` to send weather updates every 3 hour. You can customize this in `emailScheduler.js`:

```js
cron.schedule('* */3 * * *', () => {
    sendWeatherUpdate();
});
```

## 🐛 Troubleshooting

- **Rate Limit Errors**: Ensure your API usage is within the quota. Check OpenAI and OpenWeatherMap dashboards.
- **Email Issues**: Verify your SMTP settings and credentials.

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

Made with ❤️ by Batheesha

