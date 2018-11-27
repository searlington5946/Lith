function saveSettings() {

    var currentlyChecked = $('input:radio:checked').val();

    if (currentlyChecked == "ratio") {
        ratioEnabled = true;
        percentageEnabled = false;
    } else if (currentlyChecked == "percentage") {
        ratioEnabled = false;
        percentageEnabled = true;
    } else {
        alert("Error: settings could not be saved");
    }
 
    localStorage.setItem("settings", JSON.stringify(

        {
            ratio: ratioEnabled,
            percentage: percentageEnabled,
        }

    ));

}

function loadSettings() {

    var settings = JSON.parse(localStorage.getItem("settings"));

    if (settings != null) {

        ratioEnabled = settings.ratio;
        percentageEnabled = settings.percentage;

    }

    return settings;

}