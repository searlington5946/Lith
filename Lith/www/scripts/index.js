// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in cordova-simulate or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);
        $('#get-weather-btn').click(getWeatherWithZipCode);

        //Populate the page with the current location's weather conditions
        getWeatherWithGeoLocation();
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
})();

// https://api.jquerymobile.com/1.4/category/events/
// pagecreate
// Triggered when the page has been created in the DOM (via ajax or other)
// and after all widgets have had an opportunity to enhance the contained markup.
$('#settings-page').on('pagecreate', function (event) {

    $('#save-button').click(function () { saveSettings(); configureWeatherData(); });

    // user left without saving so just reload the current settings
    $('#back-button').click(function () { loadSettings(); })

    loadSettings();

})