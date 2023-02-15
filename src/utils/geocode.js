const request = require('postman-request');

const geocode = (place, callback) => {
    const geocodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(place) + '.json?access_token=pk.eyJ1IjoiYWthZ2FyZzA4IiwiYSI6ImNsZTVpandydzBhNHIzb3M0NTR4Mzg4MHoifQ.Bh0B-iO3LlBtHURjVwEmdw&limit=1';
    request({url: geocodeUrl, json: true }, (error, response) => {
        if (error) {
            callback('Network connection error!!', undefined);
        } else if (response.body.features.length === 0) {
            callback('Match not found!!!', undefined);
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                place: response.body.features[0].place_name
            });
        }
    });
}

module.exports = geocode;

