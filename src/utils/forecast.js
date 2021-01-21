const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=c218ded87a95f586af5ffcdeb268382c&query='+latitude+','+longitude

    request({url, json: true}, (error,{body}={}) => {
        if(error){
            callback('Unable to find weather service. Check your internet connection....!',undefined)
        }else if(body.error){
            callback('Unable to find location. Try again',undefined)
        }else{
            callback(undefined,`${body.current.weather_descriptions[0]}. It's like currently ${body.current.temperature} degress out. It feels like ${body.current.feelslike} degress out.`)
        }
    })
}

module.exports=forecast