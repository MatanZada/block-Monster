const Movie = require('../models/movie');

const addMovie = (name, date, country, cast) => {
    return new Promise((resolve, reject) => {
        let movie = new Movie({
            name,
            date,
            country,
            cast
        })
        movie.save()
            .then((movieResult) => resolve(movieResult))
            .catch((error) => reject(error))
    })
}

const getAllMovies = () => {
    return new Promise((resolve, reject) => {
        Movie.find({}, {}, {
            allMovie: {
                allMovie: movie
            }
        }, (err, movieData) => {
            err ? reject(err) : resolve(movieData);
        });
    })
}

const getMoviebyIDandUpdate = (_id) => {
    return new Promise((resolve, reject) => {
        Movie.findById(_id)
            .lean()
            .then((movie) => resolve(movie))
            .catch((err) => reject(err));
    });

}

const getLatesMovieByPublishDate = () => {
    return new Promise((resolve, reject) => {
        Movie.findOne({}, {}, {
            date: dateLates,
            $gte: new Date(2000, 4, 24),
            $lt: new Date(2001, 7, 15)

        }, (err, movieData) => {
            err ? reject(err) : resolve(movieData);
        });
    });

}

const getAllByCountryName = (country) => {
    return new Promise((resolve, reject) => {
        Movie.findOne({
                country: country
            },
            (err, movieData) => {
                err ? reject(err) : resolve(movieData);
            }).select(country)
    })
}
const addMovieRouteFormDBandWriteJson = (movieData) => {
    return new Promise((resolve, reject) => {
        fs.writeFile('movies.json', movieData, (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        }, (err, movieData) => {
            err ? reject(err) : resolve(movieData);
        })
    })
}

const getMovieByName = (name) => {
    return new Promise((resolve, reject) => {
        Movie.findOne({
                name: name
            },
            (err, movieData) => {
                err ? reject(err) : resolve(movieData);
            }).select(name)
    })
}

module.exports = {
    addMovie,
    getMoviebyIDandUpdate,
    getAllMovies,
    getLatesMovieByPublishDate,
    getAllByCountryName,
    addMovieRouteFormDBandWriteJson,
    getMovieByName
}