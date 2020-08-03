export default class Cafe {
    constructor(id, img) {
        this.id = id;
        this.img = img;
        this.APIkey = process.env.ZOMATO_API_KEY;
    }

    async getCafeInfo() {
        try {
            let res = await fetch(`https://developers.zomato.com/api/v2.1/restaurant?res_id=${this.id}`, {
                headers: {
                Accept: "application/json",
                "User-Key": this.APIkey
                }
            })
            let data = await res.json()
            
            this.name = data.name,
            this.address = data.location.address.trim()
            .replace('Not available for this place', '-')
            .replace(' ', '-'),
            this.timing = data.timings.trim()
            .replace('Mon', 'Pon')
            .replace('Tue', 'Wt')
            .replace('Wed', 'Śr')
            .replace('Thu', 'Czw')
            .replace('Fri', 'Pt')
            .replace('Sat', 'Sob')
            .replace('Sun', 'Nd')
            .replace('to', 'do')
            .replace('Closed', 'Zamknięte')
            .replace('Not available for this place', '-')
            .replace(' ', '-')
            .replace('', '-')
            this.phone = data.phone_numbers.trim()
            .replace('Not available for this place', '-')
            .replace(' ', '-'),
            this.id = data.id

        } catch(err) {
            console.log('Error!')
        }
    }  
}  

