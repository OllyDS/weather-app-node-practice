const yargs = require('yargs')
const axios = require('axios')

const geocode = require('./geocode/geocode')
const weather = require('./weather/weather')

const apiKey = 'AIzaSyDHGWU2pp3lHz0rTA4Y5xviZMbwibBcWns'
const forecastApiKey = '5af8a9e1cdd1c24119ad09b6beb6eaf0'

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for.',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv


const encodedAddress = encodeURIComponent(argv.address)
const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`

axios.get(geocodeUrl)
    .then((response) => {
        if (response.data.status === 'ZERO_RESULTS') {
            throw new Error('Unable to find that address')
        }
        const lat = response.data.results[0].geometry.location.lat
        const lng = response.data.results[0].geometry.location.lng
        const weatherUrl = `https://api.darksky.net/forecast/${forecastApiKey}/${lat},${lng}`
            console.log(response.data.results[0].formatted_address)
            return axios.get(weatherUrl)
    })
    // NOTE - The return of our first function is the fetch request for the weatherUrl.
    // We use .then to chain our 2nd Promise, which doesn't require error handling as it's handled in the 1st.
    .then((response) => {
        const temperature = response.data.currently.temperature
        const apparentTemperature = response.data.currently.apparentTemperature
        console.log(`It's currently ${temperature} F, it feels like ${apparentTemperature} F`)
    })
    .catch((error) => {
        if (error.code === 'ENOTFOUND') {
            console.log('Unable to connect to API services')
        } else {
            console.log(error.message)
        }
    })
       