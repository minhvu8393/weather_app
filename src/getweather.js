const request = require('request');

const getWeather = function(error, geocode, callback) {
    if (error) {
        callback(error);
    } else {
        url = `http://api.weatherstack.com/current?access_key=8a160e0279f70717bef2cc8ff5801ad9&query=${geocode.latitude},${geocode.longitude}`
        request( {url: url, json: true}, (error, response) => {
            if (error) {
                callback("Unable connect to server");
            } else {
                if (response.body.success === false) {
                    callback("Unable to find that location. Try another search");
                } else {
                    result = {
                        temperature: response.body.current.temperature,
                        feelslike: response.body.current.feelslike,
                        descriptions: response.body.current.weather_descriptions[0],
                        humidity: response.body.current.humidity,
                        placename: geocode.placename,
                    }
                    callback(undefined, result);
                }
            }
        })
    }
}

module.exports = getWeather;