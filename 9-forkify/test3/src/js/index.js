// Global app controller
import Search from './models/Search';
import Recipe from './models/Recipe';
import { elements, renderLoader, clearLoader } from './views/base'; 
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';


const state = {};
/**
 * SEARCH CONTROLLER
 */
const controlSearch = async () => {

    const query = searchView.getInput();
       
    if(query) {
        try {
            // set a search property for state which contain a Search object
            // this Search object has a property, query
            state.search = new Search(query);

            // 0) prepare UI for results
            searchView.clearInput();
            searchView.clearResults();
            renderLoader(elements.searchBeforeRes);

            // 1) Get search data and store data
            await state.search.getResults();
            // 2) Render search data
            clearLoader();
            searchView.renderCurrentRes(state.search.result);
            
     
         } catch (err) {
             console.log('something went wrong with the search');
         }
    }
}

// search event
elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});
// page-changing event
elements.searchResPage.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        
        searchView.clearResults();
        searchView.renderCurrentRes(state.search.result, goToPage);
    }
});

// TESTING
// window.addEventListener('load', e => {
//     e.preventDefault();
//     controlSearch();
// });

/**
 * RECIPE CONTROLLER
 */
const controlRecipe = async (ID) => {
    // Get ID from url
    // const id = window.location.hash.replace('#', '');
    
    try {
        state.recipe = new Recipe(ID);
        // TESTING
        window.r = state.recipe;
        // 0) prepare UI for results
        recipeView.clearRecipe();
        renderLoader(elements.recipePage);

        // 1) get data and store in the Recipe object
        await state.recipe.getRecipe();
        state.recipe.parseIngredients();
        
        // 2) calculate servings and time
        state.recipe.calcTime();
        state.recipe.calcServings();

        // 3) render recipe data
        clearLoader();
        recipeView.renderRecipe(state.recipe);
        //console.log(state.recipe);

    } catch(err) {
        console.log('something went wrong with process the recipe');
    }
}
// check search recipe details event
elements.searchRes.addEventListener('click', e => {
    const searchRecord = e.target.closest('.results__link');
    const ID = searchRecord.getAttribute('href').split('').splice(1).join('');
    console.log(ID);
    controlRecipe(ID);
    searchView.highlightSearch(searchRecord);
});
 



