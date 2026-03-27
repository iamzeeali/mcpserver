const axios = require("axios");

async function weatherTool({ city }) {
    const apiKey = "a456804d39d0c7dfcbeb71f569f9c66d";

    const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    return `Weather in ${city}: ${res.data.main.temp}°C, ${res.data.weather[0].description}`;
}

module.exports = { weatherTool };