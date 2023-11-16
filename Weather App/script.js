const apiKey = 'c933b428c113e1703af60cfef9045be4';

const weatherDataEl = document.getElementById("Weather-data");
const cityInput = document.getElementById("city-input");

const formEl = document.querySelector("form");

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    const cityValue = cityInput.value;
    getWeatherData(cityValue);
});

async function getWeatherData(cityValue) {
try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`);

    if(!response.ok){
        throw new Error("Network response was not ok");
    }

    const data = await response.json();

    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const details = [
        `Feels like: ${Math.round(data.main.feels_like)}℃ `,
        `Humidity: ${data.main.humidity}% ` ,
        `Wind Speed: ${data.wind.speed} m/s`
    ];

    weatherDataEl.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`;
    weatherDataEl.querySelector(".temperature").textContent = `${temperature}`;
    weatherDataEl.querySelector(".description").textContent = `${description}`;

    weatherDataEl.querySelector(".details").innerHTML = details.map((detail)=> ` <div>${detail}</div>`).join("");
} catch (error) {
    weatherDataEl.querySelector(".icon").innerHTML = "";
    weatherDataEl.querySelector(".temperature").textContent = "";
    weatherDataEl.querySelector(".description").textContent = "An Error has occurred, please check the location name or try again later";

    weatherDataEl.querySelector(".details").innerHTML = "";
}
}