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

export function getRecipesName(payload){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/recipes?name=" + payload)
        return dispatch({
            type: "GET_BY_NAME",
            payload: json.data
        })
    }
}

export function getDiets(){
    return async function(dispatch){
        var jsonDiet = await axios.get("http://localhost:3001/types");
        return dispatch({
            type: "GET_DIETS",
            payload: jsonDiet.data
        })
    }
}

export function postRecipes(payload){
    return async function (dispatch){
        const response = await axios.post("http://localhost:3001/recipe", payload);
        console.log(response)
        return response
    }
}

export function getRecipeByType(payload) {
                console.log(payload)
                return ({
                    type: "FILTER_BY_TYPE",
                    payload
                })
        
}

export function sortByName(payload) {
    console.log(payload)
    return ({
        type: "SORT_BY_NAME",
        payload
    })
}

export function sortByScore(payload) {
    console.log(payload)
    return ({
        type: "SORT_BY_SCORE",
        payload
    })
}