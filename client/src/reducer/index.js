
const initialState = {
    recipes : [],
    diets: [],
    recipeByDiets: [],
    allRecipes: []

};

function rootReducer (state = initialState, action){
   switch (action.type) {
       case "GET_RECIPES":
           return {
               ...state, //copio el estado
               recipes: action.payload, //y le digo que almacene en recipes (que en principio está vacio) lo que tengo en la action.payload
               allRecipes: action.payload //copia que no se modifica
            }
        case "FILTER_BY_TYPE":
            const allrecipes = state.allRecipes
            const recipesFilter = action.payload === "AllDiets" ? allrecipes : allrecipes.filter( e=> {
                if(e.createInDB){
                    // console.log(e.Diets.name)
                    for(var i=0; i <= e.Diets.length; i++){
                        console.log(e.Diets[i])
                        if(e.Diets[i] === action.payload) return e
                    }
                }else if(e.diets.includes(action.payload)) return e
            })
            return {
                ...state,
                recipes: recipesFilter
            }
        case "SORT_BY_NAME":
            let sorted = action.payload === "ascen" ? 
            state.allRecipes.sort(function(a, b){
                if(a.name > b.name){
                    return 1
                }
                if( b.name > a.name){
                    return -1;
                }
                return 0
            }) : state.allRecipes.sort(function(a, b){
                if(a.name > b.name){
                    return -1;
                }
                if(b.name > a.name){
                    return 1;
                }
                return 0

            })
            return {
                ...state,
                recipes: sorted
            }
        case "GET_BY_NAME":
            return {
                state,
                recipes: action.payload
            }
        case "POST_RECIPE":
            return{
                ...state,
            }
        case "GET_DIETS":
            return{
                ...state,
                diets: action.payload
            }
        case "SORT_BY_SCORE":
            let sortedScore = action.payload === "menor" ?
            state.recipes.sort( function(a, b){
                if(a.score > b.score){
                    return 1
                }
                if(b.score > a.score){
                    return -1
                }
                return 0;
            }) : state.recipes.sort( function (a, b){
                if(a.score > b.score){
                    return -1
                }
                if(b.score > a.score){
                    return 1
                }
                return 0;
            })
            return {
                ...state,
                recipes: sortedScore
            }
           
   
       default:
           return state;
   }
}

export default rootReducer;