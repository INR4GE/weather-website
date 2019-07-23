const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname,'../public/index.html'))

const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and ./views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res)=> {
    res.render('index', {
        title: 'Weather',
        name: 'Vova'
    })
})

app.get('/about', (req, res)=> {
    res.render('about', {
        title: 'About me',
        name: 'Vova'
    })
})

app.get('/help', (req,res)=> {
    res.render('help', {
        title:'Help page',
        helpText:'Some helpful text',
        name: 'Vova'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
          return res.send({
            error: error
          })
        } 
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({
                    error: error
                })
            }
            res.send({
                location,
                address: req.query.address,
                forecast: forecastData
            })
          })
    })

    // res.send({
    //     location: req.query.address,
    //     forecast: 'Its 20 degrees tonight'
    // })
})

app.get('/products', (req,res)=> {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res)=>{
    res.render('404', {
        error: 'No help found', 
        name: 'kek'
    })
})

app.get('*', (req,res)=>{
    res.render('404', {
        error: '404',
        name: 'Kek'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})

