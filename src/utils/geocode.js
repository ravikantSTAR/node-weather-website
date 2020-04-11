const request = require('request')

const geoCode = (address, callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoia2FudHN0YXIiLCJhIjoiY2s4aGw3eTFvMDFsazNmczEwOWUzZmxtaSJ9.g42rWYAPITYsaz89-OSyxg'
    request({url, json : true}, (error, response) => {
        if(error){
            callback('Unable to connect to Geo services!', undefined)
        }
        else if(response.body.features.length === 0){
        callback('Not able to find place', undefined)
        }
        else{
        const long = response.body.features[2].geometry.coordinates[0]
        const lat = response.body.features[2].geometry.coordinates[1]
            callback(undefined, {
                latitude : response.body.features[2].geometry.coordinates[0],
                longitude : response.body.features[2].geometry.coordinates[1],
                location : response.body.features[0].place_name
            })
        }
    })
}
module.exports = geoCode