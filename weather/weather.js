const request = require('request')

forecastApiKey = '5af8a9e1cdd1c24119ad09b6beb6eaf0'

const getWeather = (lat, lng, callback) => {
    request({
        url: `https://api.darksky.net/forecast/${forecastApiKey}/${lat},${lng}`,
        json: true
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            callback({
                temperature: body.currently.temperature,
                apparentTemp: body.currently.apparentTemperature
            })
        } else {
            callback('Error - Unable to fetch weather. Please re-check inputs')
        }
    })
}

module.exports = {
    getWeather
}