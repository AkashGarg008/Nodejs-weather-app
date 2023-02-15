const path = require('path');
const express = require('express');
const hbs = require('hbs')
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// to create express application/server
const app = express();


// to change template directory name
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// to serve dyanamic pages
app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// to host a static app
app.use(express.static(path.join(__dirname, '../public')));


// to host template pages or dyanamic pages
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Akash'
    }) // object param contains the dyanamic data to render
});


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Akash Garg'
    })
})

// to work on the server routes / to send info to the user accessing the server url

// app.get('', (req, res) => {     // commenting because hosted as a static app
//     res.send('<h1>Welcome</h1>' + 'Hello guys!! Welcome to my new server!!')
// });

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Akash'
    })
});

// api endpoint for weather info
app.get('/weather', (req, res) => {
    const query = req.query;
    if (!query.address) {
        return res.send({
            error: "Address is missing!! try again !!"
        });
    } else {
        geocode(query.address, (error, geoData) => {
            if (!error) {
                console.log('Success getting geolocation!');
                console.log(geoData);
                forecast({latitude: geoData.latitude, longitude: geoData.longitude}, (error, forecastData) => {
                    if (!error) {
                        console.log('Success getting forecast!');
                        console.log(forecastData);
                        const responseData = 'Forecast: ' + forecastData.weather_descriptions + '. It is ' + forecastData.temperature + ' faranheit out. But feels like ' + forecastData.feelslike + ' farhanheit.';
                        res.send({
                            forecast: responseData,
                            location: geoData.place,
                            address: query.address
                        });
                    } else {
                        console.log('Failure');
                        res.send(error);
                    }
                })
            } else {
                console.log('Failure');
                res.send(error);
            }
        })
    }

    // res.send({
    //     forecast: 'sunny',
    //     location: 'Delhi',
    //     address: req.query.address
    // });

});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
});


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Akash',
        errorMessage: 'Help article not found.'
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Akash Garg',
        errorMessage: 'Page not found.'
    })
})
// to start a web-server/ application

app.listen(3000, () => {
    console.log('Server is up!!');
})

