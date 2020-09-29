import { elements } from './base';

export const getInput = () => elements.searchInput.value;
export const clearInput = () => elements.searchInput.value = '';
export const clearResults = () => {
    elements.searchRes.innerHTML = '';
    elements.searchResPage.innerHTML = '';
}

export const highlightSearch = searchRecord => {
    const activeClassName = 'results__link results__link--active';
    
    const resultsArr = Array.from(document.querySelectorAll('.results__link'));
    resultsArr.forEach(el => {
        el.classList.remove('results__link--active');
    });
    searchRecord.classList.value = activeClassName;     
};  

const formatTitle = (title, limit = 17) => {
    let newTitle = title;
    let arrNewTitle = newTitle.split('');
    if(arrNewTitle.length > limit) {
        arrNewTitle.splice(limit);
        newTitle = arrNewTitle.join('') + ' ...';
    }
    return newTitle;
};

const renderResults = result => {
    const markup = `
    <li>
        <a class="results__link" href="#${result.recipe_id}">
            <figure class="results__fig">
                <img src="${result.image_url}" alt="${result.title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${formatTitle(result.title)}</h4>
                <p class="results__author">${result.publisher}</p>
            </div>
        </a>
   </li>
    `;
    elements.searchRes.insertAdjacentHTML('beforeend', markup);
};

const createBtn = (page, type) => 
    `<button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>`;

const renderButton = (page, resNum, resPerPage) => {

    const pages = Math.ceil(resNum / resPerPage);

    let button;
    if (page === 1 && pages > 1) {
        button = createBtn(page, 'next');

    } else if (page > 1 && page < pages) {
        button = `
        ${createBtn(page, 'prev')}
        ${createBtn(page, 'next')}
        `;

    } else if (page > 1 && page === pages) {
        button = createBtn(page, 'prev');

    } else if (page === 1 && pages === 1) {
        button = '';
    }
    elements.searchResPage.insertAdjacentHTML('afterbegin', button);
};
export const renderCurrentRes = (results, page = 1, resPerPage = 10) => {
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;

    // render current results
    results.slice(start, end).forEach(renderResults);

    // render current button
    renderButton(page, results.length, resPerPage);
};