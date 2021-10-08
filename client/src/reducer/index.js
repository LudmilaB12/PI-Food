
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
               allRecipes: action.payload
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

           
   
       default:
           return state;
   }
}

export default rootReducer;