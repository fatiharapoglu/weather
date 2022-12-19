import Weather from "./API";

export default class DOM {
    static activeUnit = "C";

    static lastLocation = "London";

    static initButtons = () => {
        const searchBtnDOM = document.getElementById("search-btn");
        const unitChangerBtnDOM = document.getElementById("change-unit-btn");
        searchBtnDOM.addEventListener("click", (event) => {
            event.preventDefault();
            this.getLocation();
        });
        unitChangerBtnDOM.addEventListener("click", this.toggleUnits);
    };

    static getLocation = () => {
        const searchInputDOM = document.getElementById("search-input");
        const location = searchInputDOM.value;
        if (location === "") return this.snackbar("Search area can not be empty.");
        this.lastLocation = location;
        Weather.getWeatherLink(location);
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

    static renderCurrent = (temp, place, feelsLike, humidityPercent, longDesc, shortDesc, wind) => {
        const dateDOM = document.getElementById("date");
        const descriptionDOM = document.getElementById("description");
        const tempDOM = document.getElementById("temp");
        const feelsLikeDOM = document.getElementById("feels-like");
        const humidityDOM = document.getElementById("humidity");
        const windDOM = document.getElementById("wind");
        const placeDOM = document.getElementById("place");

        dateDOM.textContent = new Date().toDateString();
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
    ) => {
        const firstDayDOM = document.getElementById("first-day");
        const secondDayDOM = document.getElementById("second-day");
        const thirdDayDOM = document.getElementById("third-day");
        const fourthDayDOM = document.getElementById("fourth-day");
        const fifthDayDOM = document.getElementById("fifth-day");

        const icon1DOM = firstDayDOM.nextSibling;
        const icon2DOM = secondDayDOM.nextSibling;
        const icon3DOM = thirdDayDOM.nextSibling;
        const icon4DOM = fourthDayDOM.nextSibling;
        const icon5DOM = fifthDayDOM.nextSibling;

        firstDayDOM.textContent = `Temp : ${firstDayTemp} Feels Like: ${firstDayFeelsLike}`;
        secondDayDOM.textContent = `Temp : ${secondDayTemp} Feels Like: ${secondDayFeelsLike}`;
        thirdDayDOM.textContent = `Temp : ${thirdDayTemp} Feels Like: ${thirdDayFeelsLike}`;
        fourthDayDOM.textContent = `Temp : ${fourthDayTemp} Feels Like: ${fourthDayFeelsLike}`;
        fifthDayDOM.textContent = `Temp : ${fifthDayTemp} Feels Like: ${fifthDayFeelsLike}`;

        icon1DOM.src = icon1;
        icon2DOM.src = icon2;
        icon3DOM.src = icon3;
        icon4DOM.src = icon4;
        icon5DOM.src = icon5;
    };

    static renderRainPercent = (data) => {
        const chanceDOM = document.getElementById("chance-of-rain");
        chanceDOM.textContent = data;
    };

    static renderCurrentIcon = (icon) => {
        const iconDOM = document.getElementById("icon");
        iconDOM.src = icon;
    };

    static snackbar(text) { // snackbar alert settings
        const snackbarDOM = document.getElementById("snackbar");
        snackbarDOM.textContent = text;
        snackbarDOM.classList.add("show");
        setTimeout(() => {
            snackbarDOM.classList.remove("show");
        }, 3000);
    }
}

DOM.initButtons();
Weather.getWeatherLink("London");
