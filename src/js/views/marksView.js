import { elements } from './base';

export const showTitleTable = () => {
    const documentWidth = window.innerWidth;
    let markup;
    if(documentWidth <= 500) {
        markup = `
        <th class="heading-table">Nazwa</th>
        <th class="heading-table" aria-labelledby="order"><span class="fas fa-utensils"></span></th>
        <th class="heading-table" aria-labelledby="quality"><span class="fas fa-male"></span></th>
        <th class="heading-table" aria-labelledby="quality"><span class="fas fa-coffee"></span></th>
        <th class="heading-table" aria-labelledby="quality"><span class="fas fa-cookie-bite"></span></th>
        <th class="heading-table" aria-labelledby="ambience"><span class="far fa-grin-beam"></span></th>
        <th class="heading-table" aria-labelledby="prices"><span class="fas fa-dollar-sign"></span></th>
        <th class="heading-table">Ocena</th>`
    } else if (documentWidth > 500) {
        markup = `
        <th class="heading-table">Nazwa</th>
        <th class="heading-table" aria-labelledby="order">Zamawianie</th>
        <th class="heading-table" aria-labelledby="quality">Obsługa</th>
        <th class="heading-table" aria-labelledby="quality">Kawa</th>
        <th class="heading-table" aria-labelledby="quality">Ciasto</th>
        <th class="heading-table" aria-labelledby="ambience">Klimat</th>
        <th class="heading-table" aria-labelledby="prices">Ceny</th>
        <th class="heading-table">Ocena</th>`
    }
    elements.tableHead.insertAdjacentHTML('beforeend', markup);
}

export const renderMark = (cafe, myCafe) => {
    const categories = ['service','cafe','cake','ambience','prices'];
    const generateCell = (arr) => {
       return `
        <td class="table-cell"> 
            <select name="service" id="" class="input input--mark ${arr}">
                <option value="0">0</option> 
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
        </td>`
    } 
    
    const markup = `
    <tr class="leader" data-key="${cafe.id || myCafe.id}">
        <td class="table-cell table-name">
            <a href="#${cafe.id || myCafe.id }" class="table-name__link">
                ${cafe.name || myCafe.name}
            </a>
            <span aria-label="Usuń kawiarnię" role="button" class="fas fa-trash-alt trash" data-key="${cafe.id || myCafe.id}"></span>
        </td>
        <td class="table-cell"> <!-- samoobsługa -->
            <select name="order-type" id="" class="input input--name order">
                <option value="self">Bar</option> 
                <option value="waiter">Stolik</option>
            </select>
        </td>
        ${generateCell(categories[0])}
        ${generateCell(categories[1])}
        ${generateCell(categories[2])}
        ${generateCell(categories[3])}
        ${generateCell(categories[4])}
        <td class="table-cell table-mark" data-key="${cafe.id || myCafe.id}">
            <a href="#${cafe.id || myCafe.id}" class="table-mark__link">
                <span class="fas fa-pencil-alt pencil"></span>
            </a>
            <h2 class="heading-secondary heading-secondary--small mark">-</h2>
        </td>
    </tr>`
    elements.tabelBody.insertAdjacentHTML('beforeend', markup);
};

export const getInputs = (cafe, id) => {
    const tr = document.querySelector(`[data-key="${cafe.id}"]`)

    if(tr.dataset.key === id) {
        return {
        id,
        name,
        order: document.querySelector(`[data-key="${cafe.id}"] td .order`).value,

        service: document.querySelector(`[data-key="${cafe.id}"] td .service`).value * 1,
        cafe: document.querySelector(`[data-key="${cafe.id}"] td .cafe`).value * 1,
        cake: document.querySelector(`[data-key="${cafe.id}"] td .cake`).value * 1,
        ambience: document.querySelector(`[data-key="${cafe.id}"] td .ambience`).value * 1,
        prices: document.querySelector(`[data-key="${cafe.id}"] td .prices`).value * 1,
        
    }} 
}

export const reRenderMark = mark => {
    
    const markup = `
    
    <tr class="leader" data-key="${mark.id}" data-average="${mark.average}">
        <td class="table-cell table-name">
            <a href="#${mark.id}" class="table-name__link">
                ${mark.name}
            </a>
            <span aria-label="Usuń kawiarnię" role="button" class="fas fa-trash-alt trash" data-key="${mark.id}"></span>
        </td>
        <td class="table-cell"> 
            ${mark.order === 'self' ? 'Bar' : 'Stolik'}
        </td>
        <td class="table-cell"> 
            ${mark.service}
        </td>
        <td class="table-cell">
            ${mark.cafe}
        </td>
        <td class="table-cell">
            ${mark.cake}
        </td>
        <td class="table-cell">
            ${mark.ambience}
        </td>
        <td class="table-cell">
            ${mark.prices}
        </td>
        <td class="table-cell table-mark data-key="${mark.id}">
            <h2 class="heading-secondary heading-secondary--small mark">${mark.average}</h2>
        </td>
    </tr>
    `
    elements.tabelBody.insertAdjacentHTML('beforeend', markup);
}; 

export const deleteMark = (id) => {
    const el = document.querySelector(`.table-name__link[href*="${id}"]`).parentElement.parentElement;
    if(el) el.remove();
};

export const renderAverage = (cafe, average) => {
    const mark = document.querySelector(`[data-key="${cafe.id}"] .mark`);
    mark.textContent = average;
}

export const existElement = (cafe, id) => {

    //All rows in the table
    const tableRows = document.querySelectorAll(`tbody tr[data-key="${cafe.id}"]`);

    // Convert NodeList to Array    
    let rows = Array.from(tableRows);
    console.log(rows)

    if(rows.length === 0 || (rows.length > 0 && rows.forEach(el => el.dataset.key !== id))) {
        return true
    }; 
};

export const cleanTable = () => {
    document.querySelector('tbody').innerHTML = '';
};

export const removeMark = (e) => {
    const index = e.target.dataset.key;
    
    document.querySelector(`tr[data-key="${index}"]`).remove();   
};