export default class Weather {
    static getWeatherLink = (location) => {
        const API = "8b09689c50ce1e845011934fc53575bd";
        const link = `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${API}`;
        this.fetchLink(link);
    };

    static fetchLink = async (link) => {
        const rawData = await fetch(link, { mode: "cors" });
        const data = await rawData.json();
        this.usableData(data);
    };

    static usableData = (data) => {
        const temp = this.convertKelvin(data.main.temp); // temperature as kelvin from fetch
        const place = `${data.name}, ${data.sys.country}`; // get searched name and country
        const feelsLike = this.convertKelvin(data.main.feels_like); // feels like temperature
        const humidityPercent = `${(data.main.humidity).toString()} %`; // humidity percent
        const longDesc = data.weather[0].description;
        const shortDesc = data.weather[0].main;
        const wind = `${this.convertSpeed(data.wind.speed).toFixed(1)} km/h`; // wind in km/h

        return console.table({
            temp, place, feelsLike, humidityPercent, longDesc, shortDesc, wind,
        });
    };

    static convertKelvin = (kelvin) => {
        const celsius = `${(kelvin - 273.15).toFixed(0)} °C`; // kelvin to celsius
        const fahrenheit = `${((kelvin - 273.15) * 1.8 + 32).toFixed(0)} °F`; // kelvin to fahrenheit
        return celsius;
    };

    static convertSpeed = (speed) => {
        const wind = speed * 3.6; // speed is m/s, convert it to km/h with multiplying 3600s/1000m
        return wind;
    };
}
