const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;
const apiKey = '6b0396cc41b57bcd322d3dd57d278597'; // Replace with your actual OpenWeatherMap API key

app.use(express.json());

app.get('/weather', async (req, res) => {
  const city = req.query.city;
  if (!city) {
    return res.status(400).json({ error: 'Please provide a city' });
  }

  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
    const weatherData = response.data;

    if (!weatherData) {
      return res.status(400).json({ error: 'Failed to retrieve weather data' });
    }

    res.json({
      location: weatherData.name,
      temperature: (weatherData.main.temp - 273.15).toFixed(2), // Convert from Kelvin to Celsius
      weather_descriptions: weatherData.weather[0].description,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
