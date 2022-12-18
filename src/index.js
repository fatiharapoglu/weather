import Weather from "./API";

class DOM {
    static initButtons = () => {
        const searchBtnDOM = document.getElementById("search-btn");
        const unitChangerBtnDOM = document.getElementById("change-unit-btn");
        searchBtnDOM.addEventListener("click", this.getLocation);
        unitChangerBtnDOM.addEventListener("click", this.toggleUnits);
    };

    static getLocation = () => {
        const searchInputDOM = document.getElementById("search-input");
        const location = searchInputDOM.value;
        if (location === "") return;
        Weather.getWeatherLink(location);
    };

    static toggleUnits = () => {
        const unitChangerBtnDOM = document.getElementById("change-unit-btn");
        if (unitChangerBtnDOM.textContent === "Units to °F") {
            unitChangerBtnDOM.textContent = "Units to °C";
        } else {
            unitChangerBtnDOM.textContent = "Units to °F";
        }
    };
}

DOM.initButtons();
