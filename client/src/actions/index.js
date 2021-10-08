import axios from "axios";

export function getRecipes(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/recipes");
        return dispatch({
            type: "GET_RECIPES",
            payload: json.data
        })
    }
}

// export function getDiets(){
//     return async function(dispatch){
//         var jsonDiet = await axios.get("http://localhost:3001/types");
//         return dispatch({
//             type: "GET_DIETS",
//             payload: jsonDiet.data
//         })
//     }
// }

export function getRecipeByType(payload) {
                console.log(payload)
                return ({
                    type: "FILTER_BY_TYPE",
                    payload
                })
        
}