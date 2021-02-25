import { v4 as uuidv4 } from 'uuid';
//MODEL SEARCH
export default class Search {
    constructor(query) {
        this.query = query;
        this.myCafes = [];
        this.APIkey = process.env.ZOMATO_API_KEY;
    }

    async getCafe() {
        try {
            let res = await fetch(`https://developers.zomato.com/api/v2.1/search?entity_id=263&entity_type=city&q=${this.query}`, {
                headers: {
                Accept: "application/json",
                "User-Key": this.APIkey,
                }
            })
            
            let data = await res.json();
            this.results = data.results_found
            this.restaurants = data.restaurants
            .filter(r => {
                
                const name = (r.restaurant.name).replace(/é/g, 'e').toLowerCase();
                const element = name.includes(this.query.toLowerCase());

                return (element);
                 
            }) 
            
            .map(r => { 
                return {
                    name: r.restaurant.name,
                    address: r.restaurant.location.address,
                    timing: r.restaurant.timings,
                    phone: r.restaurant.phone_numbers,
                    id: r.restaurant.id
                }
            });
            
            return this.restaurants
            
        } catch(err) {
            console.log('Error!')
        }
    }
    
    addMyCafe(id, name, address, timing, phone ) {
        const myCafe = {
            id, name, address, timing, phone
        };

        this.myCafes.push(myCafe);

        // Persist data in localStorage
        this.persistData()

        return myCafe
    };
 
    persistData() {
        localStorage.setItem('myCafes', JSON.stringify(this.myCafes))
    }

    readStorage() {
        const storage = JSON.parse(localStorage.getItem('myCafes'))

        // Restoring likes from the localStorage
        if(storage) this.myCafes = storage
    } 

    
};