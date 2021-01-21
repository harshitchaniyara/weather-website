const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast.js')
const geocode = require('./utils/geocode.js')

const app = express()

// define path for express configuretion
const pathDirectory = path.join(__dirname, '../public')
const viewDirectorypath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlers and engine and view location
app.set('view engine', 'hbs')
app.set('views', viewDirectorypath)
hbs.registerPartials(partialsPath)

// Setup static directory serve
app.use(express.static(pathDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Harshit Chaniyara',
        parterName : 'Harshil Kaneria'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title : 'Weather',
        name : 'Harshit Chaniyara',
        parterName : 'Harshil Kaneria'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title : 'Weather',
        name : 'Harshit Chaniyara',
        parterName : 'Harshil Kaneria'
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error : 'please enter a search product'})
    }
    console.log(req.query)
    res.send({
        products : []
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error : 'Please enter address.....'
        })
    } 

    geocode(req.query.address,(error, {latitude,logitude,location} = {}) => {
        if(error){
            return res.send({error})
        }

        forecast(latitude, logitude, (error,forcastData) => {
            if(error){
                return res.send({error})
            }

           return res.send({
                location,
                forcastData
            })

        })
    })


    
})



app.get('/help/*', (req, res) => {
    res.render('404',{
        errorMSG : 'help artical not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMSG : 'Page not found'
    })
})

app.listen(8080, () => {
    console.log('Server start on port 3000\n visit localhost:3000 in chrome')
})

