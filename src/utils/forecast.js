const request = require('postman-request');

const forecast = (cordinates, callback) => {
    const forecastUrl = 'http://api.weatherstack.com/current?access_key=cf20ea0ddcd2d9f03bb28705b791ace5&query=' + cordinates.latitude + ',' + cordinates.longitude + '&units:f';
    request({url: forecastUrl, json: true }, (error, response) => {
        if (error) {
            callback('Network connection error!!', undefined);
        } else if (response.body.error) {
            callback('Unable to find location!!', undefined);
        } else {
            callback(undefined, response.body.current);
        }
    });
}

module.exports = forecast;

