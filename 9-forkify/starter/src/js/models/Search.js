//export default 'I am a exported string.';

import axios from 'axios';

// request specific data from web API, and store it in an object
export default class Search {
    constructor(query) {
        this.query = query;
    }
    // an async method of this class
    async getResults() {

        try {
            const res = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);
            this.result = res.data.recipes;
            //console.log(this.result);
            //console.log(res);
    
        } catch (error) {
            alert(error);
        }
    }
}

