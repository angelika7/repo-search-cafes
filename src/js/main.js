import Search from './models/Search';
import Cafe from './models/Cafe';
import Likes from './models/Likes';
import Marks from './models/Marks';
import * as searchView from './views/searchView';
import * as cafeView from './views/cafeView';
import * as likesView from './views/likesView';
import * as marksView from './views/marksView';
import base,{ elements } from './views/base';
import { v4 as uuidv4 } from 'uuid';

const state = {};

const controlSearch = async () => {
    
    // 1) Get query from view
    const query = searchView.getInput();

    if(elements.likesList.classList.contains('open')) {
        elements.likesList.classList.remove('open')
    } 

    if(query) {
        // 2) New search object and add to state
        state.search = new Search(query);

        // 3) Prepare UI for results
        searchView.clearInput();
        searchView.clearSearchList();

        try {
            // 4) Search for cafes
            await state.search.getCafe()

            // 5) Render results on UI
            searchView.renderResults(state.search.restaurants)

            if(state.search.restaurants.length === 0) {
                const myCafeID = uuidv4()
                searchView.renderBlankCard(myCafeID);

                document.querySelector('.form-cafe').addEventListener('submit', e => {
                    e.preventDefault();
                    controlMyCafe(myCafeID);
                    document.querySelector('.form-cafe button').classList.add('hidden');
                    document.querySelector('.search-item__details').classList.remove('hidden');
                });
            };
            
        } catch (err) {
            console.log("Something is wrong ...")
        }
    }
}

elements.form.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.resSearchList.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    
    if(btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearSearchList();
        searchView.renderResults(state.search.restaurants, goToPage);
    }
});

const controlMyCafe = myCafeID => {

    const cafe = searchView.getCafeInfo(myCafeID);
    
    state.search.addMyCafe(
        cafe.id,
        cafe.name,
        cafe.address,
        cafe.timing,
        cafe.phone
    );
    searchView.clearCafeForm();
}

//CAFE CONTROLLER

const images = [
    'img/cafe1.jpeg',
    'img/cafe2.jpeg',
    'img/cafe3.jpeg',
    'img/cafe4.jpeg',
    'img/cafe5.jpeg',
    'img/cafe6.jpeg',
]

const randomImg = (imgs) => {
    const index = Math.floor(Math.random() * imgs.length)
    const image = imgs[index]
    return image
}

const controlCafe = async () => {
    const id = window.location.hash.replace('#', '');

    if(id) {
        cafeView.clearCafeInfo();
        const img = randomImg(images);

        state.cafe = new Cafe(id, img);
        
        try {

            await state.cafe.getCafeInfo();
            
            cafeView.renderCafeInfo(
                state.likes.isLiked(id),
                state.likes.likes[state.likes.findIndex(id)],
                state.cafe,
                state.marks.isWritten(id),
                state.marks.marks[state.marks.findIndex(id)],
                state.search.myCafes[0]
            );
            
        } catch (err) {
            console.log(err)
        }

        if(elements.likesList.classList.contains('open')) {
            elements.likesList.classList.remove('open')
        }  
    } 
}

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlCafe));

//LIKES AND MARKS CONTROLLER

window.addEventListener('load', () => {
    state.likes = new Likes();
    state.marks = new Marks();
    if(!state.search) state.search = new Search()

    state.likes.likes.forEach(like => likesView.renderLike(like));
    state.marks.marks.forEach(mark => marksView.renderMark(mark));
})

const controlLike = () => {
    if(!state.likes) state.likes = new Likes();
    const currentID = state.cafe.id;
    const imgSrc = state.cafe.img;

    if(!state.likes.isLiked(currentID)) {

        const newLike = state.likes.addLike(
            currentID,
            state.cafe.name || state.search.myCafes[0].name,
            imgSrc,
            state.cafe.address ||state.search.myCafes[0].address,
            state.cafe.timing || state.search.myCafes[0].timing,
            state.cafe.phone || state.search.myCafes[0].phone
        );

        likesView.toggleLikeBtn(true);

        likesView.renderLike(newLike)
    } else {
        state.likes.deleteLike(currentID)

        likesView.toggleLikeBtn(false);

        likesView.deleteLike(currentID);
    };
};

elements.cafeInfo.addEventListener('click', (e) => {
    if(e.target.matches('.like--min, .like--min *')) {
        controlLike()
    }
});

elements.likesIcon.addEventListener('click', () => {
    if(state.likes.likes.length > 0) {
        elements.likesPanel.classList.toggle('openPanel');
    }
});

// Restore liked and marked cafes on page load

