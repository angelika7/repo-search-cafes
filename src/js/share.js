const shareFunc = (function() {

    const deleteItem = (id, arr) => {
        const index = arr.findIndex(el => el.id === id);
        arr.splice(index, 1);
    };

    const findIndex = (id, arr) => {
        const index = arr.findIndex(el => el.id === id);
        return index
    };

    const isInBase = (id, arr) => {
        return arr.findIndex(el => el.id === id) !== -1;
    }

    return {
        deleteItem,
        findIndex,
        isInBase
    }
})()



export default shareFunc

