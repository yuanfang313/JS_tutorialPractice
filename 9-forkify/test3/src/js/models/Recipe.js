import axios from 'axios';

export default class Recipe {
    constructor(id) {
        this.id = id;
    };

    async getRecipe() {
        try {

            const recipe = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
            const recipeDetails = recipe.data.recipe;
            // store data into the Recipe object directly
            this.image_url = recipeDetails.image_url;
            this.ingredients = recipeDetails.ingredients;
            this.publisher = recipeDetails.publisher;
            this.source_url = recipeDetails.source_url;
            this.title = recipeDetails.title;
            //console.log(this.ingredients);

        } catch(err) {
            alert(error);
        }
    };

    // do some calculation before store data into the Recipe object
    calcTime() {
        // Assuming that we need 15 min for each 3 ingredients
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;
    };

    calcServings() {
        this.servings = 4;
    }

    parseIngredients() {

        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unitShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
        const units = [...unitShort, 'kg', 'g'];

        const newIngredients = this.ingredients.map(el => {
            // 1) Uniform units
            let ingredient = el.toLowerCase();
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitShort[i]);
            });

            // 2) Remove parentheses
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

            // 3) Parse ingredients into count, unit and ingredient
            // 3.1) parse the string of ingredient to an array
            const arrIng = ingredient.split(' ');
            // 3.2) find the index where the unit locates
            const unitIndex = arrIng.findIndex(el2 => units.includes(el2));

            let objIng;
            if (unitIndex > -1) {
                // when there is a unit
                // get the num from ingredient
                // Ex. 4 1/2 cups, arrCount is [4, 1/2] --> eval("4 + 1/2") --> 4.5
                // Ex. 4 cups, arrCount is [4]
                const arrCount = arrIng.slice(0, unitIndex);

                let count;
                if (arrCount.length === 1) {
                    count = eval(arrIng[0].replace('-', '+'));
                } else {
                    count = eval(arrCount.join('+'));
                }

                objIng = {
                    count: count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex + 1).join(' ')
                }
            } else if (parseInt(arrIng[0], 10)) {
                // when there is NO unit, the first element is a number
                // parseInt(arr[0], 10) would parse the first element to a number and return true
                objIng = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ')
                }
            } else if (unitIndex === -1){
                // there is NO unit and NO number in 1st position
                objIng = {
                    count: 1,
                    unit: '',
                    ingredient: ingredient
                }
            }

            return objIng;
        });

        this.ingredients = newIngredients;
    };
};