const request = require('request')

const forecast = (cityId , callback) => {
    const url = 'http://api.openweathermap.org/data/2.5/forecast?id='+ cityId +'&APPID=b5e25ea0da89a8e0dd9951a7f09804cf'
    request({url, json : true}, (error, response) => {
        if(error){
            callback('Unable to connect to Weather services!', undefined)
        }
        else if(response.body.message){
            callback(response.body.message, undefined)
        }
        else{
            const tempInK = response.body.list[0].main.temp
            const temp=  Math.round(((tempInK- 273.15) + Number.EPSILON) *100)/100
            const city = response.body.city.name
            const forecastData = {
                 city,
                 temp
            }
            callback(undefined, forecastData)
        }
    })
}
module.exports = forecast