import express from 'express';
import { TMDBMovieController } from '../../4.controllers/TMDBMovieController';

const tmdbMoviePath = express.Router();

// Route without authentication FOR NOW !!!! 
tmdbMoviePath.get('/tmdb/movies/now_playing', (req, res) => {
    TMDBMovieController.getNowPlayingMovies(req, res);
});

export default tmdbMoviePath;