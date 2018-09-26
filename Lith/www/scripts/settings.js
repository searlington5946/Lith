var windEnabled = true;
var humidityEnabled = true;
var visibilityEnabled = true;
var sunriseEnabled = true;
var sunsetEnabled = true;
var degreeEnabled = true;
var headingEnabled = true;

function saveSettings() {

    windEnabled = $("#wind-check").prop('checked');
    humidityEnabled = $("#humidity-check").prop('checked');
    visibilityEnabled = $("#visibility-check").prop('checked');
    sunriseEnabled = $("#sunrise-check").prop('checked');
    sunsetEnabled = $("#sunset-check").prop('checked');
    degreeEnabled = $("#degree-check").prop('checked');
    headingEnabled = $("#heading-check").prop('checked');

    localStorage.setItem("settings", JSON.stringify(

        {
            wind: windEnabled,
            humidity: humidityEnabled,
            visibility: visibilityEnabled,
            sunrise: sunriseEnabled,
            sunset: sunsetEnabled,
            degree: degreeEnabled,
            heading: headingEnabled
        }

    ));

}

function loadSettings() {

    var settings = JSON.parse(localStorage.getItem("settings"));

    if (settings != null) {

        windEnabled = settings.wind;
        humidityEnabled = settings.humidity;
        visibilityEnabled = settings.visibility;
        sunriseEnabled = settings.sunrise;
        sunsetEnabled = settings.sunset;
        degreeEnabled = settings.degree;
        headingEnabled = settings.heading;

    }

    // have to call refresh to update the element's class
    $("#wind-check").prop('checked', windEnabled).checkboxradio('refresh');
    $("#humidity-check").prop('checked', humidityEnabled).checkboxradio('refresh');
    $("#visibility-check").prop('checked', visibilityEnabled).checkboxradio('refresh');
    $("#sunrise-check").prop('checked', sunriseEnabled).checkboxradio('refresh');
    $("#sunset-check").prop('checked', sunsetEnabled).checkboxradio('refresh');
    $("#degree-check").prop('checked', degreeEnabled).checkboxradio('refresh');
    $("#heading-check").prop('checked', headingEnabled).checkboxradio('refresh');

    return settings;

}