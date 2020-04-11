const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()

//Define paths for express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectory))


app.get('', (req, res) => {
    res.render('index', {
        title : 'Weather',
        name : 'Ravikant' 
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title : 'About',
        name : 'Ravikant'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message : 'I am here to help!',
        title : 'Help',
        name : 'Ravikant'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error : 'Please provide the the City ID'
        })
    }
//Making API request for Forecast
    forecast(req.query.address, (error, {city, temp}={}) => {
        if(error){
            //return console.log(error)
            return res.send({error: 'City code is invalid'})
        }
        if(!city){
            return res.send({error : "City code is invalid"})
        }
        geocode(city, (error, forecastData) => {
            if(error){
                return console.log(error)
            }
            console.log(city)
            console.log(temp)
            console.log(forecastData)
            res.send({
                temperature : temp,
                location : city,
                forecast : forecastData
            })
        })
    })

})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'please provide the search field'
        })
    }
    console.log(req.query)
    res.send({
        products : []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        error : 'Help article not found',
        title : 'Help Article Error',
        name : 'Ravikant'
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        error : 'Error 404 : Page not found',
        title : 'Error',
        name : 'Ravikant'
    })
})

app.listen('3000', () => {
    console.log('Server is up and running on port: 3000')
})