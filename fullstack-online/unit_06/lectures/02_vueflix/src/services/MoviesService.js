import { AppState } from "@/AppState.js";
import { movieDbApiKey } from "@/env.js"
import { FullMovie, Movie } from "@/models/Movie.js";
import axios from "axios"

const movieApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: movieDbApiKey,
    'certification.gte': 'G',
    'certification.lte': 'R',
    certification_country: 'US',
    include_adult: false
  }
})


class MoviesService {
  async getMovieDetailsById(movieId) {
    AppState.activeMovie = null
    const response = await movieApi.get(`movie/${movieId}`)
    console.log('👆🎞️📡', response.data);
    const movie = new FullMovie(response.data)
    AppState.activeMovie = movie
  }



  async discoverMovies() {
    AppState.currentSearch = null
    const response = await movieApi.get('discover/movie')
    console.log('🎞️📡', response.data);
    // const movies = response.data.results.map(movieData => new Movie(movieData))
    // AppState.movies = movies
    // AppState.currentPage = response.data.page
    // AppState.totalPages = response.data.total_pages
    this.handleResponse(response.data)
  }
  async changeDiscoverPage(pageNumber) {
    const response = await movieApi.get(`discover/movie?page=${pageNumber}`)
    console.log('📄🎞️📡', response.data);
    this.handleResponse(response.data)
  }

  async searchMovies(searchTerm) {
    AppState.currentSearch = searchTerm
    const response = await movieApi.get(`search/movie?query=${searchTerm}`)
    console.log('🔍🎞️📡', response.data);
    this.handleResponse(response.data)
  }

  async changeSearchPage(pageNumber, searchTerm) {
    const response = await movieApi.get(`search/movie?query=${searchTerm}&page=${pageNumber}`)
    console.log('🔍📄🎞️📡', response.data);
    this.handleResponse(response.data)
  }

  handleResponse(responseData) {
    const movies = responseData.results.map(movieData => new Movie(movieData))
    AppState.movies = movies
    AppState.currentPage = responseData.page
    AppState.totalPages = responseData.total_pages
  }
}

export const moviesService = new MoviesService()
