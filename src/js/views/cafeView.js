import { elements } from './base';

export const clearCafeInfo = () => {
    elements.cafeInfo.innerHTML = '';
};

export const renderCafeInfo = (isLiked, like, cafe, isWritten, mark, myCafe) => {
    const markup = `
            <figure class="item-details__profile-picture">
                <img src="${isLiked ? like.img : cafe.img}" alt="Caffee foto" class="item-details__img">
            </figure>
            <div class="item-details__info">
                <h3 class="heading-tertiary">Nazwa:<span class="heading-tertiary heading-tertiary--thin">
                ${isWritten ? mark.name || like.name : cafe.name || myCafe.name}</span></h3>
                <h3 class="heading-tertiary">Adres:<span class="heading-tertiary heading-tertiary--thin">
                ${isWritten ? mark.address || like.address : cafe.address || myCafe.address}</span></h3>
                <h3 class="heading-tertiary">Godziny otwarcia:<span class="heading-tertiary heading-tertiary--thin">
                ${isWritten ? mark.timing || like.timing : cafe.timing || myCafe.timing}</span></h3>
                <h3 class="heading-tertiary">Telefon:<span class="heading-tertiary heading-tertiary--thin">
                ${isWritten ? mark.phone || like.phone : cafe.phone || myCafe.phone}</span></h3>
            </div>
            <div class="item-details__marks">
                <button class="item-details__like-box">
                    <img src="img/heart${isLiked ? '2' : '1'}.svg" alt="Like logo" class="like like--min">
                </button>
                <div class="item-details__mark-box" data-key="${cafe.id}">
                    <h3 class="heading-tertiary heading-tertiary--thin">Ocena</h3>
                    <h2 class="heading-secondary average">${isWritten ? mark.average : '-'}</h2>
                </div>
            </div>
            <div class="item-details__buttons">
                <button class="button">
                    <i class="fas fa-plus-circle add ${isWritten ? 'inactive' : ''}"></i>
                </button>
                <button class="button">
                    <i class="fas fa-minus-circle remove ${isWritten ? '' : 'inactive'}"></i>
                </button>
            </div>
    `
    elements.cafeInfo.insertAdjacentHTML('afterbegin', markup);
};

export const showAverage = (cafe, average) => {
    const mark = document.querySelector(`[data-key="${cafe.id}"] .average`);
    mark.textContent = average;
};

export const hideAverage = cafe => {
    const mark = document.querySelector(`[data-key="${cafe.id}"] .average`);
    mark.textContent = "-";
};

export const changeStyle = e => {
    const btns = document.querySelectorAll('.button i');
    const btnsArr = [...btns];
    console.log(btns, btnsArr)
    btnsArr.forEach(el => {
        if(el.classList.contains('inactive')) {el.classList.remove('inactive')}
    });

    
    e.target.classList.add('inactive');
};

