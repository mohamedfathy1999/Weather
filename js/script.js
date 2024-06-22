async function search(a) {
    try {
        let response = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=1ed2435df2d2479f93983624242206&q=${a}&days=3`
        );

        if (response.ok) {
            let data = await response.json();
            displayCurrent(data.location, data.current);
            displayAnother(data.forecast.forecastday);
        } else {
            console.error("HTTP error: " + response.status);
        }
    } catch (error) {
        console.error("Fetch error: " + error.message);
    }
}

document.getElementById("search").addEventListener("keyup", (a) => {
    search(a.target.value);
});

var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];
const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

function displayCurrent(location, current) {
    if (current != null) {
        var date = new Date(current.last_updated.replace(" ", "T"));
        let currentWeatherHtml = `
            <div class="today forecast">
                <div class="forecast-header" id="today">
                    <div class="day">${days[date.getDay()]}</div>
                    <div class="date">${date.getDate()} ${monthNames[date.getMonth()]}</div>
                </div>
                <div class="forecast-content" id="current">
                    <div class="location">${location.name}</div>
                    <div class="degree">
                        <div class="num">${current.temp_c}<sup>o</sup>C</div>
                        <div class="forecast-icon">
                            <img src="https:${current.condition.icon}" alt="" width="90">
                        </div>
                    </div>
                    <div class="custom">${current.condition.text}</div>
                    <span><img src="images/icon-umberella.png" alt="">20%</span>
                    <span><img src="images/icon-wind.png" alt="">18km/h</span>
                    <span><img src="images/icon-compass.png" alt="">East</span>
                </div>
            </div>`;
        document.getElementById("forecast").innerHTML = currentWeatherHtml;
    }
}

function displayAnother(forecastDays) {
    let forecastHtml = "";
    for (let i = 1; i < forecastDays.length; i++) {
        let date = new Date(forecastDays[i].date.replace(" ", "T"));
        forecastHtml += `
            <div class="forecast">
                <div class="forecast-header">
                    <div class="day">${days[date.getDay()]}</div>
                </div>
                <div class="forecast-content">
                    <div class="forecast-icon">
                        <img src="https:${forecastDays[i].day.condition.icon}" alt="" width="48">
                    </div>
                    <div class="degree">${forecastDays[i].day.maxtemp_c}<sup>o</sup>C</div>
                    <small>${forecastDays[i].day.mintemp_c}<sup>o</sup></small>
                    <div class="custom">${forecastDays[i].day.condition.text}</div>
                </div>
            </div>`;
    }
    document.getElementById("forecast").innerHTML += forecastHtml;
}

search("cairo");
