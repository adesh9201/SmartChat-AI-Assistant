import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

export const getWeather = async (req, res) => {
    try {
        const { city } = req.params;
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`
        );

        const weatherData = {
            city: response.data.name,
            country: response.data.sys.country,
            temp: response.data.main.temp,
            feels_like: response.data.main.feels_like,
            description: response.data.weather[0].description,
            icon: response.data.weather[0].icon
        };

        res.json(weatherData);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch weather data' });
    }
};