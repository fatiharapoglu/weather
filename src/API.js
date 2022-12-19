import DOM from "./index";

export default class Weather {
    static getWeatherLink = (location) => {
        const API = "8b09689c50ce1e845011934fc53575bd";
        const link = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API}`;
        const forecastLink = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${API}`;
        this.fetchLink(link);
        this.fetchForecastLink(forecastLink);
    };

    static fetchLink = async (link) => {
        const rawData = await fetch(link, { mode: "cors" });
        const data = await rawData.json();
        this.usableCurrentData(data);
    };

    static fetchForecastLink = async (link) => {
        const rawData = await fetch(link, { mode: "cors" });
        const data = await rawData.json();
        this.usableForecastData(data);
    };

    static usableCurrentData = (data) => {
        const temp = this.convertKelvin(data.main.temp); // temperature as kelvin from fetch
        const place = `${data.name}, ${data.sys.country}`; // get searched name and country
        const feelsLike = this.convertKelvin(data.main.feels_like); // feels like temperature
        const humidityPercent = `${(data.main.humidity).toString()} %`; // humidity percent
        const longDesc = this.firstLetterUpperCase(data.weather[0].description);
        const shortDesc = data.weather[0].main;
        const wind = `${this.convertSpeed(data.wind.speed).toFixed(1)} km/h`; // wind in km/h
        const iconCode = data.weather[0].icon;
        DOM.renderCurrentIcon(this.generateIcon(iconCode));
        DOM.renderCurrent(temp, place, feelsLike, humidityPercent, longDesc, shortDesc, wind);
    };

    static usableForecastData = (data) => {
        const rainPercent = `${((data.list[0].pop) * 100)} %`; // probility of rain percent (current)
        DOM.renderRainPercent(rainPercent);

        const firstDayTemp = this.convertKelvin(data.list[8].main.temp);
        const firstDayFeelsLike = this.convertKelvin(data.list[8].main.feels_like);
        const icon1 = this.generateIcon(data.list[8].weather[0].icon);
        const secondDayTemp = this.convertKelvin(data.list[16].main.temp);
        const secondDayFeelsLike = this.convertKelvin(data.list[16].main.feels_like);
        const icon2 = this.generateIcon(data.list[16].weather[0].icon);
        const thirdDayTemp = this.convertKelvin(data.list[24].main.temp);
        const thirdDayFeelsLike = this.convertKelvin(data.list[24].main.feels_like);
        const icon3 = this.generateIcon(data.list[24].weather[0].icon);
        const fourthDayTemp = this.convertKelvin(data.list[32].main.temp);
        const fourthDayFeelsLike = this.convertKelvin(data.list[32].main.feels_like);
        const icon4 = this.generateIcon(data.list[32].weather[0].icon);
        const fifthDayTemp = this.convertKelvin(data.list[39].main.temp);
        const fifthDayFeelsLike = this.convertKelvin(data.list[39].main.feels_like);
        const icon5 = this.generateIcon(data.list[39].weather[0].icon);

        DOM.renderForecast(
            firstDayTemp,
            firstDayFeelsLike,
            secondDayTemp,
            secondDayFeelsLike,
            thirdDayTemp,
            thirdDayFeelsLike,
            fourthDayTemp,
            fourthDayFeelsLike,
            fifthDayTemp,
            fifthDayFeelsLike,
            icon1,
            icon2,
            icon3,
            icon4,
            icon5,
        );
    };

    static convertKelvin = (kelvin) => {
        const celsius = `${(kelvin - 273.15).toFixed(0)} °C`; // kelvin to celsius
        const fahrenheit = `${((kelvin - 273.15) * 1.8 + 32).toFixed(0)} °F`; // kelvin to fahrenheit
        if (DOM.activeUnit === "F") return fahrenheit;
        return celsius;
    };

    static convertSpeed = (speed) => {
        const wind = speed * 3.6; // speed is m/s, convert it to km/h with multiplying 3600s/1000m
        return wind;
    };

    static generateIcon = (icon) => {
        const url = `http://openweathermap.org/img/wn/${icon}@2x.png`;
        return url;
    };

    static firstLetterUpperCase = (string) => {
        const newString = string.split(" ").map((word) => word[0].toUpperCase() + word.slice(1)).join(" ");
        return newString;
    };
}
