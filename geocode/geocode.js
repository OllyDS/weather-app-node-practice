const request = require('request')

apiKey = 'AIzaSyDHGWU2pp3lHz0rTA4Y5xviZMbwibBcWns'

geocodeAddress = (address, callback) => {
    encodedAddress = encodeURIComponent(address)
    // console.log(encodedAddress) - shows the encoded address
    
    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to Google servers')
        } else if (body.status === 'ZERO_RESULTS') {
            callback('Unable to find that address - please try again.')
        } else if (response.statusCode === 200) {
            callback(undefined, {
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            })
        }
    })
}

module.exports = {
    geocodeAddress
}