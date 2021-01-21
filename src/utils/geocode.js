const request = require('request')

const geocode = (address, callback) => {
    
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiYWJjZGUxIiwiYSI6ImNram5xOWx0dDA1engyeWwxN3hrbnF1eTcifQ.DVuapzO5w4-h10w5zXP4XQ&limit=1'

    request({ url, json: true}, (error, {body}={}) => {
        if(error){
          callback('Unable to connect location service. Check your internet connection....!',undefined)
        }else if(body.features.length == 0){
            callback('Unable to find location. Try again......!',undefined)
        }else{
            callback(undefined,{
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode