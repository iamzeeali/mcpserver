const axios = require("axios");

async function weatherTool({ city }) {
    const apiKey = process.env.OPENWEATHER_API_KEY;

    const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    return `Weather in ${city}: ${res.data.main.temp}°C, ${res.data.weather[0].description}`;
}

module.exports = { weatherTool };