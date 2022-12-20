import Weather from "./API";

export default class DOM {
    static activeUnit = "C";

    static lastLocation = "İstanbul";

    static initButtons = () => {
        const searchBtnDOM = document.getElementById("search-btn");
        const unitChangerBtnDOM = document.getElementById("change-unit-btn");
        const requestLocationBtnDOM = document.getElementById("geolocation");
        searchBtnDOM.addEventListener("click", (event) => {
            event.preventDefault();
            this.getLocation();
        });
        unitChangerBtnDOM.addEventListener("click", this.toggleUnits);
        requestLocationBtnDOM.addEventListener("click", this.requestGeoLocation);
    };

    static getLocation = () => {
        const searchInputDOM = document.getElementById("search-input");
        const location = searchInputDOM.value;
        if (location === "") return this.snackbar("Search area can not be empty.");
        return Weather.getWeatherLink(location);
    };

    static toggleUnits = () => {
        const unitChangerBtnDOM = document.getElementById("change-unit-btn");
        if (unitChangerBtnDOM.textContent === "Units to °F") {
            unitChangerBtnDOM.textContent = "Units to °C";
            this.activeUnit = "F";
            Weather.getWeatherLink(this.lastLocation);
        } else {
            unitChangerBtnDOM.textContent = "Units to °F";
            this.activeUnit = "C";
            Weather.getWeatherLink(this.lastLocation);
        }
    };

    static renderCurrent = (temp, place, feelsLike, humidityPercent, longDesc, wind) => {
        const descriptionDOM = document.getElementById("description");
        const tempDOM = document.getElementById("temp");
        const feelsLikeDOM = document.getElementById("feels-like");
        const humidityDOM = document.getElementById("humidity");
        const windDOM = document.getElementById("wind");
        const placeDOM = document.getElementById("place");

        descriptionDOM.textContent = longDesc;
        tempDOM.textContent = temp;
        placeDOM.textContent = place;
        feelsLikeDOM.textContent = feelsLike;
        humidityDOM.textContent = humidityPercent;
        windDOM.textContent = wind;
    };

    static renderForecast = (
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
        fifthDate,
    ) => {
        const firstDayDOM = document.getElementById("first-day");
        const secondDayDOM = document.getElementById("second-day");
        const thirdDayDOM = document.getElementById("third-day");
        const fourthDayDOM = document.getElementById("fourth-day");
        const fifthDayDOM = document.getElementById("fifth-day");

        firstDayDOM.innerHTML = `${firstDayTemp} <br><span class="forecast-feels-like">${firstDayFeelsLike}</span>`;
        secondDayDOM.innerHTML = `${secondDayTemp} <br><span class="forecast-feels-like">${secondDayFeelsLike}</span>`;
        thirdDayDOM.innerHTML = `${thirdDayTemp} <br><span class="forecast-feels-like">${thirdDayFeelsLike}</span>`;
        fourthDayDOM.innerHTML = `${fourthDayTemp} <br><span class="forecast-feels-like">${fourthDayFeelsLike}</span>`;
        fifthDayDOM.innerHTML = `${fifthDayTemp} <br><span class="forecast-feels-like">${fifthDayFeelsLike}</span>`;

        const icon1DOM = firstDayDOM.previousSibling;
        const icon2DOM = secondDayDOM.previousSibling;
        const icon3DOM = thirdDayDOM.previousSibling;
        const icon4DOM = fourthDayDOM.previousSibling;
        const icon5DOM = fifthDayDOM.previousSibling;

        icon1DOM.src = icon1;
        icon2DOM.src = icon2;
        icon3DOM.src = icon3;
        icon4DOM.src = icon4;
        icon5DOM.src = icon5;

        const dayName1DOM = icon1DOM.previousSibling;
        const dayName2DOM = icon2DOM.previousSibling;
        const dayName3DOM = icon3DOM.previousSibling;
        const dayName4DOM = icon4DOM.previousSibling;
        const dayName5DOM = icon5DOM.previousSibling;

        dayName1DOM.textContent = firstDate;
        dayName2DOM.textContent = secondDate;
        dayName3DOM.textContent = thirdDate;
        dayName4DOM.textContent = fourthDate;
        dayName5DOM.textContent = fifthDate;
    };

    static renderRainPercent = (data) => {
        const chanceDOM = document.getElementById("chance-of-rain");
        chanceDOM.textContent = data;
    };

    static renderCurrentIcon = (icon) => {
        const iconDOM = document.getElementById("icon");
        iconDOM.src = icon;
    };

    static renderCurrentDate = (date) => {
        const dateDOM = document.getElementById("date");
        dateDOM.textContent = date;
    };

    static snackbar = (text) => { // snackbar alert settings
        const snackbarDOM = document.getElementById("snackbar");
        snackbarDOM.textContent = text;
        snackbarDOM.classList.add("show");
        setTimeout(() => {
            snackbarDOM.classList.remove("show");
        }, 3000);
    };

    static loadingShow = () => {
        const loadingDOM = document.querySelector(".loading");
        const bodyDOM = document.querySelector("body");
        loadingDOM.classList.add("show");
        bodyDOM.classList.add("blur");
    };

    static loadingClose = () => {
        const bodyDOM = document.querySelector("body");
        const loadingDOM = document.querySelector(".loading");
        loadingDOM.classList.remove("show");
        bodyDOM.classList.remove("blur");
    };

    static clearInput = () => {
        const searchInputDOM = document.getElementById("search-input");
        searchInputDOM.value = "";
    };

    static requestGeoLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                Weather.getGeolocation(lat, lon);
            });
        } else {
            this.snackbar("Geolocation is not supported by your browser.");
        }
    };
}

DOM.initButtons();
Weather.getWeatherLink("İstanbul");
