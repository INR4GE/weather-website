const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/a14cdfc5646007b624775f67ddc82db6/'+lat+','+long+'?units=si&lang=en'

    request({url, json: true}, (error, { body }) => {
        if(error) {
            callback('Unable to connect to weather server',undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + 'It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain. The minimal temperature is '+ body.daily.data[0].temperatureMin+' while maximum is '+body.daily.data[0].temperatureMax)
        }
    })
}

module.exports = forecast