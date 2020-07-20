const request = require('request');

const geoCode = function(error, location, callback) {
    if (error) {
        callback(error);
    } else {
        location = location.split(' ').join('%20');
        url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1IjoibWluaHZ1ODM5MyIsImEiOiJja2MzNWd4c3YwamVmMzFvNXdqYmZqMDg0In0.freAEtwKzTQG3RedebXrgA&limit=1`
        request( {url: url, json: true}, (error, response) => {
            if (error) {
                callback("Unable connect to server");
            } else {
                if (!response.body.features[0]) {
                    callback("Unable to find that location. Try another search");
                } else {
                    result = {
                        latitude: response.body.features[0].center[1],
                        longitude: response.body.features[0].center[0],
                        placename: response.body.features[0].place_name,
                    }
                    callback(undefined, result);
                }
            }
        })
    }
}

module.exports = geoCode;