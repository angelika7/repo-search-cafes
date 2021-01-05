import { elements } from './base';

const imgSrc = 'img/cafe1.jpeg';

export const getInput = () => elements.searchInput.value;
export const clearInput = () => elements.searchInput.value = '';
export const clearSearchList = () => elements.resSearchList.innerHTML = '';

export const renderCafe = cafe => {
    const markup =
    `
        <li class="search-item margin-top-small" id="${cafe.id}">
            <figure class="search-item__picture">
                <img src="${imgSrc}" alt="Zdjęcie kawiarni" class="search-item__img">
            </figure>
            <div class="search-item__info">
                <h3 class="heading-tertiary heading-tertiary--light">${cafe.name}</h3>
                <div class="search-item__details">
                    <a class="search-item__link btn-more" href="#${cafe.id}" aria-label="${cafe.name} pokaż więcej">
                        <span class="paragraph">Więcej</span>
                        <span class="fas fa-arrow-right click-button"></span>    
                    </a>
                </div>
            </div>
        </li>
    `
    elements.resSearchList.insertAdjacentHTML('beforeend', markup);
}

//type: 'prev' or 'next'
const createButton = (page, type) => `
    <button class="btn-inline btn btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
        <span>Strona ${type === 'prev' ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>  
`;

const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage);
    let button;
    if(page === 1 && numResults === 1 || numResults === 0) {
        return
    } else if(page === 1 && pages > 1) {
        button = createButton(page, 'next');
    } else if(page < pages) {
        button = `
        ${createButton(page, 'prev')}
        ${createButton(page, 'next')}
        `
    } else if(page === pages && pages > 1) {
        button = createButton(page, 'prev')
    }
    elements.resSearchList.insertAdjacentHTML('beforeend', button);
}


export const renderResults = (cafes, page = 1, resPerPage = 3) => {
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;
    cafes.slice(start, end).forEach(renderCafe);

    renderButtons(page, cafes.length, resPerPage);
};

export const renderBlankCard = (id) => {
    const imgSrc = 'img/cafe6.jpeg';
    const markup =
        `
        <li class="search-item margin-top-small" id="${id}" aria-label="Nie ma takiej kawiarni w bazie, wprowadź swoje dane o kawiarni">
            <figure class="search-item__picture">
                <img src="${imgSrc}" alt="Zdjęcie kawiarni" class="search-item__img">
            </figure>
            <div class="search-item__info">
                <h3 class="heading-tertiary heading-tertiary--light">Ups... nie ma takiej kawiarni...</h3>
            </div>
        </li>
        <li class="search-item search-item--cafe margin-top-small">
            <div class="search-item__info search-item__info--cafe">
                <form action="#" method="" class="form-cafe">
                    <div class="form-cafe__element">
                        <label class="heading-tertiary heading-tertiary--light" for="name">Nazwa:</label>
                        <input type="text" name="name" id="name" required>
                    </div>
                    <div class="form-cafe__element">
                        <label class="heading-tertiary heading-tertiary--light" for="address">Adres:</label>
                        <input type="text" name="address" id="address" required>
                    </div>
                    <div class="form-cafe__element">
                        <label class="heading-tertiary heading-tertiary--light" for="timing">Godziny otwarcia:</label>
                        <input type="text" name="timing" id="timing" required>
                    </div>
                    <div class="form-cafe__element">
                        <label class="heading-tertiary heading-tertiary--light" for="phone">Telefon:</label>
                        <input type="text" name="phone" id="phone" required>
                    </div>
                    <button class="btn-more add-new">
                        <span class="paragraph">Zapisz w bazie</span>
                        <span class="fas fa-arrow-right click-button"></span>
                    </button>
                </form>
                <div class="search-item__details search-item__details--cafe hidden">
                    <a class="search-item__link" href="#${id}" btn-more add-new>
                        <span class="paragraph">Zobacz szczegóły</span>
                        <span class="fas fa-arrow-right click-button"></span>
                    </a>
                </div>
            </div>
        </li>
    `
    elements.resSearchList.insertAdjacentHTML('beforeend', markup);
    return id
};

export const getCafeInfo = (id) => {
    return {
        id,
        name: document.querySelector('#name').value,
        address: document.querySelector('#address').value,
        timing: document.querySelector('#timing').value,
        phone:document.querySelector('#phone').value,
    }
};

export const clearCafeForm = () => {

    document.querySelectorAll('.form-cafe input').forEach(el => {
        el.value = '';
    });
}



