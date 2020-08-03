import shareFunc from  './../share.js';

export default class Marks {
    constructor() {
        this.marks = [];
    }

    addMark(id, name, order, service, cafe, cake, ambience, prices, average, address, timing, phone) {
        const mark = {
            id, name, order, service, cafe, cake, ambience, prices, average, address, timing, phone
        };

        this.marks.push(mark);

        // Perist data in localStorage
        this.persistData()

        return mark
    };

    deleteMark(id) {
        shareFunc.deleteItem(id, this.marks);

        // Perist data in localStorage
        this.persistData();
    }; 

    averageMark(service, cafe, cake, ambience, prices) {
        const average = (service + cafe + cake + ambience + prices) / 5;
        if(Number.isInteger(average)) {
            return average + '.0'
        } else return average
    }

    isWritten(id) {
        return shareFunc.isInBase(id, this.marks)
    }

    findIndex(id) {
        const index = shareFunc.findIndex(id, this.marks)
        return index
    } 

    sortMarks() {
        this.marks.sort((a,b) => {
            if(a.average < b.average) return 1;
            if(a.average > b.average) return -1;
        });

        this.persistData();
    }

    persistData() {
        localStorage.setItem('marks', JSON.stringify(this.marks))
    }

    readStorage() {
        const storage = JSON.parse(localStorage.getItem('marks'))

        // Restoring likes from the localStorage
        if(storage) this.marks = storage
    } 
}