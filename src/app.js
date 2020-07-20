const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geoCode = require('./geocode.js');
const getWeather = require('./getweather.js');

const app = express();

// Path
assetPath = path.join(__dirname, '../asset');
viewsPath = path.join(__dirname, '../templates/views');

// setup express
app.set('views', viewsPath);
app.set('view engine', 'hbs');
app.use(express.static(assetPath));

// Route
app.get('', (req, res) => { 
    if (req.query.location) {
        geoCode(undefined, req.query.location, (error, result) => {
            if (error) {
                res.send(JSON.stringify(error));
            } else {
                getWeather(undefined, result, (error, weatherResult) => {
                    if (error) {
                        res.send(JSON.stringify(error));
                    } else {
                        res.send(weatherResult);
                    }
                })
            }
        })
    } else {
        res.render('weather');
    }
})


app.listen(3000, () => {
    console.log('Server start at port 3000');
})

console.log();

