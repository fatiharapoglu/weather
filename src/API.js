import { format, add } from "date-fns";
import DOM from "./index";

export default class Weather {
    static getWeatherLink = (location) => {
        const API = "8b09689c50ce1e845011934fc53575bd";
        const link = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API}`;
        const forecastLink = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${API}`;
        this.fetchLink(link, forecastLink, location);
    };

    static getGeolocation = (lat, lon) => {
        const API = "8b09689c50ce1e845011934fc53575bd";
        const link = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API}`;
        const forecastLink = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API}`;
        this.fetchLink(link, forecastLink);
    };

    static fetchLink = async (link, forecastLink, location) => {
        try {
            DOM.loadingShow();
            const rawData = await fetch(link, { mode: "cors" });
            const data = await rawData.json();
            const rawForecastData = await fetch(forecastLink, { mode: "cors" });
            const forecastData = await rawForecastData.json();
            this.usableCurrentData(data);
            this.usableForecastData(forecastData);
            DOM.clearInput();
            DOM.loadingClose();
        } catch (error) {
            DOM.snackbar(`It seems there is no location as "${location}".`);
            DOM.loadingClose();
        }
    };

    static usableCurrentData = (data) => {
        const temp = this.convertKelvin(data.main.temp); // temperature as kelvin from fetch
        const place = `${data.name}, ${data.sys.country}`; // get searched name and country
        const feelsLike = this.convertKelvin(data.main.feels_like); // feels like temperature
        const humidityPercent = `${data.main.humidity.toString()} %`; // humidity percent
        const longDesc = this.firstLetterUpperCase(data.weather[0].description);
        const wind = `${this.convertSpeed(data.wind.speed).toFixed(1)} km/h`; // wind in km/h
        const iconCode = data.weather[0].icon;

        DOM.lastLocation = data.name;
        DOM.renderCurrentIcon(this.generateIcon(iconCode));
        DOM.renderCurrent(temp, place, feelsLike, humidityPercent, longDesc, wind);
    };

    static usableForecastData = (data) => {
        const rainPercent = `${(data.list[0].pop * 100).toFixed(0)} %`; // probility of rain percent (current)
        DOM.renderRainPercent(rainPercent);

        const currentDate = format(new Date(data.list[0].dt_txt), "do MMMM yyyy"); // readable cool display date
        DOM.renderCurrentDate(currentDate);

        // date-fns add function to get dates correctly relevant to the date
        const rawFirstDate = add(new Date(data.list[0].dt_txt), { days: 1 });
        const rawSecondDate = add(new Date(data.list[0].dt_txt), { days: 2 });
        const rawThirdDate = add(new Date(data.list[0].dt_txt), { days: 3 });
        const rawFourthDate = add(new Date(data.list[0].dt_txt), { days: 4 });
        const rawFifthDate = add(new Date(data.list[0].dt_txt), { days: 5 });

        // date-fns format function to get name of the day only
        const firstDate = format(rawFirstDate, "EEEE");
        const secondDate = format(rawSecondDate, "EEEE");
        const thirdDate = format(rawThirdDate, "EEEE");
        const fourthDate = format(rawFourthDate, "EEEE");
        const fifthDate = format(rawFifthDate, "EEEE");

        const firstDayTemp = this.convertKelvin(data.list[8].main.temp);
        const firstDayFeelsLike = this.convertKelvin(data.list[8].main.feels_like);
        const secondDayTemp = this.convertKelvin(data.list[16].main.temp);
        const secondDayFeelsLike = this.convertKelvin(data.list[16].main.feels_like);
        const thirdDayTemp = this.convertKelvin(data.list[24].main.temp);
        const thirdDayFeelsLike = this.convertKelvin(data.list[24].main.feels_like);
        const fourthDayTemp = this.convertKelvin(data.list[32].main.temp);
        const fourthDayFeelsLike = this.convertKelvin(data.list[32].main.feels_like);
        const fifthDayTemp = this.convertKelvin(data.list[37].main.temp);
        const fifthDayFeelsLike = this.convertKelvin(data.list[37].main.feels_like);

        // five icons for five days of forecast
        const icon1 = this.generateIcon(data.list[8].weather[0].icon);
        const icon2 = this.generateIcon(data.list[16].weather[0].icon);
        const icon3 = this.generateIcon(data.list[24].weather[0].icon);
        const icon4 = this.generateIcon(data.list[32].weather[0].icon);
        const icon5 = this.generateIcon(data.list[37].weather[0].icon);

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
            firstDate,
            secondDate,
            thirdDate,
            fourthDate,
            fifthDate
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
        const url = `https://openweathermap.org/img/wn/${icon}@2x.png`; // weather icons from OWM
        return url;
    };

    static firstLetterUpperCase = (string) => {
        // API returns a string with all lowercase
        const newString = string
            .split(" ")
            .map((word) => word[0].toUpperCase() + word.slice(1))
            .join(" ");
        return newString; // this function is making words' first letter uppercase for display
    };
}
