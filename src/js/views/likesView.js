import { elements } from './base';

export const toggleLikeBtn = isLiked => {
    const iconString = isLiked ? '2' : '1';
    document.querySelector('.like--min').setAttribute('src', `img/heart${iconString}.svg`);
};

export const renderLike = like => {
    const markup = `
    <li class="likes__item">
        <a href="#${like.id}" class="likes__link">
            <figure class="likes__picture">
                <img src="${like.img}" alt="Zdjęcie kawiarni 1" class="likes__img">
            </figure>
            <div class="likes__info">
                <img src="img/heart2.svg" alt="Like logo" class="like like--list">
                <h3 class="heading-tertiary heading-tertiary--light">${like.name}</h3>
                <div class="likes__details">
                    <button class="btn-more">
                        <span class="paragraph paragraph--small">Więcej</span>
                        <i class="fas fa-arrow-right click-button click-button--list"></i>
                    </button>
                </div>
            </div>
        </a>
    </li>
    `
    elements.likesList.insertAdjacentHTML('beforeend', markup);
};

export const deleteLike = id => {
    const el = document.querySelector(`.likes__link[href*="${id}"]`).parentElement;
    if(el) el.parentElement.removeChild(el);
};
