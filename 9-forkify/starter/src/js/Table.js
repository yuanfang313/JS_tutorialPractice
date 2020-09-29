import {
    getMovies
} from '../services/fakeMovieService';

export default class Table {
    constructor() {
        this.movies = getMovies();
    }
}