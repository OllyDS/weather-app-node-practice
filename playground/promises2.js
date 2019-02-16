const request = require('request')
const apiKey = 'AIzaSyDHGWU2pp3lHz0rTA4Y5xviZMbwibBcWns'


const geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
        const encodedAddress = encodeURIComponent(address)
        request({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`,
            json: true
        }, (error, response, body) => {
            if (error) {
                reject('Unable to connect to Google servers.')
            } else if (body.status === 'ZERO_RESULTS') {
                reject('Unable to find that address')
            } else if (response.statusCode === 200) {
                resolve({
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng
                })
            }
        })
    })
} 

geocodeAddress().then((location) => {
    console.log(JSON.stringify(location, undefined, 2))
}, (errorMessage) => {
    console.log(errorMessage)
})