import Config from "../Config";
import axios, { AxiosInstance } from "axios";

class TMDBConfig {
    private readonly baseURL = "https://api.themoviedb.org/3"; // TMDB API URL
    private readonly apiKey = Config.tmdbApiToken; // TMDB API Token
    private readonly axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: this.baseURL,
            headers: {
                'Authorization': `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json'
            }
        });
    }

    // Méthode pour récupérer les films actuellement en salle
    async getNowPlayingMovies(page: number = 1): Promise<any> {
        try {
            const response = await this.axiosInstance.get('/movie/now_playing', {
                params: {
                    page,
                    language: 'fr-FR'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des films actuellement en salle :', error);
            throw new Error('Unable to fetch now playing movies.');
        }
    }

    // Méthode pour récupérer les films populaires
    async getPopularMovies(page: number = 1): Promise<any> {
        try {
            const response = await this.axiosInstance.get('/movie/popular', {
                params: {
                    page,
                    language: 'fr-FR'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des films populaires :', error);
            throw new Error('Unable to fetch popular movies.');
        }
    }

    // Méthode pour récupérer les détails d'un film spécifique
    async getMovieDetails(movieId: number): Promise<any> {
        try {
            const response = await this.axiosInstance.get(`/movie/${movieId}`, {
                params: {
                    language: 'fr-FR'
                }
            });
            return response.data;
        } catch (error) {
            console.error(`Erreur lors de la récupération des détails du film (ID : ${movieId}) :`, error);
            throw new Error(`Unable to fetch movie details for ID: ${movieId}`);
        }
    }

    // Méthode pour récupérer les providers pour un film spécifique
    async getMovieProviders(movieId: number): Promise<any> {
        try {
            const response = await this.axiosInstance.get(`/movie/${movieId}/watch/providers`);
            return response.data.results;
        } catch (error) {
            console.error(`Erreur lors de la récupération des providers pour le film (ID : ${movieId}) :`, error);
            throw new Error(`Unable to fetch movie providers for ID: ${movieId}`);
        }
    }
}

// Exporter une instance de la classe
const tmdbConfig = new TMDBConfig();
export default tmdbConfig;
