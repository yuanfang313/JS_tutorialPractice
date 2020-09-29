import Table from './Table';
import * as tableView from './tableView';

const state = {};
const tableController = () => {
    state.movies = new Table();
    console.log(state.movies.movies);
    state.movies.movies.forEach(movie => {
        tableView.renderTable(movie);
    });
}
tableController();