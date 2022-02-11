const express = require("express"),
    app = express()
port = process.env.PORT || 3000,
    fs = require('fs-extra');
const mongoose = require("mongoose");
const axios = require('axios').default;

const {
    addMovie,
    getMoviebyIDandUpdate,
    getAllMovies,
    getLatesMovieByPublishDate,
    addMovieRouteFormDBandWriteJson,
    getAllByCountryName,
    getMovieByName
} = require('./controllers/movieController')

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.get('/', (req, res) => {
    return res.json({
        hello: "world"
    })
})

mongoose
    .connect("mongodb://0.0.0.0:27017/blockMonster").then(() => {
        app.listen(port, () => {
            console.info(`start server start listening on port http://localhost:${port}`)
        })
    }).catch(err => console.error(err))

app.post('/addMovie', (req, res) => {
    const {
        name,
        date,
        country,
        cast
    } = req.body
    addMovie(name, date, country, cast)
        .then((movieData) => res.json(movieData))
        .catch((error) => res.json(error))
})

app.get('/allMovies', (req, res) => {
    getAllMovies()
        .then((movieData) => res.json(movieData))
        .catch((error) => res.json(error))
})

app.get('/getLatesDate', (req, res) => {
    const {
        date,
    } = req.body
    getLatesMovieByPublishDate(date)
        .then((movieData) => res.json(movieData))
        .catch((error) => res.json(error))
})

app.put('/movie/:id', async (req, res, next) => {
    const {
        name,
        date,
        country,
        cast
    } = req.body
    getMoviebyIDandUpdate(req.body, name, date, country, cast)
        .then((movieData) => res.json(movieData))
        .catch(err => res.json(err))
})

app.get('/findMovie/:ByCountry', (req, res) => {
    const {
        country,
    } = req.body
    getAllByCountryName(req.body, country)
        .then((movieData) => res.json(movieData))
        .catch((error) => res.json(error))
})

app.get('/createJsonFile', (req, res) => {
    fs.createWriteStream("movies.json");
})

app.get('/download', (req, res) => {
    addMovieRouteFormDBandWriteJson()
        .then((movieData) => res.json(movieData))
        .catch((error) => res.json(error))
});

app.get('/findMovie/:byName', (req, res) => {
    const {
        name,
    } = req.params.byName
    getMovieByName(req.params.byName, name)
    axios.get(`https://imdb-api.com/en/API/SearchMovie/k_12345678/${req.body.name}`, {
            timeout: 5000,
        }).then((movieData) => res.json(movieData))
        .catch((error) => res.json(error))
})