window.addEventListener('load', () => {
    state.likes = new Likes();
    state.marks = new Marks();
    if(!state.search) state.search = new Search()

    // Restore likes and marks 
    state.likes.readStorage();
    state.marks.readStorage();

    // Restore my Cafes
    state.search.readStorage();
    
    // Render the existing likes
    state.likes.likes.forEach(like => {
        likesView.renderLike(like)
    });

    // Render the existing marks
    state.marks.marks.forEach(mark => { 
        marksView.reRenderMark(mark)
    }); 

    [...document.querySelectorAll(`.trash`)].forEach(item => {
        item.addEventListener('click', (e) => {
            cafeView.changeStyle(e)
            
            state.marks.deleteMark(item.dataset.key);
            marksView.removeMark(e);
        })
    }); 

    elements.btnSort.addEventListener('click', () => {
        // Sort array with marks
        state.marks.sortMarks()
    
        // Clean Ul table with cafes
        marksView.cleanTable();
        // Re-render the existing sorted marks
        state.marks.marks.forEach(mark => { 
            marksView.reRenderMark(mark)
        }); 

    }); 
});

//MARKS CONTROLLER

const controlMark = (e) => {

    if(!state.marks) state.marks = new Marks();
        const currentID = state.cafe.id;

        if(e.target.matches('.add, .add *')) {

            if(marksView.existElement(state.cafe, currentID)) {

            const addButton = document.querySelector('.add');
            addButton.addEventListener('click', marksView.renderMark(state.cafe, state.search.myCafes[0]));
            const tableRows = document.querySelectorAll(`tbody tr`);

            if(tableRows.length > 0) {
                [...document.querySelectorAll(`.trash`)].forEach(item => {
                    item.addEventListener('click', (e) => {
                        
                        state.marks.deleteMark(item.dataset.key);
                        cafeView.changeStyle(e);
                        marksView.removeMark(e);
                        
                        document.querySelector('.button .remove').classList.add('inactive');
                    })
                });
            }

            //Change btn add style
            cafeView.changeStyle(e)
            
            const el = document.querySelector(`.table-mark__link[href*="${currentID}"]`);
            
            if(el) {
                el.addEventListener('click', () => {
                    if(!state.marks.isWritten(currentID)) {
                        
                        const mark = marksView.getInputs(state.cafe, currentID);
                        
                        const newMark = state.marks.addMark(
                            currentID,
                            state.cafe.name || state.search.myCafes[0].name,
                            mark.order,
                            mark.service,
                            mark.cafe,
                            mark.cake,
                            mark.ambience,
                            mark.prices,
                            state.marks.averageMark(mark.service, mark.cafe, mark.cake, mark.ambience, mark.prices),
                            state.cafe.address || state.search.myCafes[0].address,
                            state.cafe.timing || state.search.myCafes[0].timing,
                            state.cafe.phone || state.search.myCafes[0].phone
                        );
                        const average = state.marks.marks[state.marks.findIndex(currentID)].average;

                        marksView.renderAverage(state.cafe, average);
                        marksView.deleteMark(currentID);
                        //marksView.removeMark(currentID);
                        marksView.reRenderMark(newMark);
                        cafeView.showAverage(state.cafe, average);

                        const tableRows = document.querySelectorAll(`tbody tr`);
                        if(tableRows.length > 0) {
                            [...document.querySelectorAll(`.trash`)].forEach(item => {
                                item.addEventListener('click', (e) => {
                                    marksView.removeMark(e);
                                    state.marks.deleteMark(item.dataset.key);
                                    cafeView.changeStyle(e);
                                    document.querySelector('.button .remove').classList.add('inactive');
                                    cafeView.hideAverage(state.cafe, average);
                                    
                                })
                            });
                        };
                    };

                });
            };
        };
    
    } else if(e.target.matches('.remove, .remove *')) {

        const removeButton = document.querySelector('.remove');
        removeButton.addEventListener('click', marksView.deleteMark(currentID)); // marksView.deleteMark(currentID)

        //Change btn remove style
        cafeView.changeStyle(e);

        //Delete row and hide average if row is written
        
        if(!state.marks.isWritten) {

            state.marks.deleteMark(currentID);
        
        } else {
            const average = state.marks.marks[state.marks.findIndex(currentID)];
            cafeView.hideAverage(state.cafe, average);
            state.marks.deleteMark(currentID);
        };
    }; 
};

elements.cafeInfo.addEventListener('click', controlMark);
elements.btnPopup.addEventListener('click', () => {
    document.querySelector('.popup-box').classList.add('popUpOut');
    setTimeout(() => {
        document.querySelector('.popup-box').style.display = 'none';
    }, 500);
})


