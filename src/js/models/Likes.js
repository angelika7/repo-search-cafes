import shareFunc from  './../share.js';

export default class Likes {
    constructor() {
        this.likes = [];
    }

    addLike(id, name, img, address, timing, phone) {
        const like = {id, name, img, address, timing, phone};
        
        this.likes.push(like)

        // Perist data in localStorage
        this.persistData()

        return like
    }

    findIndex(id) {
        const index = shareFunc.findIndex(id, this.likes)
        return index
    }  

    deleteLike(id) {
        shareFunc.deleteItem(id, this.likes);
            
        // Persist data in localStorage
        this.persistData();
    }

    isLiked(id) {
        return shareFunc.isInBase(id, this.likes)
    }

    persistData() {
        localStorage.setItem('likes', JSON.stringify(this.likes))
    } 

    readStorage() {
        const storage = JSON.parse(localStorage.getItem('likes'))

        // Restoring likes from the localStorage
        if(storage) this.likes = storage
    }
}