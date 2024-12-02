// config TMDB here
import Config from "../config";
import axios from "axios";
// axios : imagine it as a mailman specialized in sending and receiving data from HTTP requests. it's a library that helps you to send HTTP requests to a server and receive the response.
// without axios : you have to write a lot of code to send and receive data from a server. axios makes it easier for you to do that.

class TMDBConfig {
    private static readonly baseURL = "https://api.themoviedb.org/3"; // TMDB API URL
    private static readonly apiKey = Config.tmdbApiToken; // TMDB API Token

    private static readonly axiosInstance = axios.create({
        baseURL: this.baseURL,
        headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json' 
        }
    });


    // tmdb doesn't send all of its data in one request, it sends it in pages. so you have to specify the page number to get the data from that page. 
    // page = 1 : films 1-20
    // if we want to get the next 20 films, we have to call like : getNowPlayingMovies(2), or getNowPlayingMovies(3) etc
    static async getNowPlayingMovies(page: number = 1): Promise<any> {
        try {
            const response = await this.axiosInstance.get('/movie/now_playing', {
                params: {
                    page,
                    language: 'fr-FR'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error while fetching now playing movies', error);
            throw error;
        }
    }

    static async getMovieDetails(movieId: number): Promise<any> {
        try {
            const response = await this.axiosInstance.get(`/movie/${movieId}`, {
                params: {
                    language: 'fr-FR'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error while fetching movie details', error);
            throw error;
        }
    }

}

export default TMDBConfig;